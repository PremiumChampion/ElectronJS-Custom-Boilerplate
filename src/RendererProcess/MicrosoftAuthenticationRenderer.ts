import { AuthenticationProvider, AuthenticationProviderOptions } from "@microsoft/microsoft-graph-client";
import { ipcRenderer } from "electron";
import { CustomError } from "../helper/CustomError";
import { GuidHelper } from "../helper/GuidHelper";

/**
 * A class to interact with the Microsoft Authentication
 *
 * @export
 * @class MicrosoftAuthenticationProvider
 */
export class MicrosoftAuthenticationProvider implements AuthenticationProvider {
    /**
     * Queries the AccessToken for the current user or asks the user to login
     *
     * @memberof MicrosoftAuthenticationProvider
     */
    public getAccessToken: (authenticationProviderOptions?: AuthenticationProviderOptions) => Promise<string> = (authenticationProviderOptions?: AuthenticationProviderOptions) => {
        return new Promise<string>((resolve, reject) => {

            let guid: string = GuidHelper.createCustomGuid();

            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, accessToken: string, error: CustomError) => {

                if (accessToken != null) {
                    resolve(accessToken);
                } else {
                    new CustomError("Authentication failed", "public getAccessToken: (authenticationProviderOptions?: AuthenticationProviderOptions) => Promise<string>", error);
                    reject(null);
                }
            });

            ipcRenderer.send('get-access-token', guid);
        });
    }

    /**
     * Logs the user on
     *
     * @static
     * @returns {Promise<boolean>}
     * @memberof MicrosoftAuthenticationProvider
     */
    public static login(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            let guid: string = GuidHelper.createCustomGuid();

            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, accessToken: string, error: CustomError) => {
                if (accessToken != null && typeof accessToken == "string") {
                    resolve(true);
                } else {
                    new CustomError("Authentication failed", "public static login(): Promise<boolean>", error);
                    reject(false);
                }
            });

            ipcRenderer.send('get-access-token', guid);
        });
    }

    /**
     * Logs the user off
     *
     * @static
     * @memberof MicrosoftAuthenticationProvider
     */
    public static logout: () => Promise<null> = () => {
        return new Promise<null>((resolve, reject) => {

            let guid: string = GuidHelper.createCustomGuid();

            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, error: CustomError) => {
                if (error != null) {
                    reject(new CustomError("An error occurred while logging off the user", "public static logout: () => Promise<null>", error))
                }
                resolve(null);
            });
            ipcRenderer.send('logout', guid);
        });
    }


}