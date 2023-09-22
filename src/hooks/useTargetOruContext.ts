import { createContext, useContext } from 'react';

export const TargetContext = createContext<{ oruIp: string }>({
    oruIp: '',
});

export const useTargetOru = () => {
    return useContext(TargetContext);
};
