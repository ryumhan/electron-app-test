import { CameraStatus } from './cameraStatus';
import { HearBeat } from './heartbeat';

export type webSocketMessage = CameraStatus | HearBeat;
