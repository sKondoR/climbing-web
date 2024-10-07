export const LOCAL_API_URL = 'http://localhost:3000';
export const API_URL = 'https://climbing-back.vercel.app';

export const getApiUrl = () => import.meta.env.DEV ?  LOCAL_API_URL : API_URL;

export const options = {
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }),
}
