import "./index.css";
import "./titlebar.css"
import "./main.css"
import "./footer";
import Main, { MainProps } from './RendererProcess/components/Main/Main';
import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@fluentui/react";
import TitleBar from "./RendererProcess/components/TitleBar/TitleBar";
import Footer from "./RendererProcess/components/Footer/Footer";
import { ipcRenderer } from "electron";
import { AuthenticationProvider, AuthenticationProviderOptions, ClientOptions, Client } from "@microsoft/microsoft-graph-client";
import { MicrosoftAuthenticationProvider } from "./RendererProcess/MicrosoftAuthenticationRenderer";

initializeIcons();

let clientOptions: ClientOptions = {
    authProvider: new MicrosoftAuthenticationProvider(),
};
const client = Client.initWithMiddleware(clientOptions);

client.api("/me").get().then(console.log).catch(console.log)

ReactDOM.render(React.createElement(TitleBar, { title: "Custom Benachrichtigungen by TWo" }), document.querySelector("#TitleBar"));
ReactDOM.render(React.createElement(Main, { GraphClient: client } as MainProps), document.querySelector("#Main"));
ReactDOM.render(React.createElement(Footer), document.querySelector("#Footer"));
