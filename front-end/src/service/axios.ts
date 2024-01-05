import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';


export const getApiClient = (ctx: any = null): AxiosInstance => {
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
    });
    
    const { 'techTestBix.authToken': token } = parseCookies(ctx);

    if (token) {
        api.defaults.headers['Authorization'] = `Token ${token}`;
    }

    return api;
}