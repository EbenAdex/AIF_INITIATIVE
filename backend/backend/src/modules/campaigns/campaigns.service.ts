import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeInactive = false) {
    return this.prisma.donationCampaign.findMany({
      where: {
        deletedAt: null,
        ...(includeInactive ? {} : { isActive: true }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const campaign = await this.prisma.donationCampaign.findFirst({
      where: { id, deletedAt: null },
    });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }

  create(dto: CreateCampaignDto) {
    return this.prisma.donationCampaign.create({
      data: { ...dto, targetAmount: dto.targetAmount },
    });
  }

  async update(id: string, dto: UpdateCampaignDto) {
    await this.findOne(id);
    return this.prisma.donationCampaign.update({
      where: { id },
      data: dto.targetAmount ? { ...dto, targetAmount: dto.targetAmount } : dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.donationCampaign.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
    return { message: 'Campaign archived' };
  }
}
