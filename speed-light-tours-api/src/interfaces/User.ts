import {USER_ROLS, GENDER} from '../utils/types/EnumTypes'

export interface IUser{
    rol: typeof USER_ROLS,
    id: string;
    name: string,
    user_name: string,
    password: string,
    email: string,
    date_of_birth?: Date | string,
    gender?: typeof GENDER,
    contact?: string

}