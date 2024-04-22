import { spawn } from 'child_process';
import { BrowserWindow, ipcMain } from 'electron';
import * as sqlite3 from 'sqlite3';

const SQLite3 = sqlite3.verbose();

const db = new SQLite3.Database('./public/avikus-sn.db', err => {
    if (err) {
        console.error('[SQLITE-MODULE] Error opening database:', err.message);
    } else {
        console.log('[SQLITE-MODULE] Connected to the database');
    }
});

const loadDb = (mainWindow: BrowserWindow) => {
    ipcMain.on('sqlite-module', (_, { asnValue }: { asnValue: string }) => {
        const sql = `SELECT macid FROM mac WHERE asn = '${asnValue}'`;
        db.all(sql, (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                const process = spawn('./public/pwgen-x86_64', [
                    `${rows}avikuscul`,
                ]);

                process.stdout.on('data', data => {
                    mainWindow.webContents.send('found-mac', {
                        data,
                    });
                });
            }
        });
    });
};

const closeDb = () => db.close();

export default { closeDb, loadDb };
