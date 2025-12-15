declare interface AuthLoginData {
    email: string,
    password: string,
    persist?: boolean
}

declare type LoginResponseData = {
user: IUser,
tokens: {
    refresh: string, access: string
}
}
declare type ChangePasswordData = {
    old_password: string,
    new_password: string,
    new_password_confirm: string

}

declare interface ResetPasswordData extends Pick<ChangePasswordData, "new_password", "new_password_confirm">  {
email: string,
otp_code: string
}