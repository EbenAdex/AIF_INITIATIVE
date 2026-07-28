import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryEventsDto) {
    const where = {
      deletedAt: null,
      ...(query.upcoming ? { eventDate: { gte: new Date() } } : {}),
    };
    const skip = (query.page - 1) * query.limit;
    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { eventDate: 'asc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: query.page,
        lastPage: Math.ceil(total / query.limit),
      },
    };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findFirst({
      where: { id, deletedAt: null },
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: { ...dto, eventDate: new Date(dto.eventDate) },
    });
  }

  async update(id: string, dto: UpdateEventDto) {
    await this.findOne(id);
    return this.prisma.event.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.eventDate ? { eventDate: new Date(dto.eventDate) } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { message: 'Event archived' };
  }
}
