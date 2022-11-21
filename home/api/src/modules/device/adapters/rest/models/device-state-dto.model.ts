import { DeviceState } from 'src/modules/device/models/Device-State.model';

export class DeviceStateDto {
  power: 'ON' | 'OFF';
  brightness: number;
  color: string;
  colorMode: 'xy' | 'color_temp';
  colorTemperature: number;

  constructor(
    power: 'ON' | 'OFF',
    brightness: number,
    color: string,
    colorMode: 'xy' | 'color_temp',
    colorTemperature: number,
  ) {
    this.power = power;
    this.brightness = brightness;
    this.color = color;
    this.colorMode = colorMode;
    this.colorTemperature = colorTemperature;
  }

  static fromDomain(deviceState: DeviceState): DeviceStateDto {
    return new DeviceStateDto(
      deviceState.power,
      deviceState.brightness,
      deviceState.color,
      deviceState.colorMode,
      deviceState.colorTemperature,
    );
  }
}

export function deviceStateDtoToDomain(dto: DeviceStateDto): DeviceState {
  return DeviceState.create(
    dto.power,
    dto.brightness,
    dto.color,
    dto.colorMode,
    dto.colorTemperature,
  );
}
