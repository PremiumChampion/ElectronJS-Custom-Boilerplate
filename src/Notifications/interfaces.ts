import { customActionInputType, BooleanDisplayType } from "./enums";


export interface iCustomNotification {
    title: string;
    body: string;
    customAction: iCustomAction;
}

export interface iCustomAction {
    type: customActionInputType;
    inputOptions: iTextInputOptions | iBooleanInputOptions | iChoiceInputOptions;
    requireInput?: boolean;
    submitButtonLabel: string;
}

export interface iTextInputOptions {
    placeholder: string;
    maxLength?: number;
    regex?: RegExp;
    validationErrorMessage?: string;
}

export interface iBooleanInputOptions {
    trueLabel: string;
    falseLabel: string;
    displayType: BooleanDisplayType;
}

export interface iChoiceInputOptions {
    options: Array<{ key: string, text: string }>;
}
