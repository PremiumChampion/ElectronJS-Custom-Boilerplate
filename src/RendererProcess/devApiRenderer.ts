import { Guid } from "guid-typescript";
import { ipcRenderer } from "electron";

export class devApiRenderer {

    public static isDevelopement(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            let guid: string = Guid.create().toString() + Guid.create().toString();
            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, isDevelopement: boolean) => {
                resolve(isDevelopement);
            });
            ipcRenderer.send('is-developement', guid);
        });
    }
}