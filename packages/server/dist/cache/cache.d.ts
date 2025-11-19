type CacheEntry<T = any> = {
    value?: T;
    promise?: Promise<T>;
    timestamp: number;
    ttl?: number;
};
type Cache = {
    items: Record<string, CacheEntry>;
    has: (key: string) => boolean;
    get: (key: string) => any;
    getOrWait: (key: string) => Promise<any>;
    set: (key: string, value: any, ttl?: number) => void;
    setPromise: (key: string, promise: Promise<any>, ttl?: number) => Promise<any>;
    delete: (key: string) => void;
    isExpired: (key: string) => boolean;
};
export declare const cache: Cache;
export {};
//# sourceMappingURL=cache.d.ts.map