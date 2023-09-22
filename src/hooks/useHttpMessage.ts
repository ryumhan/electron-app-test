import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import utils from '@/utils';

interface UseAxiosProps<T> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    oruIp: string;
    category: string;
    initialData?: T | null;
    body?: { password: string };
}

const useHttpMessage = <T>({
    oruIp,
    category,
    method = 'GET',
    initialData = null,
    body,
}: UseAxiosProps<T>) => {
    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const timeOutCallback = () => {
        setLoading(false);
    };

    useEffect(() => {
        if (!oruIp) return;

        const fetchData = async () => {
            try {
                const response: AxiosResponse<T> = await axios({
                    method,
                    url: utils.getAPIUrl(oruIp, category),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: body,
                });

                setData(response.data);
                setLoading(false);
            } catch (err) {
                const axiosError = err as AxiosError;
                setError(axiosError.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [oruIp, category, method]);

    return { data, loading, error, timeOutCallback };
};

export default useHttpMessage;
