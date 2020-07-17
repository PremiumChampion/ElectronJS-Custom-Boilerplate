import "./index.css";
import "./titlebar.css"
import "./main.css"
import "./footer";
import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@fluentui/react";
import Footer from "./Footer/Footer";
import NotificationTitleBar, { iNotificationTitleBarProps } from "./TitleBar/NotificationTitleBar";
import NotificationBody, { iNotificationBodyProps } from "./NotificationBody/NotificationBody";
import { notificationsApiRenderer } from "./notificationApiRenderer";
import { CustomNotification } from "./notificationApiMain";
import { CustomError } from "../helper/CustomError";
import { ipcMain, ipcRenderer } from "electron";

initializeIcons();

ipcRenderer.once("recieve-props", (event: Electron.IpcRendererEvent, guid: string) => {
    debugger;
    notificationsApiRenderer.getContents(guid)
        .then((notification: CustomNotification) => {
            console.log("sent")
            if (notification) {
                ReactDOM.render(React.createElement(NotificationTitleBar, { guid: guid, title: notification.title } as iNotificationTitleBarProps), document.querySelector("#TitleBar"));
                ReactDOM.render(React.createElement(NotificationBody, { guid: guid } as iNotificationBodyProps), document.querySelector("#Main"));
                ReactDOM.render(React.createElement(Footer), document.querySelector("#Footer"));
                notificationsApiRenderer.showNotification(guid);
            }
        }).catch((err: CustomError) => {
            alert(err.getErrorMessage() + err.getCallerFunction());
        });
});