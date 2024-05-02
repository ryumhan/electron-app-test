import { BrowserWindow, dialog, ipcMain } from 'electron';
import { WebSocket } from 'ws';

let ws: WebSocket | null = null;

const createWebsocket = (mainWindow: BrowserWindow) => {
    let ip = '';
    let timeOut: NodeJS.Timeout;

    const closeWebsocket = () => {
        if (ws && ws.readyState === ws.OPEN) {
            try {
                ws.removeAllListeners();
                ws.close();
                ws = null;
            } catch (error) {
                console.error('[IPC-MODULE] closing Error');
            }
        }
    };

    const connect = () => {
        const open = () => {
            const target = `ws://${ip}:8000/neuboatdock `;
            ws = new WebSocket(target);
        };

        const errMessageCallback = err => {
            console.error(
                '[IPC-MODULE] Socket encountered error: ',
                err.message,
                'Closing socket',
            );

            ws?.close();
        };

        const closeCallback = e => {
            console.log(
                `[IPC-MODULE] Socket is closed. Reconnect will be attempted in 1 second.${ip}`,
                e.reason,
            );

            timeOut = setTimeout(() => {
                connect();
            }, 2000);
        };

        const openCallback = () => {
            console.log('[IPC-MODULE] WebSocket is Opend');
            clearTimeout(timeOut);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const messageCallback = (event: { data: any }) => {
            // Handle the incoming message here
            if (mainWindow?.isDestroyed()) return;

            const message = event.data;
            mainWindow.webContents.send('websocket-module', {
                type: 'data',
                data: message,
            });
        };

        try {
            closeWebsocket();
            open();
            // bind callback
            if (!ws) return;
            ws.onopen = openCallback;
            ws.onclose = closeCallback;
            ws.onerror = errMessageCallback;
            ws.onmessage = messageCallback;
        } catch (error) {
            console.error('[IPC-MODULE] WebSocket is Connection Error', error);
        }
    };

    ipcMain.on('websocket-module', (_, { type, data }) => {
        if (type === 'create') {
            if (!!data && data === ip) return;
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

export default { createWebsocket };
