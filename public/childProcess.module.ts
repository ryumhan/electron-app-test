import { ChildProcessWithoutNullStreams, execSync, spawn } from 'child_process';
import * as isDev from 'electron-is-dev';

let pythonProcess: ChildProcessWithoutNullStreams | null;

const exePath = isDev
    ? './public/lib/oru_ip_find.exe'
    : `${__dirname}/lib/oru_ip_find.exe`;

const exitPythonProcess = () => {
    if (pythonProcess?.pid) {
        console.log('[PYTHON-PROCESS] kill process', pythonProcess.pid);

        execSync(`taskkill /pid ${pythonProcess.pid} /T /F`);

        pythonProcess.removeAllListeners();
        pythonProcess = null;
    }
};

const createPythonProcess = async () => {
    exitPythonProcess();

    if (!pythonProcess) {
        pythonProcess = spawn(exePath);
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
