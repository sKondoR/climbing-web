export const LOCAL_API_URL = 'http://localhost:3000';
export const API_URL = 'https://climbing-back.vercel.app';

export const getApiUrl = () => import.meta.env.DEV ?  LOCAL_API_URL : API_URL;

export const options = {
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }),
}

export const TEAM = [
    { allClimbId: 35292, name: 'Витя Кондрашин' },
    { allClimbId: 49224, name: 'Саша Мишан' },
    { allClimbId: 55862, name: 'Арина Мажара' },
    { allClimbId: 46994, name: 'Арина Бочкова' },
    { allClimbId: 47913, name: 'Глеб Еремин' },
    { allClimbId: 24178, name: 'Саша Мокруша' },
    { allClimbId: 54839, name: 'Марина Бриллиантова' },
    { allClimbId: 54736, name: 'Варя Дьячкова' },
];