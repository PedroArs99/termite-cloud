import { Injectable, Logger } from '@nestjs/common';
import { DeviceService } from '../../application/ports/Device.service';
import { ConfigService } from '@nestjs/config';
import { connectAsync } from 'async-mqtt';
import { MqttClient } from 'mqtt';
import { Device } from '../../models/Device.model';
import { OnEvent } from '@nestjs/event-emitter';
import { DeviceUpdatedEvent } from '../../models/DeviceUpdated.event';
import { Subject } from 'rxjs';

@Injectable()
export class DeviceServiceImpl implements DeviceService {
  private logger = new Logger(DeviceServiceImpl.name);
  private readonly _eventSource = new Subject<Device>();

  readonly eventSource = this._eventSource.asObservable();

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

    mqttClient.end();
  }

  pushDeviceChange(device: Device) {
    this._eventSource.next(device);
  }

  private async connectClient(): Promise<MqttClient> {
    const mqttUrl = this.configService.get('MQTT_URL');
    return await connectAsync(mqttUrl);
  }
}
