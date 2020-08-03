import { BrowserWindow, ipcMain, session } from "electron";
import { mainWindow } from "../index";
import { CustomError } from "./../helper/CustomError";

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

/**
 * The necesarry user authenication information
 *
 * @export
 * @interface UserAuthenticaton
 */
export interface UserAuthenticaton {
    /**
     * The accesstoken of the user
     *
     * @type {string}
     * @memberof UserAuthenticaton
     */
    accessToken: string;
    /**
     * The exporation time of the accesstoken (in seconds)
     *
     * @type {number}
     * @memberof UserAuthenticaton
     */
    expirationTime: number;
}

/**
* A function to authenticate the current user
*
* @returns {UserAuthenticaton} A Promise containing the user Authentication or a Custom Error.
*/
export const authenticateUser: () => Promise<UserAuthenticaton> = () => {
    return new Promise<UserAuthenticaton>((resolve, reject) => {

        let authenticated: boolean = false;

        let authWindow = new BrowserWindow(
            {
                alwaysOnTop: true,
                modal: true,
                autoHideMenuBar: true,
                parent: mainWindow,
                frame: true,
                show: false,
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                    devTools: false
                }
            }
        );

        authWindow.on('closed', () => {
            if (!authenticated) {
                reject(new CustomError("Authentication aborted by the user", "export const authenticateUser: () => Promise<UserAuthenticaton>", new Error("Authentication aborted by the user")));
            }
            authWindow = null;
        });

        authWindow.setMenu(null);

        let filter = { urls: [process.env.REDIRECT_URL] };

        authWindow.webContents.on('did-finish-load', () => {
            authWindow.show();
        });
        if (process.env.TENANT_ID && process.env.CLIENT_ID && process.env.RESOURCE && process.env.REDIRECT_URL) {
            authWindow.loadURL(`https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/authorize?client_id=${process.env.CLIENT_ID}&response_type=token&scope=openid&redirect_uri=${process.env.REDIRECT_URL}&response_mode=fragment&nonce=&state=45&resource=${encodeURIComponent(process.env.RESOURCE)}`)
        } else {
            reject(new CustomError("One or more enviroment variables are undefined. Please adjust production or developement eviroment and try running microsoft authentication again", "export const authenticateUser: () => Promise<UserAuthenticaton>", new Error("Enviroment variables are undefined")));
        }

        session.defaultSession.webRequest.onCompleted(filter, (details: Electron.OnCompletedListenerDetails) => {
            var url = details.url;
            let accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
            let expirationTime = Number(url.match(/expires_in=\d*&/)[0].replace(/expires_in=/, "").replace(/&/, ""));
            authenticated = true;
            authWindow.close();
            resolve({ accessToken, expirationTime });
        });
    });
}

ipcMain.on("get-access-token", (event: Electron.IpcMainEvent, guid: string) => {
    if (getAccessToken() != null) {
        event.sender.send(guid, getAccessToken());
    } else {
        authenticateUser()
            .then(UserAuthentication => {
                setAccessToken(UserAuthentication.accessToken);
                setTimeout(() => { setAccessToken(null) }, (UserAuthentication.expirationTime - 1) * 1000)
                event.sender.send(guid, UserAuthentication.accessToken);
            }).catch((err) => {
                event.sender.send(guid, err);
            });
    }
});

/**
 * Logs the user off
 *  
 * @returns a Promise which gets resolve when the user logoff was successfull and rejected if the action was not successfull
 */
export const logoutUser: () => Promise<null> = () => {
    return new Promise<null>((resolve, reject) => {
        let logoutWindow = new BrowserWindow(
            {
                alwaysOnTop: true, // keeps this window on top of others
                modal: true,
                autoHideMenuBar: true,
                parent: mainWindow,
                frame: true,
                show: false,
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                    devTools: false
                },

            }
        );

        logoutWindow.on('closed', () => {
            logoutWindow = null;
        });

        logoutWindow.setMenu(null);

        let filter = { urls: [process.env.REDIRECT_URL] };

        logoutWindow.webContents.on('did-finish-load', () => {
            // logoutWindow.show();
        });
        if (process.env.CLIENT_ID && process.env.REDIRECT_URL) {
            logoutWindow.loadURL(`https://login.microsoftonline.com/common/oauth2/logout?client_id=${process.env.CLIENT_ID}&response_mode=form_post&post_logout_redirect_uri=${process.env.REDIRECT_URL}`)
        } else {
            reject(new CustomError("One or more enviroment variables are undefined. Please adjust production or developement eviroment and try running microsoft logout again", "export const logoutUser: () => Promise<null>", new Error("Enviroment variables are undefined")));
        }

        session.defaultSession.webRequest.onCompleted(filter, (details: Electron.OnCompletedListenerDetails) => {
            logoutWindow.close();
            resolve(null);
        });
    });
}


ipcMain.on("logout", (event: Electron.IpcMainEvent, guid: string) => {
    setAccessToken(null);
    logoutUser()
        .then((_) => { event.sender.send(guid, null) })
        .catch(err => { event.sender.send(guid, err) });
});


