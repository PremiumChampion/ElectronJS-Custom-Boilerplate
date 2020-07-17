import { ipcRenderer } from "electron";
import { NotificationEventNames } from "./../Notifications/EventConstants";
import { iCustomNotification, iCustomAction, iTextInputOptions, iBooleanInputOptions, iChoiceInputOptions } from "./../Notifications/interfaces";
import { CustomError } from "../helper/CustomError";
import { customActionInputType } from "./../Notifications/enums";

export class NotificationsRenderer {
    public static createInformationNotification(guid: string, title: string, message: string = "") {
        ipcRenderer.send(NotificationEventNames.createNotification, guid, { title, body: message, customAction: null } as iCustomNotification);
    }

    public static getTextInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                customAction.inputOptions = customAction.inputOptions as iTextInputOptions;
            } catch (err) {
                reject(new CustomError("The inputOptions provided do not match the iTextInputOptions interface", "public static getTextInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<string>", err));
            }
            customAction.type = customActionInputType.text;
            ipcRenderer.send(NotificationEventNames.createNotification, guid, { title, body: message, customAction } as iCustomNotification);
            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, result: string) => {
                if (result == null) {
                    reject(new CustomError("No message was entered by the user", "public static getTextInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<string>", new Error("The notification was dismissed by the user")))
                } else {
                    resolve(result);
                }
            });
        });
    }

    public static getBooleanInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                customAction.inputOptions = customAction.inputOptions as iBooleanInputOptions;
            } catch (err) {
                reject(new CustomError("The inputOptions provided do not match the iBooleanInputOptions interface", "public static getTextInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<boolean>", err));
            }
            customAction.type = customActionInputType.boolean;
            ipcRenderer.send(NotificationEventNames.createNotification, guid, { title, body: message, customAction } as iCustomNotification);
            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, result: boolean) => {
                if (result == null) {
                    reject(new CustomError("No Option was selected by the user", "public static getBooleanInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<boolean>", new Error("The notification was dismissed by the user")))
                } else {
                    resolve(result);
                }
            });
        });
    }

    public static getChoiceInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<{key: string, text: string}> {
        return new Promise<{key: string, text: string}>((resolve, reject) => {
            try {
                customAction.inputOptions = customAction.inputOptions as iChoiceInputOptions;
            } catch (err) {
                reject(new CustomError("The inputOptions provided do not match the iBooleanInputOptions interface", "public static getTextInputFromNotification(guid: string, title: string, message: string, customAction: iCustomAction): Promise<{key: string, text: string}>", err));
            }
            customAction.type = customActionInputType.choice;
            ipcRenderer.send(NotificationEventNames.createNotification, guid, { title, body: message, customAction } as iCustomNotification);
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