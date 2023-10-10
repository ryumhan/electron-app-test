import { ChildProcessWithoutNullStreams, spawn, exec } from 'child_process';
import * as dgram from 'dgram';
import * as isDev from 'electron-is-dev';
import { BrowserWindow, ipcMain } from 'electron';

let pythonProcess: ChildProcessWithoutNullStreams;
let server: dgram.Socket;

const exePath = isDev
    ? './public/dist/oru_ip_find.exe'
    : `${__dirname}/dist/oru_ip_find.exe`;
const PORT = 64001; // Change to your desired port number

const exitPythonProcess = () => {
    if (pythonProcess) {
        exec(`taskkill /pid ${pythonProcess.pid} /T /F`);
        pythonProcess.kill();
    }
};

const createPythonProcess = () => {
    exitPythonProcess();

    pythonProcess = spawn(exePath, { detached: true });

    pythonProcess.on('spawn', () =>
        console.log('[PYTHON-PROCESS] process start'),
    );

    pythonProcess.on('exit', exitCode => {
        exec(`taskkill /pid ${pythonProcess.pid} /T /F`);
        console.log(`[PYTHON-PROCESS] Process ended with code (${exitCode})`);
    });
};

const createUdpServer = (mainWindow: BrowserWindow) => {
    interface MessageType {
        new_oru: number;
        oru_ip: string;
    }

    let gotAck = false;
    let recentIp = '';

    if (server) server.close();

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

export default { createUdpServer, createPythonProcess, exitPythonProcess };
