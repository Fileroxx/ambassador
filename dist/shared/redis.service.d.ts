import { Cache } from 'cache-manager';
import { RedisClient } from 'redis';
export declare class RedisService {
    private cacheManager;
    constructor(cacheManager: Cache);
    getClient(): RedisClient;
}
