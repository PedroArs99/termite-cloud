export class DeviceUpsertedEvent extends Event {
    constructor(readonly friendly_name: string){
        super("deviceUpserted")
    }
}