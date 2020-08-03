import { Guid } from "guid-typescript";
import { ipcRenderer } from "electron";
import { GuidHelper } from "../helper/GuidHelper";

/**
 * api to make developement easier
 *
 * @export
 * @class devApiRenderer
 */
export class devApiRenderer {

    /**
     *queries if this is a developement enviroment
     *
     * @static
     * @returns {Promise<boolean>}
     * @memberof devApiRenderer
     */
    public static isDevelopement(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            let guid: string = GuidHelper.createCustomGuid()
            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, isDevelopement: boolean) => {
                resolve(isDevelopement);
            });
            ipcRenderer.send('is-developement', guid);
        });
    }

    /**
     *toggles the Developer bar
     *
     * @static
     * @memberof devApiRenderer
     */
    public static toggleDeveloperBar(){
        ipcRenderer.send('toggle-dev-tools');
    }
}