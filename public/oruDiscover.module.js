"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var dgram = require("dgram");
var electron_1 = require("electron");
var pythonProcess = (0, child_process_1.spawn)('python', ['./public/oru_ip_find.py']);
var server;
var PORT = 64001; // Change to your desired port number
var createUdpServer = function (mainWindow) {
    var gotAck = false;
    var recentIp = '';
    server = dgram.createSocket('udp4');
    server.on('error', function (err) {
        server.close();
        console.error("[UDP-MODULE] Server error:\n".concat(err.stack));
    });
    server.on('message', function (msg) {
        var got = JSON.parse(msg.toString());
        recentIp = got.oru_ip;
        if (got.new_oru === 1 && !gotAck) {
            mainWindow.webContents.send('oruDiscover-module', {
                type: 'data',
                data: got.oru_ip
            });
        }
    });
    server.on('listening', function () {
        var address = server.address();
        gotAck = false;
        console.log("[UDP-MODULE] Server is listening on ".concat(address.address, ":").concat(address.port));
    });
    electron_1.ipcMain.on('oruDiscover-module', function (_, _a) {
        var data = _a.data;
        if (data === recentIp)
            gotAck = true;
    });
    server.bind(PORT);
};
var createPythonProcess = function () {
    pythonProcess.stdout.on('data', function (data) {
        console.log('[PYTHON-PROCESS] data got from python', data);
    });
    pythonProcess.stderr.on('data', function (stacktrace) {
        console.error('[PYTHON-PROCESS] data', stacktrace.toString('utf8'));
    });
    pythonProcess.on('exit', function (exitCode) {
        console.log("[PYTHON-PROCESS] Process ended with code (".concat(exitCode, ")"));
    });
};
exports["default"] = { createUdpServer: createUdpServer, createPythonProcess: createPythonProcess };
