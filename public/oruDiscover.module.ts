import { spawn } from 'child_process';
import * as dgram from 'dgram';
import { BrowserWindow, ipcMain } from 'electron';

const pythonProcess = spawn('python', ['./public/oru_ip_find.py']);

let server: dgram.Socket;
const PORT = 64001; // Change to your desired port number

const createUdpServer = (mainWindow: BrowserWindow) => {
    interface MessageType {
        new_oru: number;
        oru_ip: string;
    }

    let gotAck = false;
    let recentIp = '';

    server = dgram.createSocket('udp4');
    server.on('error', err => {
        server.close();
        console.error(`[UDP-MODULE] Server error:\n${err.stack}`);
    });

    server.on('message', msg => {
        const got: MessageType = JSON.parse(msg.toString());
        recentIp = got.oru_ip;

        if (got.new_oru === 1 && !gotAck) {
            mainWindow.webContents.send('oruDiscover-module', {
                type: 'data',
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

    ipcMain.on('oruDiscover-module', (_, { data }) => {
        if (data === recentIp) gotAck = true;
    });

    server.bind(PORT);
};

const createPythonProcess = () => {
    pythonProcess.stdout.on('data', data => {
        console.log('[PYTHON-PROCESS] data got from python', data);
    });

    pythonProcess.stderr.on('data', stacktrace => {
        console.error('[PYTHON-PROCESS] data', stacktrace.toString('utf8'));
    });

    pythonProcess.on('exit', exitCode => {
        console.log(`[PYTHON-PROCESS] Process ended with code (${exitCode})`);
    });
};

export default { createUdpServer, createPythonProcess };
