import { DataSource } from 'apollo-datasource';

export class DBDataSource extends DataSource {
  constructor({ sequelize }) {
    super();
    this.db = sequelize;
  }

  getPipelines() {
    return this.db.models.Pipeline.findAll();
  }

  getPipeline(id) {
    return this.db.models.Pipeline.findByPk(id);
  }

  getEntries() {
    return this.db.models.Entry.findAll();
  }

  getEntry(id) {
    return this.db.models.Entry.findByPk(id);
  }

  async createPipeline(id, conf) {
    const pipeline = id === undefined
      ? this.db.models.Pipeline.build()
      : await this.db.models.Pipeline.findByPk(id);
    
    if (pipeline === null) {
      return false;
    }

    pipeline.name = conf.name ?? pipeline.name;
    pipeline.provider = conf.provider ?? pipeline.provider;
    pipeline.config = conf.config ?? pipeline.config;

    await pipeline.save();
    return true;
  }

  async createEntry(id, conf) {
    const entry = id === undefined
      ? this.db.models.Entry.build()
      : await this.db.models.Entry.findByPk(id);
    
    if (entry === null) {
      return false;
    }

    entry.name = conf.name ?? entry.name;
    entry.pipeline = conf.pipeline ?? entry.pipeline;
    entry.directory = conf.directory ?? entry.directory;
    entry.config = conf.config ?? entry.config;
    entry.filter_start = conf.filter?.start ?? entry.filter_start;
    entry.filter_end = conf.filter?.end ?? entry.filter_end;
    entry.filter_includes = conf.filter?.includes ?? entry.filter_includes;
    entry.filter_excludes = conf.filter?.excludes ?? entry.filter_excludes;

    await entry.save();
    return true;
  }
}

export default DBDataSource;