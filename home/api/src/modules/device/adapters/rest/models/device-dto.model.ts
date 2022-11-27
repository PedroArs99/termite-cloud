import { Device } from 'src/modules/device/models/Device.model';

export class DeviceDto {
  constructor(
    readonly features: Map<String, String>,
    readonly friendlyName: string,
    readonly state?: Map<String, String>,
  ) {}

  static fromDomain(device: Device): DeviceDto {
    return new DeviceDto(device.features, device.friendlyName, device.state);
  }
}
