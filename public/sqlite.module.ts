import { spawn } from 'child_process';
import { BrowserWindow, ipcMain } from 'electron';
import * as sqlite3 from 'sqlite3';
import * as isDev from 'electron-is-dev';

const exePath = isDev ? './public/lib/' : `${__dirname}/`;

const SQLite3 = sqlite3.verbose();

const db = new SQLite3.Database(`${exePath}avikus-sn.db`, err => {
    if (err) {
        console.error('[SQLITE-MODULE] Error opening database:', err.message);
    } else {
        console.log('[SQLITE-MODULE] Connected to the database');
    }
});

const loadDb = (mainWindow: BrowserWindow) => {
    ipcMain.on('query-mac', (_, { asn }: { asn: string }) => {
        const sql = `SELECT macid FROM mac WHERE asn = '${asn}'`;
        db.all(sql, (err, rows) => {
            if (err) {
                console.error(err);
                return;
            }

            try {
                const process = spawn(`${exePath}pwgen_x86_64_windows.exe`, [
                    `${rows}avikuscul`,
                ]);

                process.stdout.on('data', data => {
                    mainWindow.webContents.send('gen-password', {
                        password: data,
                    });
                });
            } catch (error) {
                console.log('test');
            }
        });
    });

    ipcMain.on('query-asn', (_, { rsn }: { rsn: string }) => {
        const sql = `SELECT asn FROM raysn_por WHERE rsn = '${rsn}'`;
        db.all(sql, (err, rows) => {
            if (err) {
                console.error(err);
                return;
            }

            mainWindow.webContents.send('found-asn', {
                asn: rows,
            });
        });
    });
};

const closeDb = () => db.close();

export default { closeDb, loadDb };
