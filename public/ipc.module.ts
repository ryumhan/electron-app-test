import { BrowserWindow, dialog, ipcMain } from 'electron';
import { WebSocket } from 'ws';

let ws: WebSocket | null = null;

const destructWebsocket = () => {
    if (ws && ws.readyState === ws.OPEN) {
        try {
            ws.close();
            ws = null;
        } catch (error) {
            console.error('[IPC-MODULE] closing Error');
        }
    }
};

const createWebsocket = (mainWindow: BrowserWindow) => {
    let ip = '';

    destructWebsocket();

    const connect = () => {
        try {
            console.log('[IPC-MODULE] WebSocket is connectig to ', ip);
            const target = `ws://${ip}:8000/neuboatdock `;
            ws = new WebSocket(target);

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

            ws.onclose = e => {
                console.log(
                    '[IPC-MODULE] Socket is closed. Reconnect will be attempted in 1 second.',
                    e.reason,
                );

                setTimeout(() => {
                    connect();
                }, 1000);
            };

            ws.onerror = err => {
                console.error(
                    '[IPC-MODULE] Socket encountered error: ',
                    err.message,
                    'Closing socket',
                );

                ws?.close();
            };
        } catch (error) {
            console.error('[IPC-MODULE] WebSocket is Connection Error', error);
        }
    };

    ipcMain.on('websocket-module', (_, { type, data }) => {
        if (type === 'create') {
            if (ws && ws.readyState === ws.CONNECTING) return;
            ip = data;
            connect();
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
