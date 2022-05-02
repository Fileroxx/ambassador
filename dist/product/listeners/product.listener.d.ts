import { Cache } from "cache-manager";
export declare class ProductListener {
    private cacheManager;
    constructor(cacheManager: Cache);
    handleProductUpdatedEvent(): Promise<void>;
}
