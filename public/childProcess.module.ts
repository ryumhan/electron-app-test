import { ChildProcess, exec, execFile } from 'child_process';
import * as isDev from 'electron-is-dev';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const find = require('find-process');

let pythonProcess: ChildProcess | null;
let processList: number[] = [];

const exePath = isDev
    ? './public/dist/oru_ip_find.exe'
    : `${__dirname}/dist/oru_ip_find.exe`;

const exitPythonProcess = () => {
    if (pythonProcess?.pid) {
        console.log('[PYTHON-PROCESS] kill process', pythonProcess.pid);
        exec(`taskkill /pid ${pythonProcess.pid} /T /F`);
        pythonProcess.removeAllListeners();
        // pythonProcess.kill();
        pythonProcess = null;
        processList = [];
    }
};

const createPythonProcess = async () => {
    if (pythonProcess) exitPythonProcess();

    if (!pythonProcess) {
        pythonProcess = execFile(exePath);

        pythonProcess.on('spawn', async () => {
            const list = await find('name', 'oru_ip_find.exe');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            processList = list.map((elem: any) => elem.pid);
            console.log(
                '[PYTHON-PROCESS] process start -',
                pythonProcess?.pid,
                ' : ',
                processList,
            );
        });

        pythonProcess.on('exit', exitCode => {
            console.log(
                `[PYTHON-PROCESS] Process, ${pythonProcess?.pid} ended with code (${exitCode})`,
            );
        });
    }
};

const destructProcess = () => {
    const list = processList.reverse();
    list.reverse().forEach(pid => exec(`taskkill /pid ${pid} /T /F`));
};

process.on('SIGINT', () => {
    console.log('[PYTHON-PROCESS] SIGINT');
    exitPythonProcess();
});

process.on('exit', async () => {
    console.log('[PYTHON-PROCESS] EXIT');
});

export default { createPythonProcess, destructProcess };
