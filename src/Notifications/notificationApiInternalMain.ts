import { BrowserWindow, ipcMain, screen } from "electron";
import { isDevelopement, mainWindow } from "../index";
import { iCustomNotification } from "./interfaces";
import { NotificationChannelNames } from "./EventConstants";
declare const NOTIFICATION_WINDOW_WEBPACK_ENTRY: any;


/**
 * describes a extended Window notification
 *
 * @interface WindowNotification
 * @extends {iCustomNotification}
 */
interface WindowNotification extends iCustomNotification {
    /**
     * the oroginal Browser window
     *
     * @type {BrowserWindow}
     * @memberof WindowNotification
     */
    notificationWindow: BrowserWindow;

    /**
     * the original event of the creation process
     *
     * @type {Electron.IpcMainEvent}
     * @memberof WindowNotification
     */
    originalEvent: Electron.IpcMainEvent
}

/**
 *describes the notification storage
 *
 * @interface NotificationStorage
 */
interface NotificationStorage {
    [guid: string]: WindowNotification;
}

let notifications: NotificationStorage = {};

ipcMain.on(NotificationChannelNames.createNotification, (event: Electron.IpcMainEvent, guid: string, notification: iCustomNotification) => {

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

        show: false,
        
        acceptFirstMouse: true,
        resizable: isDevelopement,
        skipTaskbar: true,
        alwaysOnTop: true,
        frame: false,

        title: notification.title,
    });


    notifications[guid] = { ...notification, notificationWindow, originalEvent: event };

    notificationWindow.loadURL(NOTIFICATION_WINDOW_WEBPACK_ENTRY).then(_ => {
        notificationWindow.webContents.send(NotificationChannelNames.recieveProps, guid, notification);
    });

    if(isDevelopement && false){
        notificationWindow.webContents.openDevTools();
    }

});

ipcMain.on(NotificationChannelNames.closeNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.close();
    notifications[guid] = undefined;
});

ipcMain.on(NotificationChannelNames.showNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.show();
});

ipcMain.on(NotificationChannelNames.hideNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.hide();
});

ipcMain.on(NotificationChannelNames.resolveInput,(event: Electron.IpcMainEvent, guid: string, result: boolean | string | { key: string; text: string; }) => {
    notifications[guid].originalEvent.sender.send(guid, result);
    notifications[guid].notificationWindow.hide();
});
