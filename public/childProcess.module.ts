import { ChildProcessWithoutNullStreams, spawn, exec } from 'child_process';
import * as isDev from 'electron-is-dev';

let pythonProcess: ChildProcessWithoutNullStreams;

const exePath = isDev
    ? './public/dist/oru_ip_find.exe'
    : `${__dirname}/dist/oru_ip_find.exe`;

const exitPythonProcess = () => {
    if (pythonProcess) {
        if (!pythonProcess.kill() && pythonProcess.pid) {
            console.log('[PYTHON-PROCESS] taskkill');
            exec(`taskkill /pid ${pythonProcess.pid} /T /F`);
        }
    }
};

const createPythonProcess = () => {
    exitPythonProcess();

    pythonProcess = spawn(exePath);

    pythonProcess.on('spawn', () =>
        console.log('[PYTHON-PROCESS] process start'),
    );

    pythonProcess.on('exit', exitCode => {
        exec(`taskkill /pid ${pythonProcess.pid} /T /F`);
        console.log(`[PYTHON-PROCESS] Process ended with code (${exitCode})`);
    });
};
export default { createPythonProcess, exitPythonProcess };
