import { Module } from '@nestjs/common';
import { HomeConfigRestController } from './adapters/rest/home-config-rest.controller';

@Module({
  controllers: [HomeConfigRestController],
})
export class HomeConfigModule {}
