import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from './connection.js';
import { Pipeline } from './Pipeline.js';

export const Entry = sequelize.define('Entry', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  directory: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  config: DataTypes.JSON,

  filter_start: DataTypes.INTEGER,
  filter_end: DataTypes.INTEGER,
  filter_includes: DataTypes.ARRAY(DataTypes.STRING),
  filter_excludes: DataTypes.ARRAY(DataTypes.STRING),
});

Pipeline.hasMany(Entry);
Entry.belongsTo(Pipeline);
