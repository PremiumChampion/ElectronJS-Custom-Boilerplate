import { BrowserWindow, ipcMain, session } from "electron";
import { mainWindow, isDevelopement } from "../index";
import { GraphSettings } from "./settings";

ipcMain.on('loginPrompt', (event, args) => {
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
                contextIsolation: true // we can isolate this window
            }
        }
    );

    authWindow.on('closed', () => {
        authWindow = null;
    });

    authWindow.setMenu(null);

    let filter = { urls: [GraphSettings.redirectURL] };

    authWindow.webContents.on('did-finish-load', () => {
        authWindow.show();
    });

    authWindow.loadURL(`https://login.microsoftonline.com/` + GraphSettings.tenantID + `/oauth2/authorize?
        client_id=`+ GraphSettings.ClientID + `
        &response_type=token
        &scope=openid
        &redirect_uri=`+ GraphSettings.redirectURL + `
        &response_mode=fragment
        &nonce=
        &state=45
        &resource=`+ encodeURIComponent(GraphSettings.resource));

        session.defaultSession.webRequest.onCompleted(filter, (details: Electron.OnCompletedListenerDetails) => {
        var url = details.url;
        let accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        event.returnValue = accessToken;
        authWindow.close();
    });
});