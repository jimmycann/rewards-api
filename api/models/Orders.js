'use strict'

/**
 * Lots
 * @description :: Model for storing lot data
 */

module.exports = {
  options: {
    tableName: 'orders',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    timestamps: true
  },
  associations: () => {
    Users.belongsTo(Titles, {foreignKey: 'titleId'})
  },
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      validate: {
        len: [1, 11]
      }
    },
    products: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    items: {
      type: Sequelize.JSON
    },
    rewards: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    subtotal: {
      type: Sequelize.INTEGER,
      validate: {
        len: [0, 11]
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }
}
