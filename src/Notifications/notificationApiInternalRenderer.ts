import { ipcRenderer } from "electron";
import { CustomError } from "../helper/CustomError";
import { iCustomNotification } from "./interfaces";
import { NotificationEventNames } from "./EventConstants";

export class notificationsApiInternalRender {
    public static closeNotification(guid: string) {
        ipcRenderer.send(NotificationEventNames.closeNotification, guid);
    }

    public static showNotification(guid: string) {
        ipcRenderer.send(NotificationEventNames.showNotification, guid);

    }

    public static hideNotification(guid: string) {
        ipcRenderer.send(NotificationEventNames.hideNotification, guid);
    }

    public static sendNotificationResult(guid: string, result: boolean | string | { key: string; text: string; }){
        ipcRenderer.send(NotificationEventNames.resolveInput, guid, result);
    }
}