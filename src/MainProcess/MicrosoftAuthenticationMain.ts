import { BrowserWindow, ipcMain, session } from "electron";
import { mainWindow } from "../index";

let accessToken: string = null;

/**
 * Gets the accesstoken
 *
 * @returns the accestokenb
 */
export const getAccessToken = () => {
    return accessToken;
}

/**
 *Sets the accesstoken
 *
 * @param {string} token the new accesstoken
 */
export const setAccessToken = (token: string) => {
    accessToken = token;
}

export interface UserAuthenticaton {
    accessToken: string;
    expirationTime: number;
}

export const authenticateUser: () => Promise<UserAuthenticaton> = () => {
    return new Promise<UserAuthenticaton>((resolve, reject) => {
        let authWindow = new BrowserWindow(
            {
                alwaysOnTop: true, // keeps this window on top of others
                modal: true,
                autoHideMenuBar: true,
                parent: mainWindow,
                frame: true,
                show: false,
                webPreferences: {
                    nodeIntegration: false, // No need to specify these if Electron v4+ but showing for demo
                    contextIsolation: true, // we can isolate this window
                    devTools: false
                },

            }
        );

        authWindow.on('closed', () => {
            authWindow = null;
        });

        authWindow.setMenu(null);

        let filter = { urls: [process.env.REDIRECT_URL] };

        authWindow.webContents.on('did-finish-load', () => {
            authWindow.show();
        });

        authWindow.loadURL(`https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/authorize?client_id=${process.env.CLIENT_ID}&response_type=token&scope=openid&redirect_uri=${process.env.REDIRECT_URL}&response_mode=fragment&nonce=&state=45&resource=${encodeURIComponent(process.env.RESOURCE)}`)
        session.defaultSession.webRequest.onCompleted(filter, (details: Electron.OnCompletedListenerDetails) => {
            var url = details.url;
            let accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
            let expirationTime = Number(url.match(/expires_in=\d*&/)[0].replace(/expires_in=/, "").replace(/&/, ""));
            authWindow.close();
            resolve({ accessToken, expirationTime });
        });
    });
}

ipcMain.on("get-access-token", (event: Electron.IpcMainEvent, guid: string) => {
    if (getAccessToken() != null) {
        event.sender.send(guid, getAccessToken());
    } else {
        authenticateUser().then(UserAuthentication => {
            setAccessToken(UserAuthentication.accessToken);
            setTimeout(() => { setAccessToken(null) }, (UserAuthentication.expirationTime - 1) * 1000)
            event.sender.send(guid, UserAuthentication.accessToken);
        });
    }
});