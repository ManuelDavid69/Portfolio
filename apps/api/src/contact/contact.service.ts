import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ContactQueue } from './contact-queue.js';
import { CreateContactDto } from './contact.dto.js';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly queue: ContactQueue,
  ) {}

  /** Saves the message, then asks the e-mail function to send it. */
  async create(dto: CreateContactDto): Promise<void> {
    if (dto.website) {
      // A bot filled the hidden field. We answer as if everything went fine and keep nothing.
      return;
    }

    const saved = await this.prisma.contactMessage.create({
      data: { name: dto.name.trim(), email: dto.email.trim(), message: dto.message.trim(), lang: dto.lang },
    });

    try {
      await this.queue.send(saved.id);
    } catch (error) {
      // The message is safe in the database even if the queue fails.
      this.logger.error(`Could not queue message ${saved.id}: ${String(error)}`);
    }
  }
}
