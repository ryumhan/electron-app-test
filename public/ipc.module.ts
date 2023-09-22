import { BrowserWindow, ipcMain } from 'electron';
import { WebSocket } from 'ws';

let ws: WebSocket;

const createWebsocket = (mainWindow: BrowserWindow) => {
    const connect = (data: string) => {
        try {
            const target = `ws://${data}:8000/neuboatdock `;
            ws = new WebSocket(target);
        } catch (error) {
            console.error('[IPC-MODULE] WebSocket is Connection Error', error);
        }
    };

    const bindMessageCallback = () => {
        ws.onmessage = event => {
            // Handle the incoming message here
            const message = event.data;
            mainWindow.webContents.send('websocket-module', {
                type: 'data',
                data: message,
            });
        };

        ws.onclose = event => {
            console.log('[IPC-MODULE] WebSocket is Closed', event);
        };

        ws.onerror = event => {
            console.log('[IPC-MODULE] WebSocket got error', event);
        };
    };

    ipcMain.on('websocket-module', (ev, { type, data }) => {
        if (type === 'close' && ws.readyState === ws.OPEN) {
            ws?.close();
        } else if (type === 'create') {
            connect(data);
            bindMessageCallback();
        }
    });
};

export default { createWebsocket };
