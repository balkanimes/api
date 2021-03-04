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

  async createModel(Model, id, callback) {
    const model = id === undefined
      ? Model.build()
      : await Model.findByPk(id);
    
    if (model === null) {
      return false;
    }

    if (await callback(model)) {
      return null;
    }

    await model.save();
    return model.id;
  }

  createPipeline(id, conf) {
    return this.createModel(this.db.models.Pipeline, id, (pipeline) => {
      pipeline.name = conf.name ?? pipeline.name;
      pipeline.provider = conf.provider ?? pipeline.provider;
      pipeline.config = conf.config ?? pipeline.config;
    });
  }

  createEntry(id, conf) {
    return this.createModel(this.db.models.Entry, id, async (entry) => {
      entry.name = conf.name ?? entry.name;
      entry.PipelineId = conf.pipeline ?? entry.PipelineId;
      entry.directory = conf.directory ?? entry.directory;
      entry.config = conf.config ?? entry.config;
      entry.filter_start = conf.filter?.start ?? entry.filter_start;
      entry.filter_end = conf.filter?.end ?? entry.filter_end;
      entry.filter_includes = conf.filter?.includes ?? entry.filter_includes;
      entry.filter_excludes = conf.filter?.excludes ?? entry.filter_excludes;

      if ((await entry.getPipeline()) === null) {
        return true;
      }
    });
  }

  async deletePipeline(id) {
    return Boolean(await this.db.models.Pipeline.destroy({ where: { id } }));
  }

  async deleteEntry(id) {
    return Boolean(await this.db.models.Entry.destroy({ where: { id } }));
  }
}

export default DBDataSource;