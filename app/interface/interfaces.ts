export interface NewUserDetails{
    name: string;
    email: string;
    password: string;
    confirmedPassword: string;
    phone?: string;
}

export type ExistingUserDetails = Pick<NewUserDetails, "email" | "password">;

export interface ISnackbarValues{
    visible: boolean;
    message: string;
}