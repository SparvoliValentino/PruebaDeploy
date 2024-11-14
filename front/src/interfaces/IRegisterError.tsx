export interface IRegisterError {
    [key: string]: string | undefined;
    id?:string;
    password?: string;
    confirmPassword?: string
    email?: string;
    username?: string;
    address?: string;
    phone?: string;
}