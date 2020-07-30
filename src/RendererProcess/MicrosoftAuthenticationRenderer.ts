import { CustomError } from "../helper/CustomError";
import { Guid } from "guid-typescript";
import { ipcRenderer } from "electron";
import { AuthenticationProvider, AuthenticationProviderOptions } from "@microsoft/microsoft-graph-client";
import { windowApiRenderer } from "./windowApiRender";

/**
 * A class to interact with the Microsoft Authentication
 *
 * @export
 * @class MicrosoftAuthenticationRenderer
 */
export class MicrosoftAuthenticationRenderer implements AuthenticationProvider {
    public getAccessToken: (authenticationProviderOptions?: AuthenticationProviderOptions) => Promise<string> = (authenticationProviderOptions?: AuthenticationProviderOptions) => {
        return new Promise<string>((resolve, reject) => {
            let guid: string = Guid.create().toString() + Guid.create().toString();

            ipcRenderer.once(guid, (event: Electron.IpcRendererEvent, accessToken: string) => {
                resolve(accessToken);
            });

            ipcRenderer.send('get-access-token', guid);

        });
    }
}