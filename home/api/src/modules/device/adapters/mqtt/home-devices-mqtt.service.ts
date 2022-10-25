import { Injectable } from '@nestjs/common';
import { DeviceService } from '../../application/ports/DeviceService.port';
import { ConfigService } from '@nestjs/config';
import { connectAsync } from 'async-mqtt';
import { MqttClient } from 'mqtt';

@Injectable()
export class DeviceServiceImpl implements DeviceService {
  constructor(private configService: ConfigService) {}

  async refreshState(friendlyName: string): Promise<void> {
    const mqttClient = await this.connectClient();
    mqttClient.publish(`zigbee2mqtt/${friendlyName}/get`, '{ "state": "" }')
    mqttClient.end()
  }


  private async connectClient(): Promise<MqttClient> {
    const mqttUrl = this.configService.get("MQTT_URL"); 
    return await connectAsync(mqttUrl);
  }

}
