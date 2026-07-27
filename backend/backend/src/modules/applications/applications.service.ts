import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * User submits a scholarship application
   */
  async create(userId: string, dto: CreateApplicationDto) {
    // 1. Check scholarship exists
    const scholarship = await this.prisma.scholarship.findUnique({
      where: {
        id: dto.scholarshipId,
      },
    });

    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    // 2. Check scholarship availability

    if (scholarship.status !== 'ACTIVE') {
      throw new BadRequestException(
        'Scholarship is not accepting applications',
      );
    }

    // 3. Check deadline

    if (new Date() > scholarship.deadline) {
      throw new BadRequestException(
        'Scholarship application deadline has passed',
      );
    }

    // 4. Prevent duplicate applications

    const existingApplication = await this.prisma.application.findUnique({
      where: {
        userId_scholarshipId: {
          userId,

          scholarshipId: dto.scholarshipId,
        },
      },
    });

    if (existingApplication) {
      throw new BadRequestException(
        'You have already applied for this scholarship',
      );
    }

    // 5. Create application

    return this.prisma.application.create({
      data: {
        userId,

        scholarshipId: dto.scholarshipId,

        statement: dto.statement,

        cvUrl: dto.cvUrl,

        transcriptUrl: dto.transcriptUrl,

        passportUrl: dto.passportUrl,
      },

      include: {
        scholarship: true,
      },
    });
  }

  /**
   * Get applications belonging to logged-in user
   */
  async findMyApplications(userId: string) {
    return this.prisma.application.findMany({
      where: {
        userId,
      },

      include: {
        scholarship: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Admin gets all applications
   */
  async findAll() {
    return this.prisma.application.findMany({
      include: {
        user: {
          select: {
            id: true,

            fullName: true,

            email: true,

            phone: true,
          },
        },

        scholarship: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get single application
   */
  async findOne(id: string, requester?: { sub: string; role: string }) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },

        scholarship: true,
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (
      requester &&
      application.userId !== requester.sub &&
      !['ADMIN', 'SUPER_ADMIN'].includes(requester.role)
    ) {
      throw new ForbiddenException('You cannot view this application');
    }

    return application;
  }

  /**
   * Admin updates application status
   */
  async updateStatus(
    id: string,
    adminId: string,
    dto: UpdateApplicationStatusDto,
  ) {
    const application = await this.findOne(id);

    return this.prisma.application.update({
      where: {
        id,
      },

      data: {
        status: dto.status,

        reviewReason: dto.reviewReason,

        reviewedById: adminId,

        reviewedAt: new Date(),
      },
    });
  }

  /**
   * User withdraws application
   */
  async remove(id: string, userId: string) {
    const application = await this.findOne(id);

    if (application.userId !== userId) {
      throw new ForbiddenException('You cannot delete this application');
    }

    return this.prisma.application.delete({
      where: {
        id,
      },
    });
  }
}
