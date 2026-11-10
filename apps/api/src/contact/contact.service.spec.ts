import { ContactQueue } from './contact-queue.js';
import { ContactService } from './contact.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('ContactService', () => {
  const create = vi.fn();
  const send = vi.fn();
  const prisma = { contactMessage: { create } } as unknown as PrismaService;
  const queue: ContactQueue = { send };
  const service = new ContactService(prisma, queue);

  const message = { name: '  Ada  ', email: 'ada@example.com ', message: ' Hello ', lang: 'en' as const };

  beforeEach(() => {
    create.mockReset().mockResolvedValue({ id: 'abc' });
    send.mockReset().mockResolvedValue(undefined);
  });

  it('saves the trimmed message and queues its id', async () => {
    await service.create(message);

    expect(create).toHaveBeenCalledWith({
      data: { name: 'Ada', email: 'ada@example.com', message: 'Hello', lang: 'en' },
    });
    expect(send).toHaveBeenCalledWith('abc');
  });

  it('ignores a message when the hidden field is filled', async () => {
    await service.create({ ...message, website: 'http://spam.example' });

    expect(create).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('keeps the message when the queue is down', async () => {
    send.mockRejectedValue(new Error('queue down'));

    await expect(service.create(message)).resolves.toBeUndefined();
    expect(create).toHaveBeenCalledOnce();
  });
});
