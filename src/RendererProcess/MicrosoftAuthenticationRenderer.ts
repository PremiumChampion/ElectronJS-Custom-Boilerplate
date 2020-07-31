import { CustomError } from "../helper/CustomError";
import { Guid } from "guid-typescript";
import { ipcRenderer } from "electron";
import { AuthenticationProvider, AuthenticationProviderOptions } from "@microsoft/microsoft-graph-client";
import { windowApiRenderer } from "./windowApiRender";

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
            let guid: string = Guid.create().toString() + Guid.create().toString();

            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, accessToken: string) => {
                if (accessToken != null) {
                    resolve(accessToken);
                } else {
                    new CustomError("Authentication failed", "public getAccessToken: (authenticationProviderOptions?: AuthenticationProviderOptions) => Promise<string>", new Error("Custom authentication failed"));
                    reject(null);
                }
            });
            
            ipcRenderer.send('get-access-token', guid);
        });
    }
}