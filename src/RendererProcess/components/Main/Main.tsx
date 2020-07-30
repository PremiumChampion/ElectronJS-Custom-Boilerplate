import React from "react";
import { Text, DefaultButton, Stack } from "@fluentui/react";
import { CustomNotification } from "../../NotificationsRenderer";
import { CustomError } from "../../../helper/CustomError";
import { Guid } from "guid-typescript";
import { iCustomAction, iTextInputOptions, iBooleanInputOptions, iChoiceInputOptions } from "./../../../Notifications/interfaces";
import { BooleanDisplayType } from "./../../../Notifications/enums";
import { Client } from "@microsoft/microsoft-graph-client";

export interface MainProps {
    GraphClient: Client;
}

interface MainState {
    err: CustomError;
}


/**
 * Main entry for the components of the user
 *
 * @export
 * @class Main
 * @extends {React.Component<MainProps, MainState>}
 */
export default class Main extends React.Component<MainProps, MainState> {

    public render(): JSX.Element {
        return (
            <div className="main">
                <Stack>
                    <DefaultButton onClick={this.sendInformationNotification.bind(this)}>Create Information Notification</DefaultButton>
                    <DefaultButton onClick={this.sendTextNotification.bind(this)}>GetTextInput</DefaultButton>
                    <DefaultButton onClick={this.sendBooleanButtonNotification.bind(this)}>GetBooleanButtonInput</DefaultButton>
                    <DefaultButton onClick={this.sendBooleanToggleNotification.bind(this)}>GetBooleanToggleInput</DefaultButton>
                    <DefaultButton onClick={this.sendBooleanDropDownNotification.bind(this)}>GetBooleanDropDownInput</DefaultButton>
                    <DefaultButton onClick={this.sendChoiceNotification.bind(this)}>GetChoiceInput</DefaultButton>
                    <DefaultButton onClick={this.SendMail.bind(this)}>SendMail</DefaultButton>
                </Stack>
            </div>
        );
    }


    public componentDidMount() {

    }
    private sendInformationNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        CustomNotification.createInformationNotification(guid, "Example Title", "This is my message");
    }

    private sendTextNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        CustomNotification.getTextInputFromNotification(guid, "Example Title", "This is my message",
            {
                inputOptions: {
                    placeholder: "Bitte gebe einen Text ein",
                    // regex: /abc/gm,
                    // validationErrorMessage: "Please enter 'abc'"
                } as iTextInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: false
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });

    }
    private sendBooleanButtonNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        CustomNotification.getBooleanInputFromNotification(guid, "Example Title", "Sind die Notifications cool?",
            {
                inputOptions: {
                    displayType: BooleanDisplayType.Buttons,
                    falseLabel: "nein",
                    trueLabel: "JA✔✔✔"
                } as iBooleanInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: false
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });
    }

    private sendBooleanDropDownNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        CustomNotification.getBooleanInputFromNotification(guid, "Example Title", "Sind die Notifications cool?",
            {
                inputOptions: {
                    displayType: BooleanDisplayType.DropDown,
                    falseLabel: "nein",
                    trueLabel: "JA✔✔✔"
                } as iBooleanInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: true
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });
    }
    private sendBooleanToggleNotification() {
        let guid: string = Guid.create().toString() + Guid.create().toString();
        CustomNotification.getBooleanInputFromNotification(guid, "Example Title", "Sind die Notifications cool?",
            {
                inputOptions: {
                    displayType: BooleanDisplayType.Toggle,
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
        CustomNotification.getChoiceInputFromNotification(guid, "Example Title", "This is my message",
            {
                inputOptions: {
                    options: [
                        { key: "A", text: "A" },
                        { key: "B", text: "B" },
                        { key: "C", text: "C" },
                        { key: "D", text: "D" },
                        { key: "E", text: "E" },
                        { key: "F", text: "F" }
                    ]
                } as iChoiceInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: false
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });

    }

    private SendMail() {
        this.props.GraphClient.api("/me/sendMail").post({
            "message": {
                "subject": "Meet for lunch?",
                "body": {
                    "contentType": "Text",
                    "content": "The new cafeteria is open."
                },
                "toRecipients": [
                    {
                        "emailAddress": {
                            "address": "" // TODO: Enter your E-Mail here 
                        }
                    }
                ]
            }
        })
    }
}