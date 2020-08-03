import { initializeIcons } from "@fluentui/react";
import { Client, ClientOptions } from "@microsoft/microsoft-graph-client";
import { CustomError } from "./helper/CustomError";
import React from 'react';
import ReactDOM from 'react-dom';
import "./footer";
import "./index.css";
import "./main.css";
import Footer, { FooterProps } from "./RendererProcess/components/Footer/Footer";
import Main, { MainProps } from './RendererProcess/components/Main/Main';
import TitleBar from "./RendererProcess/components/TitleBar/TitleBar";
import { MicrosoftAuthenticationProvider } from "./RendererProcess/MicrosoftAuthenticationRenderer";
import "./titlebar.css";

initializeIcons();

let clientOptions: ClientOptions = {
    authProvider: new MicrosoftAuthenticationProvider(),
};
const MSGraphClient = Client.initWithMiddleware(clientOptions);

ReactDOM.render(React.createElement(TitleBar, { title: "ElectronJS-Custom-Boilerplate" }), document.querySelector("#TitleBar"));
ReactDOM.render(React.createElement(Main, { GraphClient: MSGraphClient } as MainProps), document.querySelector("#Main"));
ReactDOM.render(React.createElement(Footer, { text: "Created by Timo Woityschyn" } as FooterProps), document.querySelector("#Footer"));
