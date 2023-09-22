import { Status, webSocketInterface } from './webSocketInterface';

interface CameraType {
    type: string;
    status: Status;
}

export interface CameraStatus extends webSocketInterface {
    params: {
        inputStatus: {
            camList: CameraType[];
        };
        streamingStatus: {
            MFDIP: string; // IP address of MFD using SVM
            streaming: Status;
        };
    };
}
