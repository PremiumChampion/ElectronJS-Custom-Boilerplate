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

initializeIcons();

ReactDOM.render(React.createElement(TitleBar, { title: "technical-demo" }), document.querySelector("#TitleBar"));
ReactDOM.render(React.createElement(Main), document.querySelector("#Main"));
ReactDOM.render(React.createElement(Footer), document.querySelector("#Footer"));
