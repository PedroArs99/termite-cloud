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

  async updateDeviceState(friendlyName:string, newState: Map<string, any>) {
    this.logger.log(
      `Publishing new Device State for ${friendlyName}`,
    );

    const mqttClient = await this.connectClient();

    mqttClient.publish(
      `zigbee2mqtt/${friendlyName}/set`,
      JSON.stringify(newState),
    );

    mqttClient.end();
  }

  @OnEvent(DeviceUpdatedEvent.name)
  pushDeviceChange(event: DeviceUpdatedEvent) {
    this._eventSource.next(event.payload);
  }

  private async connectClient(): Promise<MqttClient> {
    const mqttUrl = this.configService.get('MQTT_URL');
    return await connectAsync(mqttUrl);
  }
}
