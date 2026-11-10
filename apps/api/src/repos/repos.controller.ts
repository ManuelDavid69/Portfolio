import { Controller, Get, Header } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('repos')
export class ReposController {
  constructor(private readonly prisma: PrismaService) {}

  /** GitHub data of my repositories. It changes once a night, so browsers can keep it for an hour. */
  @Get()
  @Header('Cache-Control', 'public, max-age=3600')
  findAll() {
    return this.prisma.repoStats.findMany({
      select: { repo: true, lastCommitAt: true, languages: true, stars: true },
      orderBy: { repo: 'asc' },
    });
  }
}
