import axios from 'axios';
import constants from './constants';

const { TEST_MODE, API_PORT, BASE_URI, PAGE_PORT } = constants;

const getTestAddress = () => '198.18.6.118';

const isDev = () => process.env.NODE_ENV === 'development';
const isTestMode = () => process.env.NODE_ENV === 'development' && TEST_MODE;

const getAPIUrl = (oru: string, category: string) => {
    const port = category === 'auth' ? PAGE_PORT : API_PORT;
    return `http://${oru}:${port}${BASE_URI}/${category}`;
};

const getHttpPage = (oru: string, category: string) =>
    `http://${oru}:${PAGE_PORT}/${category}`;

async function getWebSrcUsingHeader(url: string, token: string) {
    try {
        const res = await axios(url, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'text/html; charset=utf-8',
            },
        });

        return !!res.data;
    } catch (error) {
        return false;
    }
}

export default {
    getTestAddress,
    getHttpPage,
    getAPIUrl,
    getWebSrcUsingHeader,
    isDev,
    isTestMode,
};
