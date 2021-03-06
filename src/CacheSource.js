import { DataSource } from 'apollo-datasource';

export class CacheSource extends DataSource {
  initialize({ context, cache }) {
    this.context = context;
    this.cache = cache;
  }

  getProviders() {
    return this.get('hehdon:provider', []);
  }
  
  async getProvider(name) {
    return this.get(`hehdon:provider:${name}`);
  }

  async setProviders(providers) {
    await Promise.all(providers.map(
      p => this.cache.set(
        `hehdon:provider:${p.name}`,
        JSON.stringify(p.schema),
        { ttl: this.context.cacheTTL },
      )
    ));
    await this.cache.set(
      'hehdon:provider',
      JSON.stringify(providers.map(v => v.name)),
      { ttl: this.context.cacheTTL },
    );
    return true;
  }

  async get(key, ifEmpty) {
    const data = await this.cache.get(key);
    return data
      ? JSON.parse(data)
      : ifEmpty;
  }
}

export default CacheSource;