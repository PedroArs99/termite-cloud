import { DeviceState } from 'src/modules/device/models/Device-State.model';

export interface DeviceStateDto {
  brightness: number;
  state: 'ON' | 'OFF';
  color_temp: number;
}

export function deviceStateToDomain(dto: DeviceStateDto): DeviceState {
  return DeviceState.create(dto.state, dto.brightness, dto.color_temp);
}

export function deviceStateDtoFromDomain(
  deviceState: DeviceState,
): DeviceStateDto {
  return {
    state: deviceState.power,
    brightness: deviceState.brightness,
    color_temp: deviceState.colorTemperature
  };
}
