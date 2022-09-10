import { VendorSpec } from "./VendorSpec.model";

export interface Device {
    description: string,
    friendlyName: string,
    ieeeAddress: string,
    supported: boolean,
    type: string,
    vendorSpec: VendorSpec,
} 