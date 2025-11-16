/** @typedef {import('sequelize').Model} Model */

/**
 * @typedef {Object} SucursalesAttributes
 * @property {number} idsubsidiary
 * @property {string} description
 * @property {number} status
 * @property {string} createduser
 * @property {Date} createdat
 * @property {string} updateduser
 * @property {Date} updatedat
 */

/* eslint-disable no-use-before-define */
const Sequelize = require('sequelize');

/**
 * @returns {_sequelize.ModelStatic<
 * _sequelize.Model<SucursalesAttributes, SucursalesAttributes>
 * >}
 */
module.exports = (sequelize, DataTypes) => {
	return Sucursales.init(sequelize, DataTypes);
};

class Sucursales extends Sequelize.Model {
	/**
	 * @returns {_sequelize.ModelStatic<
	 * _sequelize.Model<SucursalesAttributes, SucursalesAttributes>
	 * >}
	 */
	static init(sequelize, DataTypes) {
		return super.init(
			{
				idsubsidiary: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				description: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				status: {
					type: DataTypes.INTEGER,
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
				tableName: 'Sucursales',
				timestamps: true,
				createdAt: 'createdat',
				updatedAt: 'updatedat',
				indexes: [
					{
						name: 'sucursales_pkey',
						unique: true,
						fields: ['idsubsidiary'],
					},
				],
			},
		);
	}

	// Define la relación 'uno a muchos' con Clientes
	static associate(models) {
		this.hasMany(models.Clientes, { foreignKey: 'idsubsidiary' });
	}
}