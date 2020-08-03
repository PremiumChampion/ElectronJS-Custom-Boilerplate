import { ipcRenderer } from "electron";
import { NotificationChannelNames } from "./../Notifications/EventConstants";
import { iCustomNotification, iCustomAction, iTextInputOptions, iBooleanInputOptions, iChoiceInputOptions } from "./../Notifications/interfaces";
import { CustomError } from "../helper/CustomError";
import { customActionInputType } from "./../Notifications/enums";
import { GuidHelper } from "../helper/GuidHelper";

/**
 * Uses the Custom Notification API to create notifications with reply values
 *
 * @export
 * @class CustomNotification
 */
export class CustomNotification {
    /**
     *creates a custom notification
     *
     * @static
     * @param {string} title the title of the notification
     * @param {string} [message=""] the message of the notification
     * @memberof CustomNotification
     */
    public static createInformationNotification(title: string, message: string = "") {
        let guid = GuidHelper.createCustomGuid();
        ipcRenderer.send(NotificationChannelNames.createNotification, guid, { title, body: message, customAction: null } as iCustomNotification);
    }

    /**
     * creates a Text input notification
     *
     * @static
     * @param {string} title the title of the notification
     * @param {string} message the message of the notification
     * @param {iCustomAction} customAction the properties of the custom action
     * @returns {Promise<string>} The text input from the user
     * @memberof CustomNotification
     */
    public static getTextInputFromNotification(title: string, message: string, customAction: iCustomAction): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let guid = GuidHelper.createCustomGuid();

            try {
                customAction.inputOptions = customAction.inputOptions as iTextInputOptions;
            } catch (err) {
                reject(new CustomError("The inputOptions provided do not match the iTextInputOptions interface", "public static getTextInputFromNotification(title: string, message: string, customAction: iCustomAction): Promise<string>", err));
            }

            customAction.type = customActionInputType.text;
            ipcRenderer.send(NotificationChannelNames.createNotification, guid, { title, body: message, customAction } as iCustomNotification);
            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, result: string) => {
                if (result == null) {
                    reject(new CustomError("No message was entered by the user", "public static getTextInputFromNotification(title: string, message: string, customAction: iCustomAction): Promise<string>", new Error("The notification was dismissed by the user")))
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * creates a notification to requestr a YES/NO value
     *
     * @static
     * @param {string} title the title of the notification
     * @param {string} message the message of the notification
     * @param {iCustomAction} customAction the properties of the custom action
     * @returns {Promise<boolean>} The selected value TRUE / FALSE
     * @memberof CustomNotification
     */
    public static getBooleanInputFromNotification(title: string, message: string, customAction: iCustomAction): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let guid = GuidHelper.createCustomGuid();

            try {
                customAction.inputOptions = customAction.inputOptions as iBooleanInputOptions;
            } catch (err) {
                reject(new CustomError("The inputOptions provided do not match the iBooleanInputOptions interface", "public static getTextInputFromNotification(title: string, message: string, customAction: iCustomAction): Promise<boolean>", err));
            }

            customAction.type = customActionInputType.boolean;
            ipcRenderer.send(NotificationChannelNames.createNotification, guid, { title, body: message, customAction } as iCustomNotification);
            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, result: boolean) => {
                if (result == null) {
                    reject(new CustomError("No Option was selected by the user", "public static getBooleanInputFromNotification(title: string, message: string, customAction: iCustomAction): Promise<boolean>", new Error("The notification was dismissed by the user")))
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Gives the user multiple options to choose from
     *
     * @static
     * @param {string} title the title of the notification
     * @param {string} message the message of the notification
     * @param {iCustomAction} customAction the properties of the custom action
     * @returns {Promise<{key: string, text: string}>} the selected option
     * @memberof CustomNotification
     */
    public static getChoiceInputFromNotification(title: string, message: string, customAction: iCustomAction): Promise<{key: string, text: string}> {
        return new Promise<{ key: string, text: string }>((resolve, reject) => {
            let guid = GuidHelper.createCustomGuid();

            try {
                customAction.inputOptions = customAction.inputOptions as iChoiceInputOptions;
            } catch (err) {
                reject(new CustomError("The inputOptions provided do not match the iBooleanInputOptions interface", "public static getTextInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<{key: string, text: string}>", err));
            }

            customAction.type = customActionInputType.choice;
            ipcRenderer.send(NotificationChannelNames.createNotification, guid, { title, body: message, customAction } as iCustomNotification);
            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, result: {key: string, text: string}) => {
                if (result == null) {
                    reject(new CustomError("No Option was selected by the user", "public static getChoiceInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<{key: string, text: string}>", new Error("The notification was dismissed by the user")))
                } else {
                    resolve(result);
                }
            });
        });
    }
}