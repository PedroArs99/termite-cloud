type ServiceStatus = "UP" | "DOWN";

export class ServiceHealth {
    readonly termiteCloud: ServiceStatus;

    constructor(){
        this.termiteCloud = "UP";
    }
}