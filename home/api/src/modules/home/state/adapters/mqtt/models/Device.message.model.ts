import { Device } from '../../../domain/device/Device.model';

export interface DeviceMessage {
  friendly_name: string;
  ieee_address: string;
  type: "Coordinator" | "Router";
}

export function messageToDevice(message: DeviceMessage): Device {
  return {
    friendlyName: message.friendly_name,
    ieeeAddress: message.ieee_address,
    type: message.type,
    state: "undefined"
  }
}
