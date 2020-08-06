import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Stack } from "@fluentui/react";
import { Client } from "@microsoft/microsoft-graph-client";
import React from "react";
import { CustomError } from "../../../helper/CustomError";
import { CustomNotification } from "../../NotificationsRenderer";
import { BooleanDisplayType } from "./../../../Notifications/enums";
import { iBooleanInputOptions, iChoiceInputOptions, iCustomAction, iTextInputOptions } from "./../../../Notifications/interfaces";
import { MicrosoftAuthenticationProvider } from "./../../MicrosoftAuthenticationRenderer";
import "./main.css"
/**
 * The Properties for the Main Component
 *
 * @export
 * @interface MainProps
 */
export interface MainProps {
    /**
     * A referenve to the MSGraphClient
     *
     * @type {Client}
     * @memberof MainProps
     */
    GraphClient: Client;
}

/**
 * The state of the Main component 
 *
 * @interface MainState
 */
interface MainState {
    /**
     * Contains an error object, if one occurs
     *
     * @type {CustomError}
     * @memberof MainState
     */
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

    constructor(props: MainProps) {
        super(props);
        this.state = {
            err: null
        };
    }

    public render(): JSX.Element {
        return (
            <div className="main">
                {this.state.err != null &&
                    <Dialog
                        hidden={false}
                        onDismiss={this.dismissError.bind(this)}
                        dialogContentProps={{
                            type: DialogType.largeHeader,
                            title: 'An error occured',
                            subText: this.state.err.getErrorMessage()
                        }}
                    >
                        <DialogFooter>
                            <PrimaryButton onClick={this.dismissError.bind(this)} text="Dismiss" />
                        </DialogFooter>
                    </Dialog>
                }
                <Stack>
                    <DefaultButton onClick={this.sendInformationNotification.bind(this)}>Create Information Notification</DefaultButton>
                    <DefaultButton onClick={this.sendTextNotification.bind(this)}>GetTextInput</DefaultButton>
                    <DefaultButton onClick={this.sendBooleanButtonNotification.bind(this)}>GetBooleanButtonInput</DefaultButton>
                    <DefaultButton onClick={this.sendBooleanToggleNotification.bind(this)}>GetBooleanToggleInput</DefaultButton>
                    <DefaultButton onClick={this.sendBooleanDropDownNotification.bind(this)}>GetBooleanDropDownInput</DefaultButton>
                    <DefaultButton onClick={this.sendChoiceNotification.bind(this)}>GetChoiceInput</DefaultButton>
                    <DefaultButton onClick={this.SendMail.bind(this)}>SendMail</DefaultButton>
                    <DefaultButton onClick={this.logoutUser.bind(this)}>Logout</DefaultButton>
                    <DefaultButton onClick={this.loginUser.bind(this)}>Login</DefaultButton>
                </Stack>
            </div>
        );
    }

    private sendInformationNotification() {
        CustomNotification.createInformationNotification("Example Title", "This is my message");
    }

    private sendTextNotification() {
        CustomNotification.getTextInputFromNotification("Example Title", "This is my message",
            {
                inputOptions: {
                    placeholder: "Bitte gebe einen Text ein",
                    regex: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    validationErrorMessage: "Please enter a valid url!"
                } as iTextInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: false
            } as iCustomAction
        ).then(console.log).catch((err: CustomError) => { console.log(err.getErrorMessage()) });

    }

    private sendBooleanButtonNotification() {
        CustomNotification.getBooleanInputFromNotification("Example Title", "Sind die Notifications cool?",
            {
                inputOptions: {
                    displayType: BooleanDisplayType.Buttons,
                    falseLabel: "Nein",
                    trueLabel: "Ja"
                } as iBooleanInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: false
            } as iCustomAction
        )
            .then(console.log)
            .catch((err: CustomError) => { this.setState({ err }); });
    }

    private sendBooleanDropDownNotification() {

        CustomNotification.getBooleanInputFromNotification("Example Title", "Sind die Notifications cool?",
            {
                inputOptions: {
                    displayType: BooleanDisplayType.DropDown,
                    falseLabel: "Nein",
                    trueLabel: "Ja"
                } as iBooleanInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: true
            } as iCustomAction
        )
            .then(console.log)
            .catch((err: CustomError) => { this.setState({ err }); });
    }
    private sendBooleanToggleNotification() {
        CustomNotification.getBooleanInputFromNotification("Example Title", "Sind die Notifications cool?",
            {
                inputOptions: {
                    displayType: BooleanDisplayType.Toggle,
                    falseLabel: "Nein",
                    trueLabel: "Ja"
                } as iBooleanInputOptions,
                submitButtonLabel: "Submit",
                type: null,
                requireInput: true
            } as iCustomAction
        )
            .then(console.log)
            .catch((err: CustomError) => { this.setState({ err }); });
    }

    private sendChoiceNotification() {
        CustomNotification.getChoiceInputFromNotification("Example Title", "This is my message",
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
        )
            .then(console.log)
            .catch((err: CustomError) => { this.setState({ err }); });
    }

    private SendMail() {
        this.props.GraphClient.api("/me/sendMail").post({
            "message": {
                "subject": "Test", //TODO: Enter the Subject of your email
                "body": {
                    "contentType": "html", //TODO: Adjust the contenttype of your message 
                    "content": "<h1>This here is my headline</h1><hr /><p>And my Comtent</p>" //TODO: Enter your message here
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
            .then((_) => { console.log("Email sent successfully ✔") })
            .catch(err => { this.setState({ err: new CustomError("An error occured while sending the email.", "private SendMail()", err) }); });
    }

    private dismissError() {
        this.setState({ err: null })
    }

    private logoutUser() {
        MicrosoftAuthenticationProvider.logout()
            .then(() => { console.info("Logout successfull 👍") })
            .catch(err => { this.setState({ err }) })
    }

    private loginUser() {
        MicrosoftAuthenticationProvider.login()
            .then(() => { console.info("Login successfull 👍") })
            .catch(err => { this.setState({ err }) })
    }

}
