/** @typedef {import('sequelize').Model} Model */

/**
 * @typedef {Object} CategoriasAttributes
 * @property {number} idcategory
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
 * _sequelize.Model<CategoriasAttributes, CategoriasAttributes>
 * >}
 */
module.exports = (sequelize, DataTypes) => {
	return Categorias.init(sequelize, DataTypes);
};

class Categorias extends Sequelize.Model {
	/**
	 * @returns {_sequelize.ModelStatic<
	 * _sequelize.Model<CategoriasAttributes, CategoriasAttributes>
	 * >}
	 */
	static init(sequelize, DataTypes) {
		return super.init(
			{
				idcategory: {
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
				tableName: 'Categorias',
				timestamps: true,
				createdAt: 'createdat',
				updatedAt: 'updatedat',
				indexes: [
					{
						name: 'categorias_pkey',
						unique: true,
						fields: ['idcategory'],
					},
				],
			},
		);
	}

	// Define la relación 'uno a muchos' con Clientes
	static associate(models) {
		this.hasMany(models.Clientes, { foreignKey: 'idcategory' });
	}
}