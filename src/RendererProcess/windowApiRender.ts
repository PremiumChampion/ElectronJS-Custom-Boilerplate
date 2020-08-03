import { ipcRenderer } from "electron";
import { CustomError } from "../helper/CustomError";
import { GuidHelper } from "../helper/GuidHelper";

/**
 * Api to interact with the window
 *
 * @export
 * @class windowApiRenderer
 */
export class windowApiRenderer {
    /**
     *minimizes the main window
     *
     * @static
     * @memberof windowApiRenderer
     */
    public static minimize() {
        ipcRenderer.send('minimize-window');
    }
    /**
     *maximizes the main window
     *
     * @static
     * @memberof windowApiRenderer
     */
    public static maximise() {
        ipcRenderer.send('maximise-window');
    }
    /**
     *hides the main window
     *
     * @static
     * @memberof windowApiRenderer
     */
    public static hide() {
        ipcRenderer.send('hide-window');
    }
    /**
     *shows the main window
     *
     * @static
     * @memberof windowApiRenderer
     */
    public static show() {
        ipcRenderer.send('show-window');
    }

    /**
     *
     *closes the main window
     * @static
     * @param {boolean} [force=false]
     * @memberof windowApiRenderer
     */
    public static close(force: boolean = false) {
        ipcRenderer.send('close-window', force);
    }

    /**
     * Queries if the window is Maximised
     *
     * @static
     * @returns {Promise<boolean>} TRUR if the Windwo can be maximised and FALSE if the window can't be maximised
     * @memberof windowApiRenderer
     */
    public static getWindowSize(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            let guid = GuidHelper.createCustomGuid();

            // declares a private channel
            let listener: Electron.IpcRenderer = ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, isMaximised: boolean) => {
                clearTimeout(timeout);
                resolve(isMaximised);
            });
            
            // requests the window size and the private channel to respond on
            ipcRenderer.send('get-window-size', guid);
            
            // a timout which fires if the Main process takes too long to respond
            let timeout = setTimeout(() => {
                listener.removeListener(guid, () => { });
                reject(new CustomError("A timeout has occurred while retrieving the window size. Does the application perhaps not react?", "public static getWindowSize(): Promise<boolean>", new Error("Timeout fired")))
            }, 3000);

        });
    }
    
}
