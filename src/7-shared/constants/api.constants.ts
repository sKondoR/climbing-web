export const ALLCLIMB_URL = 'https://www.allclimb.com/ru'

export const getApiUrl = () => import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_BACK: import.meta.env.VITE_APP_HOST_BACK;

export const options = {
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }),
}
