import { Injectable, Logger } from '@nestjs/common';
import { DeviceService } from '../../application/ports/Device.service';
import { ConfigService } from '@nestjs/config';
import { connectAsync } from 'async-mqtt';
import { MqttClient } from 'mqtt';
import { Device } from '../../models/Device.model';
import { OnEvent } from '@nestjs/event-emitter';
import { DeviceUpdatedEvent } from '../../models/DeviceUpdated.event';
import e from 'express';

@Injectable()
export class DeviceServiceImpl implements DeviceService {
  private logger = new Logger(DeviceServiceImpl.name);

  constructor(private configService: ConfigService) {}

  async refreshState(friendlyName: string): Promise<void> {
    const mqttClient = await this.connectClient();
    mqttClient.publish(`zigbee2mqtt/${friendlyName}/get`, '{ "state": "" }');
    mqttClient.end();
  }

  @OnEvent(DeviceUpdatedEvent.name)
  async updateDeviceState(event: DeviceUpdatedEvent) {
    this.logger.log(
      `Publishing new Device State for ${event.payload.friendlyName}`,
    );

    const mqttClient = await this.connectClient();

    mqttClient.publish(
      `zigbee2mqtt/${event.payload.friendlyName}/set`,
      JSON.stringify(event.payload.state),
    );
  }

  private async connectClient(): Promise<MqttClient> {
    const mqttUrl = this.configService.get('MQTT_URL');
    return await connectAsync(mqttUrl);
  }
}
