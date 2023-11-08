import { useEffect, useState } from 'react';
import { imgLoading, imgFailed } from '@/assets';
import {
    FailedIcons,
    LoadingIcons,
    LoadingPannelMessage,
    PannelMessage,
    PannelContainer,
} from './loadingPannel.styled';

const TIME_OUT = 20000;

interface Props {
    loaded: boolean;
    message: string;
    timeOutCallback: () => void;
}

function LoadingPannel({ loaded, message, timeOutCallback }: Props) {
    const [timeout, setTimeOutState] = useState(false);
    const [timeinst, setTimeinst] = useState<NodeJS.Timeout>();

    const startTimeOutWork = (): NodeJS.Timeout => {
        const inst = setTimeout(() => {
            setTimeOutState(true);
            timeOutCallback();
        }, TIME_OUT);

        setTimeinst(inst);

        return inst;
    };

    useEffect(() => {
        if (loaded) return () => clearTimeout(timeinst);
        const inst = startTimeOutWork();

        return () => clearTimeout(inst);
    }, [loaded]);

    // connection faied Pannel
    if (timeout) {
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
