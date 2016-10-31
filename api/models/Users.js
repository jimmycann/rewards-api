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
    Users.hasOne(Titles, {foreignKey: 'titleId'})
  },
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titleId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        len: [1, 2]
      }
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
    level: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        len: [1, 3]
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }
}
