export interface Auth{
    email: string,
    password: string
}

export interface Signup{
    email: string,
    password: string,
    name: string,
    role: string
}

export interface changePassword {
    oldPassword: string,
    newPassword: string
}

export interface changeMe{
    name: string
}