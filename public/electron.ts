import * as path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';
import ipcModule from './ipc.module';
import childProcessModule from './childProcess.module';
import udpServerModule from './udpServer.module';

let mainWindow: BrowserWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 880,
        height: 900,
        center: true,
        kiosk: !isDev,
        resizable: true,
        fullscreen: false,
        autoHideMenuBar: !isDev,
        webPreferences: {
            // node환경처럼 사용하기
            nodeIntegration: true,
            contextIsolation: false,
            // webview 사용
            webviewTag: true,
            // 개발자도구
            devTools: isDev,
            webSecurity: false,
        },
    });

    // production에서는 패키지 내부 리소스에 접근.
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드.
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : 'file://'.concat(path.join(__dirname, '../build/index.html')),
    );
    // `file://${__dirname}/build/index.html`
    // "file://".concat(path.join(__dirname, '../build/index.html')));
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    mainWindow.setResizable(true);

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = undefined!;
    });

    mainWindow.focus();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    createWindow();
    // create Ipc Module
    ipcMain.on('create-module', () => {
        childProcessModule.createPythonProcess();
        udpServerModule.createUdpServer(mainWindow);
        ipcModule.createWebsocket(mainWindow);
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        childProcessModule.destructPython();

        app.removeAllListeners();
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
