import { cacheAdapterEnhancer } from "axios-extensions";
import LRUCache from "lru-cache";
// Cache 1 hour
const CACHE_HOUR = 1000 * 60 * 60;

const defaultCache = new LRUCache({ maxAge: CACHE_HOUR });

export default function({ $axios }) {
  const defaults = $axios.defaults;
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: "useCache",
    defaultCache
  });
}
