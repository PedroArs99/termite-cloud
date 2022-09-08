import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { CacheManagerPort } from "../application/ports/CacheManager.port";
import { Cache } from "cache-manager";

@Injectable()
export class CacheManagerAdapter implements CacheManagerPort {
    constructor(@Inject(CACHE_MANAGER) private cacheManagerImpl: Cache){}
    
    set(key: string, value: any): void {
        this.cacheManagerImpl.set(key, value);
    }

    get(key: string) {
        return this.cacheManagerImpl.get(key);
    }

}