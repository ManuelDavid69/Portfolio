import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueueClient } from '@azure/storage-queue';

/** Where the API drops the id of a new message. A C# function reads it and sends the e-mail. */
export abstract class ContactQueue {
  abstract send(messageId: string): Promise<void>;
}

@Injectable()
export class AzureContactQueue extends ContactQueue implements OnModuleInit {
  private readonly logger = new Logger(AzureContactQueue.name);
  private readonly client: QueueClient;

  constructor(config: ConfigService) {
    super();
    this.client = new QueueClient(
      config.getOrThrow<string>('STORAGE_CONNECTION_STRING'),
      config.get<string>('CONTACT_QUEUE', 'contact-messages'),
    );
  }

  async onModuleInit() {
    try {
      await this.client.createIfNotExists();
    } catch (error) {
      // The API must start even if the queue is down. Messages stay in the database.
      this.logger.warn(`Queue not reachable at startup: ${String(error)}`);
    }
  }

  async send(messageId: string) {
    // Azure Functions read queue messages as base64 by default.
    const body = Buffer.from(JSON.stringify({ id: messageId })).toString('base64');
    await this.client.sendMessage(body);
  }
}
