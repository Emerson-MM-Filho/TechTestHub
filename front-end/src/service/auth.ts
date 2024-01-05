import { User } from "../contexts/AuthContext";
import { api } from "./api";


type SignRequestData = {
    username: string;
    password: string;
};

type SignResponseData = {
    token: string;
    user: User;
};


export async function singInRequest({username, password}: SignRequestData): Promise<SignResponseData> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const authResponse = await api.post('/auth/', formData);

    const { token, user } = authResponse.data;

    return {
        token,
        user,
    };
}

export async function recoverUserInformation(): Promise<User> {
    const accountResponse = await api.get('/api/account/me');
    return accountResponse.data;
}
