import { ipcRenderer } from "electron";
import { NotificationChannelNames } from "./EventConstants";

/**
 * The internal api to interact with the notification window
 *
 * @export
 * @class notificationsApiInternalRender
 */
export class notificationsApiInternalRender {
    /**
     * Closes the notification
     *
     * @static
     * @param {string} guid the guid of the notification
     * @memberof notificationsApiInternalRender
     */
    public static closeNotification(guid: string) {
        ipcRenderer.send(NotificationChannelNames.closeNotification, guid);
    }

    /**
     * Shows the notification
     *
     * @static
     * @param {string} guid the guid of the notification
     * @memberof notificationsApiInternalRender
     */
    public static showNotification(guid: string) {
        ipcRenderer.send(NotificationChannelNames.showNotification, guid);

    }

    /**
     * Hides the Notification (can't be shown again by the user)
     *
     * @static
     * @param {string} guid the guid of the notification
     * @memberof notificationsApiInternalRender
     */
    public static hideNotification(guid: string) {
        ipcRenderer.send(NotificationChannelNames.hideNotification, guid);
    }

    /**
     * Show Notification
     *
     * @static
     * @param {string} guid the guid of the notification
     * @param {(boolean | string | { key: string; text: string; })} result the result value
     * @memberof notificationsApiInternalRender
     */
    public static sendNotificationResult(guid: string, result: boolean | string | { key: string; text: string; }){
        ipcRenderer.send(NotificationChannelNames.resolveInput, guid, result);
    }
}