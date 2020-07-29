import React from "react";
import { Text, Stack, Toggle, DefaultButton, IToggle, IRefObject, PrimaryButton, Dropdown, IDropdownOption, TextField, IStackStyles, IStackProps, IconButton } from "@fluentui/react";
import { notificationsApiInternalRender } from "../notificationApiInternalRenderer";
import { iCustomNotification, iBooleanInputOptions, iTextInputOptions, iChoiceInputOptions } from "../interfaces";
import { customActionInputType, BooleanDisplayType } from "../enums";

const defaultStackProps: IStackProps = {
    gap: 5
}

/**
 * Properties of the notification button
 *
 * @export
 * @interface iNotificationBodyProps
 */
export interface iNotificationBodyProps {
    /**
     * the guid of the notification
     *
     * @type {string}
     * @memberof iNotificationBodyProps
     */
    guid: string;
    /**
     * the notification to display to the user
     *
     * @type {iCustomNotification}
     * @memberof iNotificationBodyProps
     */
    notification: iCustomNotification;
}
export interface iNotificationBodyState { }

/**
 * the notification body
 *
 * @export
 * @class NotificationBody
 * @extends {React.Component<iNotificationBodyProps, iNotificationBodyState>}
 */
export default class NotificationBody extends React.Component<iNotificationBodyProps, iNotificationBodyState> {

    private BooleanResult: boolean = false;
    private TextResult: string = "";
    private ChoiceResult: { key: string, text: string };

    public render() {

        let BooleanInputOptions: iBooleanInputOptions;
        let TextInputOptions: iTextInputOptions;
        let ChoiceInputOptions: iChoiceInputOptions;


        if (this.props.notification.customAction != null) {
            if (this.props.notification.customAction.type == customActionInputType.boolean) {
                BooleanInputOptions = this.props.notification.customAction.inputOptions as iBooleanInputOptions;
            }
            if (this.props.notification.customAction.type == customActionInputType.text) {
                TextInputOptions = this.props.notification.customAction.inputOptions as iTextInputOptions;
            }
            if (this.props.notification.customAction.type == customActionInputType.choice) {
                ChoiceInputOptions = this.props.notification.customAction.inputOptions as iChoiceInputOptions;
                if (!this.ChoiceResult) {
                    this.ChoiceResult = ChoiceInputOptions.options[0]
                }
            }
        }

        return (
            <div className="main">
                {this.props.notification.customAction == null &&
                    <Text variant={"large"}>{this.props.notification.body}</Text>
                }
                {this.props.notification.customAction != null &&
                    <div>
                        {this.props.notification.customAction.type == customActionInputType.boolean &&
                            <div>
                                {BooleanInputOptions.displayType == BooleanDisplayType.Toggle &&
                                    <Stack {...defaultStackProps} >
                                        <Text variant={"large"}>{this.props.notification.body}</Text>
                                        <Toggle
                                            onText={BooleanInputOptions.trueLabel}
                                            onAriaLabel={BooleanInputOptions.trueLabel}
                                            offText={BooleanInputOptions.falseLabel}
                                            offAriaLabel={BooleanInputOptions.falseLabel}
                                            defaultChecked={this.BooleanResult}
                                            onChange={this.handleBooleanToggleChange.bind(this)}
                                        />
                                        <DefaultButton onClick={this.sendBooleanResult.bind(this, undefined)} text={this.props.notification.customAction.submitButtonLabel} />
                                    </Stack>
                                }
                                {BooleanInputOptions.displayType == BooleanDisplayType.Buttons &&
                                    <Stack {...defaultStackProps}>
                                        <Text variant={"large"}>{this.props.notification.body}</Text>
                                        <Stack horizontal {...defaultStackProps}>
                                            <PrimaryButton onClick={this.sendBooleanResult.bind(this, true)} text={BooleanInputOptions.trueLabel} />
                                            <DefaultButton onClick={this.sendBooleanResult.bind(this, false)} text={BooleanInputOptions.falseLabel} />
                                        </Stack>
                                    </Stack >
                                }
                                {BooleanInputOptions.displayType == BooleanDisplayType.DropDown &&
                                    <Stack {...defaultStackProps}>
                                        <Text variant={"large"}>{this.props.notification.body}</Text>
                                        <Dropdown
                                            options={[{ key: 1, text: BooleanInputOptions.trueLabel }, { key: 0, text: BooleanInputOptions.falseLabel }]}
                                            onChange={this.handleBooleanDropdownChange.bind(this)}
                                            defaultSelectedKey={0}
                                        />
                                        <DefaultButton onClick={this.sendBooleanResult.bind(this, undefined)} text={this.props.notification.customAction.submitButtonLabel} />
                                    </Stack>
                                }
                            </div>
                        }
                        {this.props.notification.customAction.type == customActionInputType.text &&
                            <div>
                                <Stack {...defaultStackProps}>
                                    <Text variant={"large"}>{this.props.notification.body}</Text>
                                    <Stack horizontal styles={{ root: { width: "100%" } }}>
                                        <Stack.Item grow={3} >
                                            <TextField
                                                onChange={this.handleTextInput.bind(this)}
                                                placeholder={TextInputOptions.placeholder}
                                                maxLength={TextInputOptions.maxLength}
                                                deferredValidationTime={200}
                                                onGetErrorMessage={this.vaidateTextInput.bind(this)}
                                            />
                                        </Stack.Item>
                                        <Stack.Item >
                                            <IconButton onClick={this.sendTextResult.bind(this)} iconProps={{ iconName: "Send" }} />
                                        </Stack.Item>
                                    </Stack>
                                </Stack>
                            </div>
                        }
                        {this.props.notification.customAction.type == customActionInputType.choice &&
                            <div>
                                <Stack {...defaultStackProps}>
                                    <Text variant={"large"}>{this.props.notification.body}</Text>
                                    <Dropdown
                                        options={ChoiceInputOptions.options.map(value => ({ key: value.key, text: value.text }))}
                                        onChange={this.handleChoiceDropdownChange.bind(this)}
                                        defaultSelectedKey={ChoiceInputOptions.options[0].key}
                                    />
                                    <DefaultButton onClick={this.sendChoiceResult.bind(this)} text={this.props.notification.customAction.submitButtonLabel} />
                                </Stack>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }

    public componentDidMount() {
        notificationsApiInternalRender.showNotification(this.props.guid);
    }

    public componentWillUnmount() {
        notificationsApiInternalRender.sendNotificationResult(this.props.guid, null)
    }

    //#region BooleanInputHandling
    private handleBooleanToggleChange(event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) {
        this.BooleanResult = checked;
    }

    private handleBooleanDropdownChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) {
        this.BooleanResult = (option.key == 1);
    }

    private sendBooleanResult(result?: boolean) {
        if (result != null && result != undefined) {
            notificationsApiInternalRender.sendNotificationResult(this.props.guid, result);
        } else {
            notificationsApiInternalRender.sendNotificationResult(this.props.guid, this.BooleanResult);
        }
    }
    //#endregion

    //#region TextInputHandling
    private handleTextInput(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
        this.TextResult = newValue;
    }

    private vaidateTextInput(value: string): string {
        let TextInputOptions = this.props.notification.customAction.inputOptions as iTextInputOptions;
        if (TextInputOptions.regex != undefined && TextInputOptions.regex != null) {
            if (TextInputOptions.regex.test(value)) {
                return "";
            } else {
                return TextInputOptions.validationErrorMessage != null && TextInputOptions.validationErrorMessage != undefined ? TextInputOptions.validationErrorMessage : "Bitte überprüfen Sie Ihre Eingabe.";
            }
        } else {
            return "";
        }
    }

    private sendTextResult() {
        let TextInputOptions = this.props.notification.customAction.inputOptions as iTextInputOptions;
        if (TextInputOptions.regex != undefined && TextInputOptions.regex != null) {
            if (TextInputOptions.regex.test(this.TextResult)) {
                notificationsApiInternalRender.sendNotificationResult(this.props.guid, this.TextResult);
            }
        } else {
            notificationsApiInternalRender.sendNotificationResult(this.props.guid, this.TextResult);
        }
    }
    //#endregion

    //#region ChoiceInputHandling
    private handleChoiceDropdownChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) {
        this.ChoiceResult = { key: option.key as string, text: option.text };
    }

    private sendChoiceResult() {
        notificationsApiInternalRender.sendNotificationResult(this.props.guid, this.ChoiceResult);
    }
    //#endregion
}