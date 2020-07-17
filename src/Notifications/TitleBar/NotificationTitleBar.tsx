import React from "react";
import { Stack, StackItem, Text, divProperties } from "@fluentui/react";
import { CustomError } from "../../helper/CustomError";
import NotificationTitleBarButton, { NotificationTitleBarButtonType } from "./NotificationTitleBarButton";


export interface iNotificationTitleBarProps {
    title: string;
    guid: string;
}

interface iNotificationTitleBarState {
    err: CustomError;
}

export default class NotificationTitleBar extends React.Component<iNotificationTitleBarProps, iNotificationTitleBarState> {

    constructor(props: iNotificationTitleBarProps) {
        super(props);
        this.state = {
            err: null,
        };

    }

    public render(): JSX.Element {
        return (
            <div className={"titleBarContainer"}>
                <Stack className={"titleBar"} horizontal horizontalAlign={"center"}>
                    <StackItem align={"center"} ><Text variant={"medium"}>{this.props.title}</Text></StackItem>
                    <StackItem><NotificationTitleBarButton guid={this.props.guid} type={NotificationTitleBarButtonType.Close} /></StackItem>
                    <StackItem><NotificationTitleBarButton guid={this.props.guid} type={NotificationTitleBarButtonType.Hide} /></StackItem>
                </Stack>
            </div>
        );
    }
}