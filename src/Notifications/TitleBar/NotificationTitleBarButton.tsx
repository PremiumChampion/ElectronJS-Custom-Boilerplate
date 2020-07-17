import React from "react";
import { Stack, StackItem, IconButton, IconFontSizes } from "@fluentui/react";
import { notificationsApiRenderer } from "../notificationApiRenderer";

export enum NotificationTitleBarButtonType {
    Close, Hide
}

export interface iNotificationTitleBarButtonProps {
    type: NotificationTitleBarButtonType;
    guid: string;
}

interface iNotificationTitleBarButtonState { }

export default class NotificationTitleBarButton extends React.Component<iNotificationTitleBarButtonProps, iNotificationTitleBarButtonState> {

    constructor(props: iNotificationTitleBarButtonProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <>
                {this.props.type == NotificationTitleBarButtonType.Close &&
                    <IconButton iconProps={{ iconName: "ChromeClose", style: { fontSize: "10px" } }} title={"Fenster schließen"} onClick={notificationsApiRenderer.closeNotification.bind(undefined, this.props.guid)} />
                }
                {this.props.type == NotificationTitleBarButtonType.Hide &&
                    <IconButton iconProps={{ iconName: "ChromeMinimize", style: { fontSize: "10px" } }} title={"Fenster minimieren"} onClick={notificationsApiRenderer.hideNotification.bind(undefined, this.props.guid)} />
                }
            </>
        );
    }
}