// models/UserModel.ts
import {
    Table,
    Column,
    Model,
    DataType,
    Unique,
    PrimaryKey,
    Default,
    AutoIncrement,
} from 'sequelize-typescript';
import { GENDER, USER_ROLS } from '../utils/types/EnumTypes';

@Table({
    tableName: 'user',
    timestamps: false, // Agrega createdAt y updatedAt
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare uniqueID: number;

    @Column({
        type: DataType.ENUM(...Object.values(USER_ROLS)),
        allowNull: false,
        defaultValue: USER_ROLS.USER,
    })
    declare rol: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare user_name: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    declare email: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    declare date_of_birth: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.ENUM(...Object.values(GENDER)),
        allowNull: true,
    })
    gender?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    ocupation?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    contact?: string;

    // Método para validar la contraseña (será útil para autenticación)
    // async validatePassword(plainPassword: string): Promise<boolean> {
    //   return await bcrypt.compare(plainPassword, this.password);
    // }
}

export default User;
