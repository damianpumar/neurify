const ONE_SECOND = 1000;

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


export const cache: Cache = {
  items: {},

  has(key) {
    if (!this.items[key]) return false;
    if (this.isExpired(key)) {
      this.delete(key);
      return false;
    }
    return !!(this.items[key].value || this.items[key].promise);
  },

  isExpired(key) {
    const entry = this.items[key];
    if (!entry || !entry.ttl) return false;
    return Date.now() - entry.timestamp > entry.ttl * ONE_SECOND;
  },

  get(key) {
    if (!this.has(key)) return undefined;
    return this.items[key].value;
  },

  // 🔥 Obtener valor o esperar a que la promise termine
  async getOrWait(key) {
    if (!this.items[key]) return undefined;

    const entry = this.items[key];

    // Si hay promise en curso, esperarla
    if (entry.promise) {
      const value = await entry.promise;
      return value;
    }

    // Si hay valor, retornarlo
    return entry.value;
  },

  set(key, value, ttl?) {
    // Solo actualizar si no existe o si está expirado
    if (this.has(key) && !this.isExpired(key)) return;

    this.items[key] = {
      value,
      timestamp: Date.now(),
      ttl
    };

    if (ttl) {
      setTimeout(() => {
        this.delete(key);
      }, ttl * ONE_SECOND);
    }
  },

  // 🔥 Guardar una promise y resolverla automáticamente
  async setPromise(key, promise, ttl?) {
    // Si ya existe y no está expirado, retornar lo que hay
    if (this.has(key) && !this.isExpired(key)) {
      return this.getOrWait(key);
    }

    // Crear entrada con promise
    this.items[key] = {
      promise,
      timestamp: Date.now(),
      ttl
    };

    try {
      const value = await promise;

      // Convertir promise a valor
      this.items[key] = {
        value,
        timestamp: Date.now(),
        ttl
      };

      if (ttl) {
        setTimeout(() => {
          this.delete(key);
        }, ttl * ONE_SECOND);
      }

      return value;
    } catch (error) {
      // Si falla, eliminar la entrada
      this.delete(key);
      throw error;
    }
  },

  delete(key) {
    delete this.items[key];
  }
};
