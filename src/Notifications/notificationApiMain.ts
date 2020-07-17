import { BrowserWindow, ipcMain, ipcRenderer, remote } from "electron";
import { isDevelopement, mainWindow } from "../index";
declare const NOTIFICATION_WINDOW_WEBPACK_ENTRY: any;

export interface CustomNotification {
    title: string;
    body: string;
    customAction: customAction;

}

interface WindowNotification extends CustomNotification {
    notificationWindow: BrowserWindow;
}

interface NotificationStorage {
    [guid: string]: WindowNotification;
}

let notifications: NotificationStorage = {};

export interface customAction {
    type: customActionInputType;
    inputOptions: TextInputOptions | BooleanInputOptions | ChoiceInputOptions;
    requireInput?: boolean;
}

export interface TextInputOptions {
    placeholder: string;
    maxLength?: number;
    regex?: RegExp;
    validationErrorMessage?: string;
}

export interface BooleanInputOptions {
    trueLabel: string;
    falseLabel: string;
    displayType: BooleanDisplayType;
}

export enum BooleanDisplayType {
    Buttons, Toggle, DropDown
}

export interface ChoiceInputOptions {
    options: Array<{ key: string, text: string }>;
    submitButtonLabel: string;
}

export enum customActionInputType {
    text, boolean, choice
}

ipcMain.on('create-notification', (event: Electron.IpcMainEvent, guid: string, title: string, body: string, customAction: customAction) => {

    let notificationWindow = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            devTools: isDevelopement,
        },
        frame: false,
        acceptFirstMouse: true,
        show: true
    });
    notificationWindow.webContents.openDevTools();



    notifications[guid] = { title, body, customAction, notificationWindow };
    notificationWindow.loadURL(NOTIFICATION_WINDOW_WEBPACK_ENTRY).then(_ => {

        notificationWindow.webContents.send("recieve-props", guid);
    });


});

ipcMain.on('get-notification-properties', (event: Electron.IpcMainEvent, guid: string) => {
    if (notifications[guid]) {
        event.sender.send(guid, { body: notifications[guid].body, customAction: notifications[guid].customAction, title: notifications[guid].title } as CustomNotification);
    } else {
        event.sender.send(guid, null);
    }
});


ipcMain.on("close-notification", (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.close();
});
ipcMain.on("show-notification", (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.show();
});
ipcMain.on("hide-notification", (event: Electron.IpcMainEvent, guid: string) => {
    notifications[guid].notificationWindow.hide();
});


