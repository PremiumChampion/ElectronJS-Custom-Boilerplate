import * as env from "dotenv";
import { app, BrowserWindow } from 'electron';
import "./MainProcess/devApiMain";
import "./MainProcess/MicrosoftAuthenticationMain";
import "./MainProcess/windowApiMain";
import "./Notifications/notificationApiInternalMain";

env.config();

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}


export const isDevelopement: boolean = true;
export let mainWindow: BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: isDevelopement,
    },
    // transparent: true,
    frame: false,
    acceptFirstMouse: true,
    show: false
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    app.quit();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.setAppUserModelId(process.execPath)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  
  createWindow();
  // authenticateUser().then((accessToken) => {
  //   setAccessToken(accessToken);
  // });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
