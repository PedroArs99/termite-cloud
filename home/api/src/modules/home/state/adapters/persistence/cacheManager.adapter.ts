import { Injectable } from "@nestjs/common";
import { Key } from "readline";
import { CacheManagerPort } from "../../application/ports/CacheManager.port";

@Injectable()
export class CacheManagerAdapter implements CacheManagerPort {
    private storage = new Map<string, any>();

    set(key: string, value: any): void {
        this.storage.set(key, value);
    }

    get(key: string): any {
        return this.storage.get(key);
    }

}