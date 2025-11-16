/** @typedef {import('sequelize').Model} Model */

/**
 * @typedef {Object} ClientesAttributes
 * @property {number} idclient
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} rol
 * @property {number} age
 * @property {string} address
 * @property {string} city
 * @property {number} subsidiary  // FK: idsubsidiary
 * @property {number} seniority
 * @property {string} maritalStatus
 * @property {number} idstudy    // FK: idstudy
 * @property {number} idocupation // FK: idocupation
 * @property {number} income
 * @property {number} idcategory // FK: idcategory
 * @property {number} score
 * @property {Date} initdate
 * @property {string} createduser
 * @property {Date} createdat
 * @property {string} updateduser
 * @property {Date} updatedat
 */

/* eslint-disable no-use-before-define */
const Sequelize = require('sequelize');

/**
 * @returns {_sequelize.ModelStatic<
 * _sequelize.Model<ClientesAttributes, ClientesAttributes>
 * >}
 */
module.exports = (sequelize, DataTypes) => {
	return Clientes.init(sequelize, DataTypes);
};

class Clientes extends Sequelize.Model {
	/**
	 * @returns {_sequelize.ModelStatic<
	 * _sequelize.Model<ClientesAttributes, ClientesAttributes>
	 * >}
	 */
	static init(sequelize, DataTypes) {
		return super.init(
			{
				idclient: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING(100),
					allowNull: false,
					unique: true,
				},
				password: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				rol: {
					type: DataTypes.STRING(50),
					allowNull: false,
				},
				age: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				address: {
					type: DataTypes.STRING(200),
					allowNull: true,
				},
				city: {
					type: DataTypes.STRING(100),
					allowNull: true,
				},
				idsubsidiary: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: 'Sucursales', 
						key: 'idsubsidiary',
					},
				},
				seniority: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				maritalStatus: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				idstudy: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: 'NivelAcademico', 
						key: 'idstudy',
					},
				},
				idocupation: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: 'Ocupacion', 
						key: 'idocupation',
					},
				},
				income: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				idcategory: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: 'Categorias', 
						key: 'idcategory',
					},
				},
				score: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				initdate: {
					type: DataTypes.DATEONLY,
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
				tableName: 'Clientes',
				timestamps: true,
				createdAt: 'createdat',
				updatedAt: 'updatedat',
				// Si no usas borrado lógico (deletedat) en esta tabla, puedes omitir lo siguiente:
				// paranoid: true, 
				// deletedAt: 'deletedat', 
				indexes: [
					{
						name: 'clientes_pkey',
						unique: true,
						fields: ['idclient'],
					},
					{
						name: 'clientes_email_unique',
						unique: true,
						fields: ['email'],
					},
				],
			},
		);
	}

	// Define las relaciones aquí (después de importar otros modelos)
	static associate(models) {
		this.belongsTo(models.Sucursales, { foreignKey: 'idsubsidiary' });
		this.belongsTo(models.NivelAcademico, { foreignKey: 'idstudy' });
		this.belongsTo(models.Ocupacion, { foreignKey: 'idocupation' });
		this.belongsTo(models.Categorias, { foreignKey: 'idcategory' });
		this.hasMany(models.FormularioPrestamo, { foreignKey: 'idclient' });
	}
}