import React from "react";
import { Stack, StackItem, Text } from "@fluentui/react";
import { CustomError } from "../../helper/CustomError";
import NotificationTitleBarButton, { NotificationTitleBarButtonType } from "./NotificationTitleBarButton";
import "./titlebar.css"

/**
 * Defines the title bar of the notificaation
 *
 * @export
 * @interface iNotificationTitleBarProps
 */
export interface iNotificationTitleBarProps {
    /**
     * the title of the notification
     *
     * @type {string}
     * @memberof iNotificationTitleBarProps
     */
    title: string;
    /**
     * the guid of the notification
     *
     * @type {string}
     * @memberof iNotificationTitleBarProps
     */
    guid: string;
    /**
     * defines if the guid can be closed by the user
     *
     * @type {boolean}
     * @memberof iNotificationTitleBarProps
     */
    inputRequired: boolean;
}

/**
 * The state of the notificationTitle bar
 *
 * @interface iNotificationTitleBarState
 */
interface iNotificationTitleBarState { }

/**
 * the notification title bar component
 *
 * @export
 * @class NotificationTitleBar
 * @extends {React.Component<iNotificationTitleBarProps, iNotificationTitleBarState>}
 */
export default class NotificationTitleBar extends React.Component<iNotificationTitleBarProps, iNotificationTitleBarState> {

    constructor(props: iNotificationTitleBarProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className={"titleBarContainer"}>
                <Stack className={"titleBar"} horizontal horizontalAlign={"center"}>
                    <StackItem align={"center"} ><Text nowrap variant={"medium"}>{this.props.title}</Text></StackItem>
                    {!this.props.inputRequired &&
                        <StackItem><NotificationTitleBarButton guid={this.props.guid} type={NotificationTitleBarButtonType.Close} /></StackItem>
                    }
                    {/* <StackItem><NotificationTitleBarButton guid={this.props.guid} type={NotificationTitleBarButtonType.Hide} /></StackItem> */}
                </Stack>
            </div>
        );
    }
}