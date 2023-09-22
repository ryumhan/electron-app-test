import { WebSocket } from 'ws';

declare global {
    interface Window {
        webSocketInstance: WebSocket;
        mainWindow: BrowserWindow;
    }
}

export {};
