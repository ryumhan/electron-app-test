import axios, {
    AxiosResponse,
    AxiosError,
    RawAxiosRequestHeaders,
} from 'axios';
import { useState, useEffect } from 'react';

interface UseAxiosProps<T> {
    headers?: RawAxiosRequestHeaders;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    initialData?: T | null;
    body?: { password: string };
}

const useHttpMessage = <T>({
    url,
    method = 'GET',
    initialData = null,
    headers,
    body,
}: UseAxiosProps<T>) => {
    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const timeOutCallback = () => {
        setLoading(false);
    };

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            try {
                const response: AxiosResponse<T> = await axios({
                    method,
                    url,
                    headers: headers || {
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
    }, [url, method, headers, body]);

    return { data, loading, error, timeOutCallback };
};

export default useHttpMessage;
