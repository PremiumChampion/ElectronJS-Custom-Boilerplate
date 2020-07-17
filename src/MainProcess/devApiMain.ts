import { ipcMain } from "electron";
import { mainWindow, isDevelopement } from "../index";

ipcMain.on('toggle-dev-tools', (event: Electron.IpcMainEvent) => {
    if (isDevelopement) {
        mainWindow.webContents.toggleDevTools();
    }
});

ipcMain.on('is-developement', (event: Electron.IpcMainEvent, guid: string) => {
    event.sender.send(guid, isDevelopement);
});
