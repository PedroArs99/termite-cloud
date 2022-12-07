import { Observable } from 'rxjs';
import { Device } from '../../models/Device.model';

export interface DeviceService {
  readonly eventSource: Observable<Device>;

  refreshState(friendlyName: string): void;
  updateDeviceState(friendlyName: string, newState: Map<string, any>);
}
