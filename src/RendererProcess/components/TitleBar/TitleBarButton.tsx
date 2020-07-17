import React from "react";
import { Stack, StackItem, IconButton } from "@fluentui/react";
import { windowApiRenderer } from "../../windowApiRender";

export enum TitleBarButtonType {
    Close, Maximize, Minimize, Hide, DeveloperBar
}

export interface iTitleBarButtonProps {
    type: TitleBarButtonType;
}

interface iTitleBarButtonState { }

export default class TitleBarButton extends React.Component<iTitleBarButtonProps, iTitleBarButtonState> {

    constructor(props: iTitleBarButtonProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <>
                {this.props.type == TitleBarButtonType.Close &&
                    <IconButton iconProps={{ iconName: "ChromeClose" }} title={"Fenster schließen"} onClick={windowApiRenderer.close.bind(undefined, false)} />
                }
                {this.props.type == TitleBarButtonType.Hide &&
                    <IconButton iconProps={{ iconName: "ChromeMinimize" }} title={"Fenster minimieren"} onClick={windowApiRenderer.hide.bind(undefined)} />
                }
                {this.props.type == TitleBarButtonType.Maximize &&
                    <IconButton iconProps={{ iconName: "ChromeFullScreen" }} title={"Fenster maximieren"} onClick={windowApiRenderer.maximise.bind(undefined)} />
                }
                {this.props.type == TitleBarButtonType.Minimize &&
                    <IconButton iconProps={{ iconName: "ChromeRestore" }} title={"Fenster verkleinern"} onClick={windowApiRenderer.minimize.bind(undefined)} />
                }
                {this.props.type == TitleBarButtonType.DeveloperBar &&
                    <IconButton iconProps={{ iconName: "DeveloperTools" }} title={"Developer-Bar öffnen"} onClick={windowApiRenderer.toggleDeveloperBar.bind(undefined)} />
                }
            </>
        );
    }
}