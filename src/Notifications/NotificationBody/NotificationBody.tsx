import React from "react";
import { Text, Stack } from "@fluentui/react";
import { notificationsApiRenderer } from "../notificationApiRenderer";

export interface iNotificationBodyProps {
    guid: string;
 }
export interface iNotificationBodyState { }

export default class NotificationBody extends React.Component<iNotificationBodyProps, iNotificationBodyState> {


    public render() {
        return (
            <div>{this.props.guid}</div>
        );
    }


    public componentDidMount() {
        // notificationsApiRenderer.showNotification(this.props.guid);
    }

 }