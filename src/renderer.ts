import "./index.css";
import "./titlebar.css"
import "./main.css"
import "./footer";
import Main from './RendererProcess/components/Main/Main';
import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@fluentui/react";
import TitleBar from "./RendererProcess/components/TitleBar/TitleBar";
import Footer from "./RendererProcess/components/Footer/Footer";
import { ipcRenderer } from "electron";
import { Client } from "@microsoft/microsoft-graph-client";

initializeIcons();

const accessToken = ipcRenderer.sendSync('loginPrompt', {});


ReactDOM.render(React.createElement(TitleBar, { title: "Custom Benachrichtigungen by TWo" }), document.querySelector("#TitleBar"));
ReactDOM.render(React.createElement(Main), document.querySelector("#Main"));
ReactDOM.render(React.createElement(Footer), document.querySelector("#Footer"));


// const options = {
//     authProvider: accessToken,
// };

// const client = Client.init(options);
// client.api('/me/messages').get().then(console.log).catch(console.error);

fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
        Authorization: `Bearer ${accessToken}`,
        Host: "graph.microsoft.com"
    }
}).then(console.log).catch(console.error);