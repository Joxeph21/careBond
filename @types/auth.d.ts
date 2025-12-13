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