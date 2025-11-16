/** @typedef {import('sequelize').Model} Model */

/**
 * @typedef {Object} OcupacionAttributes
 * @property {number} idocupation
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
 * _sequelize.Model<OcupacionAttributes, OcupacionAttributes>
 * >}
 */
module.exports = (sequelize, DataTypes) => {
	return Ocupacion.init(sequelize, DataTypes);
};

class Ocupacion extends Sequelize.Model {
	/**
	 * @returns {_sequelize.ModelStatic<
	 * _sequelize.Model<OcupacionAttributes, OcupacionAttributes>
	 * >}
	 */
	static init(sequelize, DataTypes) {
		return super.init(
			{
				idocupation: {
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
				tableName: 'Ocupacion',
				timestamps: true,
				createdAt: 'createdat',
				updatedAt: 'updatedat',
				indexes: [
					{
						name: 'ocupacion_pkey',
						unique: true,
						fields: ['idocupation'],
					},
				],
			},
		);
	}

	// Define la relación 'uno a muchos' con Clientes
	static associate(models) {
		this.hasMany(models.Clientes, { foreignKey: 'idocupation' });
	}
}