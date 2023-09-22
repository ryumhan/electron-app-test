"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var ws_1 = require("ws");
var ws;
var createWebsocket = function (mainWindow) {
    var connect = function (data) {
        try {
            var target = "ws://".concat(data, ":8000/neuboatdock ");
            ws = new ws_1.WebSocket(target);
        }
        catch (error) {
            console.error('[IPC-MODULE] WebSocket is Connection Error', error);
        }
    };
    var bindMessageCallback = function () {
        ws.onmessage = function (event) {
            // Handle the incoming message here
            var message = event.data;
            mainWindow.webContents.send('websocket-module', {
                type: 'data',
                data: message
            });
        };
        ws.onclose = function (event) {
            console.log('[IPC-MODULE] WebSocket is Closed', event);
        };
        ws.onerror = function (event) {
            console.log('[IPC-MODULE] WebSocket got error', event);
        };
    };
    electron_1.ipcMain.on('websocket-module', function (ev, _a) {
        var type = _a.type, data = _a.data;
        if (type === 'close' && ws.readyState === ws.OPEN) {
            ws === null || ws === void 0 ? void 0 : ws.close();
        }
        else if (type === 'create') {
            connect(data);
            bindMessageCallback();
        }
    });
};
exports["default"] = { createWebsocket: createWebsocket };
