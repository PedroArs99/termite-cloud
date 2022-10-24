import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule as NestConfigModule } from '@nestjs/config'; 
import { HomeDeviceModule } from './modules/device/home-device.module';
import { HomeConfigModule } from './modules/config/home-config.module';

@Module({
  imports: [
    HomeConfigModule,
    HomeDeviceModule,
    NestConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
