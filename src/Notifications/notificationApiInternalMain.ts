import { BrowserWindow, ipcMain, screen } from "electron";
import { isDevelopement, mainWindow } from "../index";
import { iCustomNotification } from "./interfaces";
import { NotificationEventNames } from "./EventConstants";
declare const NOTIFICATION_WINDOW_WEBPACK_ENTRY: any;


interface WindowNotification extends iCustomNotification {
    notificationWindow: BrowserWindow;
    originalEvent: Electron.IpcMainEvent
}

interface NotificationStorage {
    [guid: string]: WindowNotification;
}

let notifications: NotificationStorage = {};

ipcMain.on(NotificationEventNames.createNotification, (event: Electron.IpcMainEvent, guid: string, notification: iCustomNotification) => {

    let monitorSize = screen.getPrimaryDisplay().size;

    let notificationWindow = new BrowserWindow({
        x: monitorSize.width - 410,
        y: monitorSize.height - 200,
        width: 400,
        height: 150,

        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            devTools: isDevelopement,
        },

        frame: false,
        acceptFirstMouse: true,
        show: false,
        resizable: false,
        skipTaskbar: true
    });

    notifications[guid] = { ...notification, notificationWindow, originalEvent: event };

    notificationWindow.loadURL(NOTIFICATION_WINDOW_WEBPACK_ENTRY).then(_ => {
        notificationWindow.webContents.send(NotificationEventNames.recieveProps, guid, notification);
    });
});

ipcMain.on(NotificationEventNames.closeNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.close();
    notifications[guid] = undefined;
});
ipcMain.on(NotificationEventNames.showNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.show();
});
ipcMain.on(NotificationEventNames.hideNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.hide();
});

ipcMain.on(NotificationEventNames.resolveInput,(event: Electron.IpcMainEvent, guid: string, result: boolean | string | { key: string; text: string; }) => {
    console.log(result)
    notifications[guid].originalEvent.sender.send(guid, result);
    notifications[guid].notificationWindow.hide();
});
