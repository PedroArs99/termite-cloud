export class DomainObject {
    private _events = new Array<any>();
    
    addEvent(event: any): void {
        this._events.concat(event);
    }

    getEvents(): Array<any> {
        return [...this._events]
    }
}