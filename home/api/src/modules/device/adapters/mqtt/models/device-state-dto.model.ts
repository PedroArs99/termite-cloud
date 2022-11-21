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
  let rgb: { r: number; g: number; b: number } = ColorConverter.xyBriToRgb(
    dto.color.x,
    dto.color.y,
    dto.brightness,
  );

  // Correct values bigger than 255 (Library fault)
  rgb = {
    r: rgb.r <= 255 ? rgb.r : 0,
    g: rgb.g <= 255 ? rgb.g : 0,
    b: rgb.b <= 255 ? rgb.b : 0,
  };

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
  const value = c.toString(16);

  return value.length === 1 ? 0 + value : value;
}

function rgbToHex({ r, g, b }: any): string {
  const value = valueToHex(r) + valueToHex(g) + valueToHex(b);
  Logger.debug(`Casting from rgb(${r},${g},${b}) to Hex as ${value}`);

  return `#${value.toUpperCase()}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  try {
    let result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex);

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  } catch (e) {
    Logger.error(`Type Error when casting Hex-to-Rgb: ${hex}`);
  }
}
