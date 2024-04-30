/* eslint-disable @typescript-eslint/no-var-requires */
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { BrowserWindow, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';

const raysnData = require('./lib/raysn_por.json');
const macData = require('./lib/mac.json');

const exePath = isDev ? './public/lib/' : `${__dirname}/`;
let genPassProcess: ChildProcessWithoutNullStreams | null;

const loadDb = (mainWindow: BrowserWindow) => {
    ipcMain.on('query-mac', (_, { asn }: { asn: string }) => {
        try {
            const found = macData.find(elem => elem.asn === asn);
            if (!found) return;

            const { macid } = found;
            genPassProcess = spawn(`${exePath}pwgen_x86_64_windows.exe`, [
                `${macid}avikuscul`,
            ]);

            console.log(macid);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            genPassProcess.stdout.on('data', (buffer: any) => {
                const data = JSON.stringify(buffer);
                const bufferOrigin = Buffer.from(JSON.parse(data).data);

                const password = bufferOrigin.toString('utf8');
                mainWindow.webContents.send('gen-password', {
                    password,
                });
            });
        } catch (error) {
            console.log(
                '[SQLITE-MODULE] Error occured when process implementing',
            );
        }
    });

    ipcMain.on('query-asn', (_, { rsn }: { rsn: string }) => {
        const found = raysnData.find(elem => elem.rsn === rsn);
        if (!found) return;

        const { asn } = found;
        console.log(asn);
        mainWindow.webContents.send('found-asn', {
            asn,
        });
    });
};

export default { loadDb };
