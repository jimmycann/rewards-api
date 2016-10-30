'use strict'

/**
 * Lots
 * @description :: Model for storing lot data
 */

module.exports = {
  options: {
    tableName: 'users',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    timestamps: true
  },
  associations: () => {

  },
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [3, 254]
      }
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 64]
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 64]
      }
    },
    mob: {
      type: Sequelize.BIGINT,
      defaultValue: null,
      validate: {
        len: [8, 16]
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }
}
