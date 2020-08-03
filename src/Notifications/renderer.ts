import { initializeIcons } from "@fluentui/react";
import { ipcRenderer } from "electron";
import React from 'react';
import ReactDOM from 'react-dom';
import { NotificationChannelNames } from "./EventConstants";
import Footer, { FooterProps } from "./Footer/Footer";
import { iCustomNotification } from "./interfaces";
import NotificationBody, { iNotificationBodyProps } from "./NotificationBody/NotificationBody";
import NotificationTitleBar, { iNotificationTitleBarProps } from "./TitleBar/NotificationTitleBar";
import "./index.css";

initializeIcons();

// Recieves the properties from the main process
ipcRenderer.once(NotificationChannelNames.recieveProps, (event: Electron.IpcRendererEvent, guid: string, notification: iCustomNotification) => {
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

        // Renders the title-bar
        ReactDOM.render(React.createElement(NotificationTitleBar, { guid, title: notification.title, inputRequired } as iNotificationTitleBarProps), document.querySelector("#TitleBar"));
        // Renders the notification-body
        ReactDOM.render(React.createElement(NotificationBody, { guid, notification } as iNotificationBodyProps), document.querySelector("#Main"));
        // Renders the notifiaction-footer
        ReactDOM.render(React.createElement(Footer, { text: "Created by Timo Woityschyn" } as FooterProps), document.querySelector("#Footer"));
    }
});