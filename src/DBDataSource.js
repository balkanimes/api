import { DataSource } from 'apollo-datasource';

export class DBDataSource extends DataSource {
  constructor({ sequelize }) {
    super();
    this.db = sequelize;
  }
}

export default DBDataSource;