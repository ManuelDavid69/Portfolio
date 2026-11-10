import { Module } from '@nestjs/common';
import { AzureContactQueue, ContactQueue } from './contact-queue.js';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

@Module({
  controllers: [ContactController],
  providers: [ContactService, { provide: ContactQueue, useClass: AzureContactQueue }],
})
export class ContactModule {}
