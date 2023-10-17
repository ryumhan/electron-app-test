import { SpawnSyncReturns, execSync, spawnSync } from 'child_process';
import * as isDev from 'electron-is-dev';

let pythonProcess: SpawnSyncReturns<Buffer> | null;

const exePath = isDev
    ? './public/dist/oru_ip_find.exe'
    : `${__dirname}/dist/oru_ip_find.exe`;

const exitPythonProcess = () => {
    if (pythonProcess?.pid) {
        console.log('[PYTHON-PROCESS] kill process', pythonProcess.pid);
        execSync(`taskkill /pid ${pythonProcess.pid} /T /F`);
        // pythonProcess.kill();
        pythonProcess = null;
    }
};

const createPythonProcess = async () => {
    if (pythonProcess) exitPythonProcess();

    if (!pythonProcess) {
        pythonProcess = spawnSync(exePath);
    }
};

process.on('SIGINT', () => {
    console.log('[PYTHON-PROCESS] SIGINT');
    exitPythonProcess();
});

process.on('exit', async () => {
    console.log('[PYTHON-PROCESS] EXIT');
    exitPythonProcess();
});

export default { createPythonProcess };
