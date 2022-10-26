import { Event } from './Event.model';

export class DomainObject {
    private _events = new Array<Event>();
    
    addEvent(event: any): void {
        this._events.push(event);
    }

    getEvents(): Array<Event> {
        return [...this._events]
    }
}