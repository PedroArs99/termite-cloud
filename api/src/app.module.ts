import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MqttAdapterModule } from './adapters/mqtt/mqtt.adapter.module';

@Module({
  imports: [
    MqttAdapterModule,
    // Seve UI Static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
