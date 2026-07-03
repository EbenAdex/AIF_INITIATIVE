import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { QueryScholarshipDto } from './dto/query-scholarship.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ScholarshipStatus } from '@prisma/client';

@Injectable()
export class ScholarshipsService {
  constructor(private prisma: PrismaService) {}

  // -------------------------
  // CREATE (ADMIN ONLY)
  // -------------------------
  async create(dto: CreateScholarshipDto) {
    const scholarship = await this.prisma.scholarship.create({
      data: {
        ...dto,
        amount: Number(dto.amount),
        deadline: new Date(dto.deadline),
        status: 'DRAFT',
      },
    });

    return {
      message: 'Scholarship created',
      data: scholarship,
    };
  }

  // -------------------------
  // GET ALL (PUBLIC)
  // -------------------------
  async findAll(query: QueryScholarshipDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(query.category && { category: query.category }),
      ...(query.status && { status: query.status }),
      ...(query.search && {
        title: {
          contains: query.search,
          mode: 'insensitive',
        },
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.scholarship.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.scholarship.count({ where }),
    ]);

    return {
      message: 'Scholarships fetched',
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  // -------------------------
  // GET SINGLE
  // -------------------------
  async findOne(id: string) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id },
    });

    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    return {
      message: 'Scholarship fetched',
      data: scholarship,
    };
  }

  // -------------------------
  // UPDATE (ADMIN)
  // -------------------------
  async update(id: string, dto: UpdateScholarshipDto) {
    const scholarship = await this.prisma.scholarship.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.deadline && {
          deadline: new Date(dto.deadline),
        }),
      },
    });

    return {
      message: 'Scholarship updated',
      data: scholarship,
    };
  }

  // -------------------------
  // CHANGE STATUS (ADMIN)
  // -------------------------
 async changeStatus(
  id: string,
  status: ScholarshipStatus,
) {
  return this.prisma.scholarship.update({
    where: { id },
    data: {
      status,
    },
  });
}

  // -------------------------
  // DELETE (SOFT IN REAL SYSTEM)
  // -------------------------
  async remove(id: string) {
    await this.prisma.scholarship.delete({
      where: { id },
    });

    return {
      message: 'Scholarship deleted',
    };
  }
}