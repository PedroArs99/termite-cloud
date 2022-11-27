import { Injectable, Logger } from '@nestjs/common';
import { DeviceService } from '../../application/ports/Device.service';
import { ConfigService } from '@nestjs/config';
import { connectAsync } from 'async-mqtt';
import { MqttClient } from 'mqtt';
import { Device } from '../../models/Device.model';

@Injectable()
export class DeviceServiceImpl implements DeviceService {
  private logger = new Logger(DeviceServiceImpl.name);

  constructor(private configService: ConfigService) {}

  async refreshState(friendlyName: string): Promise<void> {
    const mqttClient = await this.connectClient();
    mqttClient.publish(`zigbee2mqtt/${friendlyName}/get`, '{ "state": "" }');
    mqttClient.end();
  }

  async publishDeviceState(device: Device): Promise<void> {
    const mqttClient = await this.connectClient();

  }

  private async connectClient(): Promise<MqttClient> {
    const mqttUrl = this.configService.get('MQTT_URL');
    return await connectAsync(mqttUrl);
  }
}
