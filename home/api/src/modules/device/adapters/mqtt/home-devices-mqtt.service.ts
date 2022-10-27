import { Injectable } from '@nestjs/common';
import { DeviceService } from '../../application/ports/DeviceService.port';
import { ConfigService } from '@nestjs/config';
import { connectAsync } from 'async-mqtt';
import { MqttClient } from 'mqtt';
import { Device } from '../../models/Device.model';
import { deviceStateDtoFromDomain } from './models/device-state-dto.model';

@Injectable()
export class DeviceServiceImpl implements DeviceService {
  constructor(private configService: ConfigService) {}

  async refreshState(friendlyName: string): Promise<void> {
    const mqttClient = await this.connectClient();
    mqttClient.publish(`zigbee2mqtt/${friendlyName}/get`, '{ "state": "" }');
    mqttClient.end();
  }

  async publishDeviceState(device: Device): Promise<void> {
    const mqttClient = await this.connectClient();

    const deviceStateDto = deviceStateDtoFromDomain(device.state);
    mqttClient.publish(
      `zigbee2mqtt/${device.friendlyName}/set`,
      JSON.stringify(deviceStateDto),
    );
  }

  private async connectClient(): Promise<MqttClient> {
    const mqttUrl = this.configService.get('MQTT_URL');
    return await connectAsync(mqttUrl);
  }
}
