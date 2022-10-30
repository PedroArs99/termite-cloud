import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule as NestConfigModule } from '@nestjs/config'; 
import { HomeDeviceModule } from './modules/device/home-device.module';
import { HomeConfigModule } from './modules/config/home-config.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MonitoringModule } from './modules/monitoring/monitoring.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    HomeConfigModule,
    HomeDeviceModule,
    MonitoringModule,
    NestConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
