import { DeviceState } from 'src/modules/device/models/Device-State.model';

export class DeviceStateDto {
  power: 'ON' | 'OFF';
  brightness: number;
  colorTemperature: number;
  color: string;

  constructor(
    power: 'ON' | 'OFF',
    brightness: number,
    colorTemperature: number,
    color: string,
  ) {
    this.power = power;
    this.brightness = brightness;
    this.colorTemperature = colorTemperature;
    this.color = color;
  }

  static fromDomain(deviceState: DeviceState): DeviceStateDto {
    return new DeviceStateDto(
      deviceState.power,
      deviceState.brightness,
      deviceState.colorTemperature,
      deviceState.color,
    );
  }
}

export function deviceStateDtoToDomain(dto: DeviceStateDto): DeviceState {
  return DeviceState.create(
    dto.power,
    dto.brightness,
    dto.colorTemperature,
    dto.color,
  );
}
