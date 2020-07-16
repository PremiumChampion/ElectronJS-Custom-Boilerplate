import React from "react";
import { Text, DefaultButton } from "@fluentui/react";
import { NotificationsRenderer } from "../../NotificationsRenderer";
import { CustomError } from "./../../../helper/CustomError";

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

    private sendNotification() {
        NotificationsRenderer.getUserInputFromNotification("Title", "Body")
            .then(val => {
                debugger;
            })
            .catch((err: CustomError) => {
                debugger;
            })
    }
}