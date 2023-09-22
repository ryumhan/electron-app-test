import * as util from 'util';
import { BrowserWindow } from 'electron';

const createCookie = (mainWindow: BrowserWindow) => {
    const { cookies } = mainWindow.webContents.session;

    cookies.on('changed', (event, cookie, cause, removed) => {
        console.log('changed', cookie);
        if (cookie.session && !removed) {
            const url = util.format(
                '%s://%s%s',
                !cookie.httpOnly && cookie.secure ? 'https' : 'http',
                cookie.domain,
                cookie.path,
            );

            cookies.set({
                url,
                name: cookie.name,
                value: cookie.value,
                domain: cookie.domain,
                path: cookie.path,
                secure: cookie.secure,
                httpOnly: cookie.httpOnly,
                expirationDate: new Date().setDate(new Date().getDate() + 14),
            });
        }
    });
};

const setCookie = async () => {
    const ses = mainWindow.webContents.session;
    const cookie = {
        url: 'http://localhost:3000',
        name: 'dummy_name',
        value: 'dummy',
    };

    await ses.cookies.set(cookie);
};

export default { createCookie };
