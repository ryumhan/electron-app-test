"use strict";
exports.__esModule = true;
var util = require("util");
var createCookie = function (mainWindow) {
    var cookies = mainWindow.webContents.session.cookies;
    cookies.on('changed', function (event, cookie, cause, removed) {
        console.log('changed', cookie);
        if (cookie.session && !removed) {
            var url = util.format('%s://%s%s', !cookie.httpOnly && cookie.secure ? 'https' : 'http', cookie.domain, cookie.path);
            cookies.set({
                url: url,
                name: cookie.name,
                value: cookie.value,
                domain: cookie.domain,
                path: cookie.path,
                secure: cookie.secure,
                httpOnly: cookie.httpOnly,
                expirationDate: new Date().setDate(new Date().getDate() + 14)
            });
        }
    });
};
exports["default"] = { createCookie: createCookie };
