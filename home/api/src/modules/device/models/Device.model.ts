export class Device {
    private constructor(readonly friendlyName: string) {}
  
    static create(friendlyName: string): Device{
      return new Device(friendlyName);
    }
  }
  