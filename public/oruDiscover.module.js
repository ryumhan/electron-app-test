"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var dgram = require("dgram");
var electron_1 = require("electron");
var pythonProcess;
var server;
var PORT = 64001; // Change to your desired port number
var createPythonProcess = function () {
    if (pythonProcess)
        pythonProcess.kill();
    pythonProcess = (0, child_process_1.spawn)('python', ['./public/oru_ip_find.py']);
    pythonProcess.on('spawn', function () {
        return console.log('[PYTHON-PROCESS] process start');
    });
    pythonProcess.on('exit', function (exitCode) {
        console.log("[PYTHON-PROCESS] Process ended with code (".concat(exitCode, ")"));
    });
};
var createUdpServer = function (mainWindow) {
    var gotAck = false;
    var recentIp = '';
    if (server)
        server.close();
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
exports["default"] = { createUdpServer: createUdpServer, createPythonProcess: createPythonProcess };
