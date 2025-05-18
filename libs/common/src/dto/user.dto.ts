export interface UserDto {
    _id: string;
    email: string;
    username: string;
    password: string;
    roles?: string[];
}