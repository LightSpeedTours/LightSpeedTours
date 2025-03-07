// models/UserModel.ts
import { Table, Column, Model, DataType, Unique, PrimaryKey, Default, AutoIncrement } from 'sequelize-typescript';
import { GENDER, USER_ROLS } from '../utils/types/EnumTypes';

@Table({
  tableName: 'user',
  timestamps: false // Agrega createdAt y updatedAt
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare uniqueID: number;

  @Column({
    type: DataType.ENUM(...Object.values(USER_ROLS)),
    allowNull: false,
    defaultValue: USER_ROLS.USER
  })
  declare rol: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare nombre: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare nombre_usuario: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  })
  declare correo: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  declare fecha_nacimiento: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare contraseña: string;

  @Column({
    type: DataType.ENUM(...Object.values(GENDER)),
    allowNull: true
  })
  genero?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  ocupacion?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  telefono?: string;

  // Método para validar la contraseña (será útil para autenticación)
  async validarContraseña(contraseñaPlana: string): Promise<boolean> {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(contraseñaPlana, this.contraseña);
  }
}

export default User;