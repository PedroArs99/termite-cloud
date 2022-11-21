import { Injectable, Logger } from '@nestjs/common';
import { DeviceService } from '../../application/ports/DeviceService.port';
import { ConfigService } from '@nestjs/config';
import { connectAsync } from 'async-mqtt';
import { MqttClient } from 'mqtt';
import { Device } from '../../models/Device.model';
import { deviceStateDtoFromDomain } from './models/device-state-dto.model';

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

    const deviceStateDto = deviceStateDtoFromDomain(device.state);

    if (deviceStateDto.color_mode === 'color_temp') {
      delete deviceStateDto.color;
    } else {
      delete deviceStateDto.color_temp;
    }

    this.logger.log(
      `Publishing new device state for ${device.friendlyName}: ${JSON.stringify(
        deviceStateDto,
      )}`,
    );
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
