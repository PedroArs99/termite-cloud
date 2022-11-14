import { DeviceState } from 'src/modules/device/models/Device-State.model';
import * as ColorConverter from 'cie-rgb-color-converter';
import { Logger } from '@nestjs/common';

export interface DeviceStateDto {
  brightness: number;
  state: 'ON' | 'OFF';
  color_temp: number;
  color: { x: number; y: number };
}

export function deviceStateToDomain(dto: DeviceStateDto): DeviceState {
  const rgb: { r: number; g: number; b: number } = ColorConverter.xyBriToRgb(
    dto.color.x,
    dto.color.y,
    dto.brightness,
  );
  const hex = rgbToHex(rgb);

  return DeviceState.create(dto.state, dto.brightness, dto.color_temp, hex);
}

export function deviceStateDtoFromDomain(
  deviceState: DeviceState,
): DeviceStateDto {
  const { r, g, b } = hexToRgb(deviceState.color);
  const { x, y } = ColorConverter.rgbToXy(r, g, b);

  return {
    state: deviceState.power,
    brightness: deviceState.brightness,
    color_temp: deviceState.colorTemperature,
    color: {
      x,
      y,
    },
  };
}

function valueToHex(c: number): string {
  return c.toString(16);
}

function rgbToHex({ r, g, b }: any): string {
  const value = valueToHex(r) + valueToHex(g) + valueToHex(b);

  return `#${value.toUpperCase()}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  Logger.error(`Parsing ${hex} to rgg with regex: ${result.toString()}`)
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}
