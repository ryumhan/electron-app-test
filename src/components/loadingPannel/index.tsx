import { useEffect, useState } from 'react';
import { imgFailed, imgLoading } from '@/assets';
import {
    FailedIcons,
    LoadingIcons,
    LoadingPannelMessage,
    PannelContainer,
    PannelMessage,
} from './loadingPannel.styled';

interface Props {
    loadingTimeout: number;
    loaded: boolean;
    message: string;
    trigger?: number;
    timeOutCallback: () => void;
}

function LoadingPannel({
    loaded,
    message,
    trigger,
    loadingTimeout,
    timeOutCallback,
}: Props) {
    const [timeout, setTimeOutState] = useState(false);
    const [timeinst, setTimeinst] = useState<NodeJS.Timeout>();

    const startTimeOutWork = (): NodeJS.Timeout => {
        const inst = setTimeout(() => {
            setTimeOutState(true);
            timeOutCallback();
        }, loadingTimeout);

        setTimeinst(inst);
        return inst;
    };

    useEffect(() => {
        if (loaded) {
            return () => clearTimeout(timeinst);
        }

        const inst = startTimeOutWork();
        return () => clearTimeout(inst);
    }, [loaded]);

    useEffect(() => {
        if (trigger) {
            clearTimeout(timeinst);
            const inst = startTimeOutWork();
            return () => clearTimeout(inst);
        }
    }, [trigger]);

    if (!trigger && timeout) {
        return (
            <PannelContainer>
                <FailedIcons src={imgFailed} />
                <PannelMessage>Connection Failed</PannelMessage>
            </PannelContainer>
        );
    }

    // loading Pannel
    return (
        <PannelContainer>
            <LoadingIcons src={imgLoading} />
            <LoadingPannelMessage>{message} </LoadingPannelMessage>
        </PannelContainer>
    );
}

export default LoadingPannel;
