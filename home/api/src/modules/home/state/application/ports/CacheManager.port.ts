export abstract class CacheManagerPort {
    abstract set(key: string, value: any): void
    abstract get(key: string): any
}