import { BrowserWindow, dialog, ipcMain } from 'electron';
import { WebSocket } from 'ws';

let ws: WebSocket | null = null;

const destructWebsocket = () => {
    if (ws && ws.readyState === ws.OPEN) {
        try {
            ws?.close();
            ws.removeAllListeners();
            ws = null;
        } catch (error) {
            console.error('[IPC-MODULE] closing Error');
        }
    }
};

const createWebsocket = (mainWindow: BrowserWindow) => {
    destructWebsocket();

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

    ipcMain.on('websocket-module', (_, { type, data }) => {
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

ipcMain.on('open-directory-dialog', event => {
    dialog
        .showOpenDialog({
            properties: ['openDirectory'],
        })
        .then(result => {
            event.reply('selected-directory', result.filePaths[0]);
        });
});

export default { createWebsocket, destructWebsocket };
