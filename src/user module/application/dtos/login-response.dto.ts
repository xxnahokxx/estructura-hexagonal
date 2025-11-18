

export interface LoginResponseDTO {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
    expiresIn: string;
}
