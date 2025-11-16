/** @typedef {import('sequelize').Model} Model */

/**
 * @typedef {Object} FormularioPrestamoAttributes
 * @property {number} idloanform
 * @property {number} idclient
 * @property {number} idproduct
 * @property {number} value
 * @property {number} cuotes
 * @property {Date} initdate
 * @property {number} status
 * @property {number} score
 * @property {string} createduser
 * @property {Date} createdat
 * @property {string} updateduser
 * @property {Date} updatedat
 */

/* eslint-disable no-use-before-define */
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return FormularioPrestamo.init(sequelize, DataTypes);
};

class FormularioPrestamo extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				idloanform: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				idclient: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: 'Clientes', 
						key: 'idclient',
					},
				},
				idproduct: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: 'ProductosFinancieros', 
						key: 'idproduct',
					},
				},
				value: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: false,
				},
				cuotes: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				initdate: {
					type: DataTypes.DATEONLY,
					allowNull: true,
				},
				status: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				score: {
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
				tableName: 'FormularioPrestamo',
				timestamps: true,
				createdAt: 'createdat',
				updatedAt: 'updatedat',
				indexes: [
					{
						name: 'formulario_prestamo_pkey',
						unique: true,
						fields: ['idloanform'],
					},
				],
			},
		);
	}
	
	static associate(models) {
		this.belongsTo(models.Clientes, { foreignKey: 'idclient' });
		this.belongsTo(models.ProductosFinancieros, { foreignKey: 'idproduct' });
	}
}