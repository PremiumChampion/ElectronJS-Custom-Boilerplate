import { ipcRenderer } from "electron";
import { CustomError } from "../helper/CustomError";
import { CustomNotification } from "./notificationApiMain";

export class notificationsApiRenderer {

    public static getContents(guid: string): Promise<CustomNotification> {
        return new Promise<CustomNotification>((resolve, reject) => {

            let listener: Electron.IpcRenderer = ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, notification: CustomNotification) => {
                clearTimeout(timeout);
                alert(JSON.stringify(notification));
                if (notification != null) {
                    resolve(notification);
                } else {
                    reject(new CustomError(`Notification with GUID ${guid} does not exist.`, "public static getContents(guid: string): Promise<notification>", new Error("Notification does not exist.")));
                }
            });

            // requests the window size and the private channel to respond on
            ipcRenderer.send('get-notification-properties', guid);

            // a timout which fires if the Main process takes too long to respond
            let timeout = setTimeout(() => {
                listener.removeListener(guid, () => { });
                reject(new CustomError(`Handler took to long to find Notification with GUID ${guid}.`, "public static getContents(guid: string): Promise<notification>", new Error("Timeout fired")));
            }, 3000);
        });

    }
    public static closeNotification(guid: string) {
        ipcRenderer.send("close-notification", guid);
            }

    public static showNotification(guid: string) {
        ipcRenderer.send("show-notification", guid);

    }

    public static hideNotification(guid: string) {
        ipcRenderer.send("hide-notification", guid);
    }
}