import { DomainObject } from 'src/modules/common/DomainObject.model';

export class Device extends DomainObject {
  constructor(
    readonly friendlyName: string,
    readonly features: Map<String, String>,
  ) {
    super();
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
