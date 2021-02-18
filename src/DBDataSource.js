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
}

export default DBDataSource;