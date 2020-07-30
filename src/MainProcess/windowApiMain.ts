import { ipcMain } from "electron";
import { mainWindow } from "../index";


ipcMain.on('close-window', (event: Electron.IpcMainEvent, force: boolean) => {

    if (force) {
        mainWindow.destroy();
    } else {
        mainWindow.close();
    }
});

ipcMain.on('minimize-window', (event: Electron.IpcMainEvent) => {
    mainWindow.unmaximize();
});

ipcMain.on('maximise-window', (event: Electron.IpcMainEvent) => {
    mainWindow.maximize();
});

ipcMain.on('hide-window', (event: Electron.IpcMainEvent) => {
    mainWindow.minimize();
});

ipcMain.on('show-window', (event: Electron.IpcMainEvent) => {
    mainWindow.show();
});

ipcMain.on("get-window-size", (event: Electron.IpcMainEvent, guid: string) => {
    event.sender.send(guid, mainWindow.isMaximized());
});
