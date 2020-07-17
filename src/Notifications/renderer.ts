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
import { notificationsApiInternalRender } from "./notificationApiInternalRenderer";
import { CustomError } from "../helper/CustomError";
import { ipcRenderer } from "electron";
import { iCustomNotification } from "./interfaces";
import { NotificationEventNames } from "./EventConstants";

initializeIcons();

ipcRenderer.once(NotificationEventNames.recieveProps, (event: Electron.IpcRendererEvent, guid: string, notification: iCustomNotification) => {
    if (notification && guid) {

        let inputRequired: boolean;

        if (notification.customAction) {
            if (notification.customAction.requireInput != null && notification.customAction.requireInput != undefined) {
                inputRequired = notification.customAction.requireInput;
            } else {
                inputRequired = false;
            }
        } else {
            inputRequired = false;
        }

        ReactDOM.render(React.createElement(NotificationTitleBar, { guid, title: notification.title, inputRequired } as iNotificationTitleBarProps), document.querySelector("#TitleBar"));
        ReactDOM.render(React.createElement(NotificationBody, { guid, notification } as iNotificationBodyProps), document.querySelector("#Main"));
        ReactDOM.render(React.createElement(Footer), document.querySelector("#Footer"));
    }
});