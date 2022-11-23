import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connectAsync } from 'async-mqtt';
import { MqttClient } from 'mqtt';
import { HomeConfigService } from '../../application/ports/HomeConfigService.port';
import { HomeConfig } from '../../models/HomeConfig.model';

@Injectable()
export class HomeConfigMqttService implements HomeConfigService {
  private logger = new Logger(HomeConfigMqttService.name);

  constructor(private configService: ConfigService) {}

  async publishHomeConfig(homeConfig: HomeConfig): Promise<void> {
    const mqttClient = await this.connectClient();

    this.logger.log(
      `Publishing new bridge request for ${homeConfig.permitJoin}: ${homeConfig.permitJoin}}`,
    );
    mqttClient.publish(
      `zigbee2mqtt/bridge/request/permit_join`,
      JSON.stringify({ value: homeConfig.permitJoin }),
    );
  }

  private async connectClient(): Promise<MqttClient> {
    const mqttUrl = this.configService.get('MQTT_URL');
    return await connectAsync(mqttUrl);
  }
}
