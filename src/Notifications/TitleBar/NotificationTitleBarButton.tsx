import React from "react";
import { Stack, StackItem, IconButton, IconFontSizes } from "@fluentui/react";
import { notificationsApiInternalRender } from "../notificationApiInternalRenderer";

/**
 * The Title Bar Button Types
 *
 * @export
 * @enum {number}
 */
export enum NotificationTitleBarButtonType {
    /**
     * Close Button
     */
    Close,
    /**
     * Hide Button
     */
    Hide
}

/**
 * The properties of the Notification Title Bar Button
 *
 * @export
 * @interface iNotificationTitleBarButtonProps
 */
export interface iNotificationTitleBarButtonProps {
    /**
     * The type of button
     *
     * @type {NotificationTitleBarButtonType}
     * @memberof iNotificationTitleBarButtonProps
     */
    type: NotificationTitleBarButtonType;
    /**
     * the guid of the notification
     *
     * @type {string}
     * @memberof iNotificationTitleBarButtonProps
     */
    guid: string;
}

/**
 * the state of the notificationtitlebarbutton
 *
 * @interface iNotificationTitleBarButtonState
 */
interface iNotificationTitleBarButtonState { }

/**
 *The React component of a NotificationTitleBar Button
 *
 * @export
 * @class NotificationTitleBarButton
 * @extends {React.Component<iNotificationTitleBarButtonProps, iNotificationTitleBarButtonState>}
 */
export default class NotificationTitleBarButton extends React.Component<iNotificationTitleBarButtonProps, iNotificationTitleBarButtonState> {

    constructor(props: iNotificationTitleBarButtonProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <>
                {this.props.type == NotificationTitleBarButtonType.Close &&
                    <IconButton className="closeButton" iconProps={{ iconName: "ChromeClose", style: { fontSize: "10px" } }} title={"Fenster schließen"} onClick={notificationsApiInternalRender.closeNotification.bind(undefined, this.props.guid)} />
                }
                {this.props.type == NotificationTitleBarButtonType.Hide &&
                    <IconButton iconProps={{ iconName: "ChromeMinimize", style: { fontSize: "10px" } }} title={"Fenster minimieren"} onClick={notificationsApiInternalRender.hideNotification.bind(undefined, this.props.guid)} />
                }
            </>
        );
    }
}