type Cache = {
  items: Record<string, any>;
  has: (key: string) => boolean;
  get: (key: string) => any;
  set: (key: string, value: any, ttl?: number) => void;
  delete: (key: string) => void;
};

const ONE_SECOND = 1000;

export const cache: Cache = {
  items: {},
  has(key) {
    return !!this.items[key];
  },
  get(key) {
    if (!this.has(key)) return;

    return this.items[key];
  },
  set(key, value, ttl) {
    if (this.has(key)) return;

    this.items[key] = value;

    if (!ttl) return;

    setTimeout(() => {
      this.delete(key);
    }, ttl * ONE_SECOND);
  },
  delete(key) {
    delete this.items[key];
  },
};
