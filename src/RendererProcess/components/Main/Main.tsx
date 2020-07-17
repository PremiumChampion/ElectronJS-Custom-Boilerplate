import React from "react";
import { Text, DefaultButton } from "@fluentui/react";
import { NotificationsRenderer } from "../../NotificationsRenderer";
import { CustomError } from "../../../helper/CustomError";
import { ipcRenderer } from "electron";
import { Guid } from "guid-typescript";
import { iCustomAction, iTextInputOptions, iBooleanInputOptions, iChoiceInputOptions } from "./../../../Notifications/interfaces";
import { BooleanDisplayType } from "./../../../Notifications/enums";

export interface MainProps {

}

interface MainState {
    err: CustomError;
}


export default class Main extends React.Component<MainProps, MainState> {

    public render(): JSX.Element {
        return (
            <div className="main">
                <DefaultButton onClick={this.sendInformationNotification.bind(this)}>Create Information Notification</DefaultButton>
                <DefaultButton onClick={this.sendTextNotification.bind(this)}>GetTextInput</DefaultButton>
                <DefaultButton onClick={this.sendBooleanNotification.bind(this)}>GetBooleanInput</DefaultButton>
                <DefaultButton onClick={this.sendChoiceNotification.bind(this)}>GetChoiceInput</DefaultButton>
            </div>
        );
    }


    public componentDidMount() {

    }
    private sendInformationNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        NotificationsRenderer.createInformationNotification(guid, "Example Title", "This is my message");
    }

    private sendTextNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        NotificationsRenderer.getTextInputFromNotification(guid, "Example Title", "This is my message",
            {
                inputOptions: {
                    placeholder: "Bitte gebe einen Text ein",
                    maxLength: 22,
                    regex: /abc/gm,
                    validationErrorMessage: "Please enter 'abc'"
                } as iTextInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: true
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });

    }
    private sendBooleanNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        NotificationsRenderer.getBooleanInputFromNotification(guid, "Example Title", "Sind die Notifications cool?",
            {
                inputOptions: {
                    displayType: BooleanDisplayType.Buttons,
                    falseLabel: "nein",
                    trueLabel: "JA✔✔✔"
                } as iBooleanInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: true
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });

    }
    private sendChoiceNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        NotificationsRenderer.getChoiceInputFromNotification(guid, "Example Title", "This is my message",
            {
                inputOptions: {
                    options: [
                        { key: "A", text: "A" },
                        { key: "B", text: "B" }
                    ]
                } as iChoiceInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: true
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });

    }
}