import { Model, DataTypes } from "sequelize";

export default class Task extends Model {

    static init(sequelize) {

        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: { // Pendente ou Concluída
                type: DataTypes.STRING,
                allowNull: false
            },
            dueDate: { // Data de vencimento/termino
                type: DataTypes.DATE,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
                sequelize,
                modelName: 'Task',
                tableName: 'tasks',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
}