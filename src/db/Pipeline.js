import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from './connection.js';

export const Pipeline = sequelize.define('Pipeline', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  config: DataTypes.JSON,
});
