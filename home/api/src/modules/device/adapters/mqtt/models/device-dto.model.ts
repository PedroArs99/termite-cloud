export interface DeviceDto {
  friendly_name: string;
  definition: DeviceDefinitionDto;
}

interface DeviceDefinitionDto {
  exposes: ExposeDto[];
}

interface ExposeDto {
  features?: ExposeDto[];
  name?: string;
  property?: string;
  type: string;
}

export function normalizeDefinition(
  definition: DeviceDefinitionDto,
): Map<String, String> {
  const features: Map<String, String> = new Map();

  const flatennedCapabilities = flattenCapabilities(definition.exposes);
  
  flatennedCapabilities.forEach((capability) => {
    switch (capability.type) {
      case 'enum':
      case 'numeric':
      case 'composite':
        features[capability.name] = capability.property;
        break;
      default:
    }
  });

  return features;
}

function flattenCapabilities(capabilities: ExposeDto[]): ExposeDto[] {
  const result = [];

  capabilities.forEach((capability) => {
    const flattened = flattenCapability(capability);

    if (Array.isArray(flattened)) {
      result.push(...flattened);
    } else {
      result.push(flattened);
    }
  });

  return result;
}

function flattenCapability(capability: ExposeDto): ExposeDto | ExposeDto[] {
  switch (capability.type) {
    case 'enum':
    case 'numeric':
      return capability;
    default:
      return capability.features;
  }
}
