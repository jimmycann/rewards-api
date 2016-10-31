'use strict'

/**
 * Lots
 * @description :: Model for storing lot data
 */

module.exports = {
  options: {
    tableName: 'rewards',
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
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 64]
      }
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        max: 255
      }
    },
    level: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      validate: {
        len: [1, 3]
      }
    },
    minQty: {
      type: Sequelize.INTEGER,
      validate: {
        len: [0, 5]
      }
    },
    minOrderAmt: {
      type: Sequelize.INTEGER,
      validate: {
        len: [0, 5]
      }
    },
    products: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    discountType: Sequelize.ENUM('pc', 'abs'),
    amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        len: [0, 5]
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }
}
