import { DataSource } from 'apollo-datasource';

export class CacheSource extends DataSource {
  initialize({ cache }) {
    this.cache = cache;
  }

  getProviders() {
    return this.get('hehdon:provider', []);
  }
  
  async getProvider(name) {
    return this.get(`hehdon:provider:${name}`);
  }

  async get(key, ifEmpty) {
    const data = await this.cache.get(key);
    return data
      ? JSON.parse(data)
      : ifEmpty;
  }
}

export default CacheSource;