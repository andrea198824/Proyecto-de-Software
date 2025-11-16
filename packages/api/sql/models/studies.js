/** @typedef {import('sequelize').Model} Model */

/**
 * @typedef {Object} NivelAcademicoAttributes
 * @property {number} idstudy
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
 * _sequelize.Model<NivelAcademicoAttributes, NivelAcademicoAttributes>
 * >}
 */
module.exports = (sequelize, DataTypes) => {
	return NivelAcademico.init(sequelize, DataTypes);
};

class NivelAcademico extends Sequelize.Model {
	/**
	 * @returns {_sequelize.ModelStatic<
	 * _sequelize.Model<NivelAcademicoAttributes, NivelAcademicoAttributes>
	 * >}
	 */
	static init(sequelize, DataTypes) {
		return super.init(
			{
				idstudy: {
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
				tableName: 'NivelAcademico',
				timestamps: true,
				createdAt: 'createdat',
				updatedAt: 'updatedat',
				indexes: [
					{
						name: 'nivelacademico_pkey',
						unique: true,
						fields: ['idstudy'],
					},
				],
			},
		);
	}

	// Define la relación 'uno a muchos' con Clientes
	static associate(models) {
		this.hasMany(models.Clientes, { foreignKey: 'idstudy' });
	}
}