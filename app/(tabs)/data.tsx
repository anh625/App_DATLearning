// Định nghĩa interface cho thông tin người dùng
export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    gender: string;
    address: string;
    dob: string;
    role: Role;
    mobile_number: string | null;
    updated_at: string | null;
    created_at: string;
    no_password: boolean;
}

export interface ApiResponse {
    code: number;
    message: string;
    data: User;
}

// Lưu thông tin người dùng vào trạng thái toàn cục
let userInfo: User | null = null;

export const setInfoApi = (data: User) => {
    userInfo = data;
};

// Hàm lấy thông tin người dùng
export const getUserInfo = (): User | null => {
    return userInfo;
};


///////////////////userGoogle
// data.ts
// Định nghĩa interface cho thông tin người dùng
export interface UserGoogle {
    id: string;
    email: string;
    given_name: string;
    name: string;
    picture: string;
    verified_email: boolean;
}

// Lưu thông tin người dùng vào trạng thái toàn cục
let userGoogle: UserGoogle | null = null;

export const setInfoGoogle = (data: UserGoogle) => {
    userGoogle = data;
};

// Hàm lấy thông tin người dùng
export const getInfoGoogle = (): UserGoogle | null => {
    return userGoogle;
};