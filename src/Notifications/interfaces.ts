import { customActionInputType, BooleanDisplayType } from "./enums";


/**
 * Describes a custom NotificationS
 *
 * @export
 * @interface iCustomNotification
 */
export interface iCustomNotification {
    /**
     * the title of the notification
     *
     * @type {string}
     * @memberof iCustomNotification
     */
    title: string;
    /**
     * the body message of the notification
     *
     * @type {string}
     * @memberof iCustomNotification
     */
    body: string;
    customAction: iCustomAction;
    /**
     *the time afer which the notification will be dimissed
     *
     * @type {number}
     * @memberof iCustomNotification
     */
    dismissTime: number;
}

/**
 * describes a custom action
 *
 * @export
 * @interface iCustomAction
 */
export interface iCustomAction {
    /**
     * the type of custom action
     *
     * @type {customActionInputType}
     * @memberof iCustomAction
     */
    type: customActionInputType;
    /**
     * th input options for the selected type
     *
     * @type {(iTextInputOptions | iBooleanInputOptions | iChoiceInputOptions)}
     * @memberof iCustomAction
     */
    inputOptions: iTextInputOptions | iBooleanInputOptions | iChoiceInputOptions;
    /**
     * FALSE the notification will be dismissed after time or can be closed from the user
     * TRUE the notofication will stay open until the user enters his message
     *
     * @type {boolean}
     * @memberof iCustomAction
     */
    requireInput?: boolean;
    /**
     * the label for the submit button
     *
     * @type {string}
     * @memberof iCustomAction
     */
    submitButtonLabel: string;
}

/**
 * describes text input options
 *
 * @export
 * @interface iTextInputOptions
 */
export interface iTextInputOptions {
    /**
     * the placeholder of the text box
     *
     * @type {string}
     * @memberof iTextInputOptions
     */
    placeholder: string;
    /**
     * the macimum ammount of charakters allowed to type
     *
     * @type {number}
     * @memberof iTextInputOptions
     */
    maxLength?: number;
    /**
     * a REgular Exprression to match the selected input against
     *
     * @type {RegExp}
     * @memberof iTextInputOptions
     */
    regex?: RegExp;
    /**
     * the validation error message, will be shown if the user enters a value that does not match the regular expression
     *
     * @type {string}
     * @memberof iTextInputOptions
     */
    validationErrorMessage?: string;
}

/**
 * describes Boolean input options
 *
 * @export
 * @interface iBooleanInputOptions
 */
export interface iBooleanInputOptions {
    /**
     * The label for the true {return} value
     *
     * @type {string}
     * @memberof iBooleanInputOptions
     */
    trueLabel: string;
    /**
     * the label for the {false} return value
     *
     * @type {string}
     * @memberof iBooleanInputOptions
     */
    falseLabel: string;
    /**
     * Specifies the display type of the input
     *
     * @type {BooleanDisplayType}
     * @memberof iBooleanInputOptions
     */
    displayType: BooleanDisplayType;
}

/**
 * Choice input options
 *
 * @export
 * @interface iChoiceInputOptions
 */
export interface iChoiceInputOptions {
    /**
     * Array of key value pairs, the selected pair will be returened to the user. 
     *
     * @type {Array<{ key: string, text: string }>}
     * @memberof iChoiceInputOptions
     */
    options: Array<
        {   
            /**
            *shpuld be unike in the array
            *
            * @type {string}
            */
            key: string,
            /**
             * Te text to display to the user
             *
             * @type {string}
             */
            text: string
        }
    >;
}
