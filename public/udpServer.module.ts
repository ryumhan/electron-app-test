import * as dgram from 'dgram';
import { BrowserWindow, ipcMain } from 'electron';

let server: dgram.Socket;
const PORT = 64001; // Change to your desired port number

const destructUdp = () => {
    if (server) {
        server.close();
        server.removeAllListeners();
    }
};

const createUdpServer = (mainWindow: BrowserWindow) => {
    interface MessageType {
        new_oru: number;
        oru_ip: string;
    }

    let gotAck = false;
    let recentIp = '';

    destructUdp();

    server = dgram.createSocket('udp4');
    server.on('error', err => {
        server.close();
        console.error(`[UDP-MODULE] Server error:\n${err.stack}`);
    });

    server.on('message', msg => {
        const got: MessageType = JSON.parse(msg.toString());
        recentIp = got.oru_ip;
        console.log(got);

        if (!gotAck) {
            mainWindow.webContents.send('oruDiscover-module', {
                data: got.oru_ip,
            });
        }
    });

    server.on('listening', () => {
        const address = server.address();
        gotAck = false;

        console.log(
            `[UDP-MODULE] Server is listening on ${address.address}:${address.port}`,
        );
    });

    server.on('close', () => {
        console.log(`[UDP-MODULE] Server is closed`);
    });

    ipcMain.on('oruDiscover-module', (_, { data }) => {
        if (data === recentIp) gotAck = true;
    });

    server.bind(PORT);
};

export default { createUdpServer, destructUdp };
