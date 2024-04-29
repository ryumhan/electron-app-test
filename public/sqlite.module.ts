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
        db.all(sql, (err, rows: { macid: string }[]) => {
            if (err) {
                console.error(err);
                return;
            }

            if (!rows.length) return;

            try {
                const { macid } = rows[0];
                const process = spawn(`${exePath}pwgen_x86_64_windows.exe`, [
                    `${macid}avikuscul`,
                ]);

                process.stdout.on('data', buffer => {
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
    });

    ipcMain.on('query-asn', (_, { rsn }: { rsn: string }) => {
        const sql = `SELECT asn FROM raysn_por WHERE rsn = '${rsn}'`;
        db.all(sql, (err, rows: { asn: string }[]) => {
            if (err) {
                console.error(err);
                return;
            }

            const { asn } = rows[0];
            mainWindow.webContents.send('found-asn', {
                asn,
            });
        });
    });
};

const closeDb = () => db.close();

export default { closeDb, loadDb };
