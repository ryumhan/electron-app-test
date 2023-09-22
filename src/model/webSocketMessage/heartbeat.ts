import { Status, webSocketInterface } from './webSocketInterface';

export interface HearBeat extends webSocketInterface {
    params: {
        ORU: Status;
        // Status of ORU, normal: works properly, error: SVM service not supported
        CCU: Status;
        // Status of CCU, normal: all CCUs work properly, error: one of the CCUs malfunctioning
    };
}
