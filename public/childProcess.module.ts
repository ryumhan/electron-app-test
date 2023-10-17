import { ChildProcessWithoutNullStreams, spawn, exec } from 'child_process';
import * as isDev from 'electron-is-dev';

let pythonProcess: ChildProcessWithoutNullStreams;

const exePath = isDev
    ? './public/dist/oru_ip_find.exe'
    : `${__dirname}/dist/oru_ip_find.exe`;

const exitPythonProcess = () => {
    if (pythonProcess) {
        pythonProcess.kill();
    }

    if (pythonProcess?.pid) {
        console.log('[PYTHON-PROCESS] taskkill');
        exec(`taskkill /pid ${pythonProcess.pid} /T /F`);
    }

    pythonProcess?.removeAllListeners();
};

const destructPython = () => {
    exitPythonProcess();
    process.removeAllListeners();
};

const createPythonProcess = () => {
    exitPythonProcess();

    if (!pythonProcess) {
        pythonProcess = spawn(exePath, []);

        pythonProcess.on('spawn', () =>
            console.log('[PYTHON-PROCESS] process start'),
        );

        pythonProcess.on('exit', exitCode => {
            console.log(
                `[PYTHON-PROCESS] Process ended with code (${exitCode})`,
            );

            if (pythonProcess?.pid)
                exec(`taskkill /pid ${pythonProcess.pid} /T /F`);
        });
    }

    process.on('SIGINT', () => {
        exitPythonProcess();
    });

    process.on('exit', () => {
        exitPythonProcess();
    });
};

export default { createPythonProcess, destructPython };
