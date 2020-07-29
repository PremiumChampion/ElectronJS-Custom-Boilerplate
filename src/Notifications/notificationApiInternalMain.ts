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
    originalEvent: Electron.IpcMainEvent;
    /**
     * the current in dex of the notification
     *
     * @type {number}
     * @memberof WindowNotification
     */
    notificationIndex: number;
}

/**
 *describes the notification storage
 *
 * @interface NotificationStorage
 */
interface NotificationStorage {
    [guid: string]: WindowNotification;
}

// all notifications displayed
let notifications: NotificationStorage = {};

// the current notification count
let currentNotificationCount: number = 0;

// the height of the custom notification
const NotificationHeight: number = 150;

// the width of the custom Notification
const NotificationWidth: number = 400;

// the height of the taskbar
const TaskBarHeight: number = 200;

// Create a Notification
ipcMain.on(NotificationChannelNames.createNotification, (event: Electron.IpcMainEvent, guid: string, notification: iCustomNotification) => {

    let monitorSize = screen.getPrimaryDisplay().size;

    let notificationWindow = new BrowserWindow({
        x: monitorSize.width - (NotificationWidth + 10),
        y: monitorSize.height - TaskBarHeight - (currentNotificationCount * (NotificationHeight + 10)),

        width: NotificationWidth,
        height: NotificationHeight,

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
        // transparent: true
    });


    notifications[guid] = { ...notification, notificationWindow, originalEvent: event, notificationIndex: currentNotificationCount };

    currentNotificationCount++;

    notificationWindow.loadURL(NOTIFICATION_WINDOW_WEBPACK_ENTRY).then(_ => {
        notificationWindow.webContents.send(NotificationChannelNames.recieveProps, guid, notification);
    });

    if (isDevelopement && false) {
        notificationWindow.webContents.openDevTools();
    }

});

// Close a Notification
ipcMain.on(NotificationChannelNames.closeNotification, (event: Electron.IpcMainEvent, guid: string) => {

    currentNotificationCount--;
    updateNotificationPositions(guid);

    notifications[guid].notificationWindow.close();
    notifications[guid] = undefined;

});

// Show a notification
ipcMain.on(NotificationChannelNames.showNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.show();
});

// Hide a notification
ipcMain.on(NotificationChannelNames.hideNotification, (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.hide();
});

// Resolve userinput from a notification
ipcMain.on(NotificationChannelNames.resolveInput, (event: Electron.IpcMainEvent, guid: string, result: boolean | string | { key: string; text: string; }) => {
    notifications[guid].originalEvent.sender.send(guid, result);

    currentNotificationCount--;
    updateNotificationPositions(guid);

    notifications[guid].notificationWindow.hide();
});


/**
 * Updates all notification items on the window when one is hidden or closed
 *
 * @param {string} guid the guid of the notification by which the action was invoked
 */
const updateNotificationPositions: (guid: string) => void = (guid: string) => {
    Object.keys(notifications)
        .forEach((key: string) => {
            if (notifications[key]) {
                let bounds = notifications[guid].notificationWindow.getBounds();
                let monitorSize = screen.getPrimaryDisplay().size;

                if (notifications[key].notificationIndex > notifications[guid].notificationIndex) {
                    notifications[key].notificationIndex--;
                    notifications[key].notificationWindow.setPosition(
                        bounds.x,
                        monitorSize.height - TaskBarHeight - (notifications[key].notificationIndex * (NotificationHeight + 10)),
                        true
                    );
                }
            }
        });
}

