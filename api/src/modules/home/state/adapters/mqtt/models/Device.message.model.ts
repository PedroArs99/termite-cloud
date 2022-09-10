import { Device } from '../../../domain/device/Device.model';
import { VendorSpec } from '../../../domain/device/VendorSpec.model';

export interface DeviceMessage {
  description: string;
  friendly_name: string;
  ieee_address: string;
  supported: boolean;
  type: string;
  definition: VendorSpec;
}

export function messageToDevice(message: DeviceMessage): Device {
  return {
    description: message.description,
    friendlyName: message.friendly_name,
    ieeeAddress: message.ieee_address,
    supported: message.supported,
    type: message.type,
    vendorSpec: message.definition
  }
}
