import React from "react";
import { Text, DefaultButton } from "@fluentui/react";
import { NotificationsRenderer } from "../../NotificationsRenderer";
import { CustomError } from "../../../helper/CustomError";
import { ipcRenderer } from "electron";
import { Guid } from "guid-typescript";
import { notificationsApiRenderer } from "../../../Notifications/notificationApiRenderer";

export interface MainProps {

}

interface MainState {
    err: CustomError;
}


export default class Main extends React.Component<MainProps, MainState> {

    public render(): JSX.Element {
        return (
            <div className="main">
                <Text variant={"mega"}>Main Content</Text>
                <DefaultButton onClick={this.sendNotification.bind(this)}>Test</DefaultButton>
            </div>
        );
    }


    public componentDidMount() {
        
    }
    private sendNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();

        console.log(guid);
        // guid: string, title: string, body: string, customAction: customAction
        ipcRenderer.send('create-notification', guid, "Title", "Body", null);
        // NotificationsRenderer.getUserInputFromNotification("Title", "Body")
        //     .then(val => {
        //         debugger;
        //     })
        //     .catch((err: CustomError) => {
        //         debugger;
        //     })
        // notificationsApiRenderer.
    }
}