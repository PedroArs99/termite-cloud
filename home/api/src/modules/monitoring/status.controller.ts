import { Controller, Get } from '@nestjs/common';
import { ServiceHealth } from './service-health.model';

@Controller('/status')
export class StatusController {
  constructor() {}

  @Get('/health')
  async getServiceHealth(): Promise<ServiceHealth> {
    return new ServiceHealth();
  }
}
