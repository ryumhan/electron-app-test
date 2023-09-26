import { BrowserWindow, ipcMain } from 'electron';
import { WebSocket } from 'ws';

let ws: WebSocket | null = null;

const createWebsocket = (mainWindow: BrowserWindow) => {
    if (ws && ws.readyState === ws.OPEN) {
        try {
            ws?.close();
            ws = null;
        } catch (error) {
            console.error('[IPC-MODULE] closing Error');
        }
    }

    const connect = (data: string) => {
        try {
            const target = `ws://${data}:8000/neuboatdock `;
            ws = new WebSocket(target);
        } catch (error) {
            console.error('[IPC-MODULE] WebSocket is Connection Error', error);
        }
    };

    const bindMessageCallback = () => {
        if (!ws) return;
        ws.onmessage = event => {
            // Handle the incoming message here
            const message = event.data;
            mainWindow.webContents.send('websocket-module', {
                type: 'data',
                data: message,
            });
        };

        ws.onopen = () => {
            console.log('[IPC-MODULE] WebSocket is Opend');
        };

        ws.onclose = () => {
            console.log('[IPC-MODULE] WebSocket is Closed');
        };

        ws.onerror = event => {
            console.log('[IPC-MODULE] WebSocket got error', event);
        };
    };

    ipcMain.on('websocket-module', (ev, { type, data }) => {
        if (type === 'close' && ws && ws.readyState === ws.OPEN) {
            ws?.close();
            ws = null;
        } else if (type === 'create') {
            if (ws && ws.readyState === ws.CONNECTING) return;
            connect(data);
            bindMessageCallback();
        }
    });
};

export default { createWebsocket };
