import { DomainObject } from "src/modules/common/DomainObject.model";

export class Device extends DomainObject {
    constructor(
      readonly friendlyName: string,
    ) {
      super()
    }

    toString(): string {
      return JSON.stringify(this);
    }
  }
  