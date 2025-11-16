
/** @typedef {import('sequelize').Model} Model */

/**
 * @typedef {Object} ProductosFinancierosAttributes
 * @property {number} idproduct
 * @property {string} name
 * @property {number} status
 * @property {number} bankInterest
 * @property {string} createduser
 * @property {Date} createdat
 * @property {string} updateduser
 * @property {Date} updatedat
 */

/* eslint-disable no-use-before-define */
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return ProductosFinancieros.init(sequelize, DataTypes);
};

class ProductosFinancieros extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				idproduct: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				status: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				bankInterest: {
					type: DataTypes.DECIMAL(5, 2),
					allowNull: true,
				},
				createduser: {
					type: DataTypes.STRING,
					allowNull: false,
					defaultValue: 'system',
				},
				updateduser: {
					type: DataTypes.STRING,
					allowNull: false,
					defaultValue: 'system',
				},
			},
			{
				sequelize,
				tableName: 'ProductosFinancieros',
				timestamps: true,
				createdAt: 'createdat',
				updatedAt: 'updatedat',
				indexes: [
					{
						name: 'productos_financieros_pkey',
						unique: true,
						fields: ['idproduct'],
					},
				],
			},
		);
	}
	
	static associate(models) {
		this.hasMany(models.FormularioPrestamo, { foreignKey: 'idproduct' });
	}
}