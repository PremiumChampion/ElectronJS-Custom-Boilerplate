import React from "react";
import { Stack, StackItem, IconButton } from "@fluentui/react";
import { windowApiRenderer } from "../../windowApiRender";
import { devApiRenderer } from "../../devApiRenderer";

/**
 * the Type of title bar button
 *
 * @export
 * @enum {number}
 */
export enum TitleBarButtonType {
    /**
     * Close Button
     */
    Close,
    /**
     * Maximise Button
     */
    Maximize,
    /**
     * Minimise Button
     */
    Minimize,
    /**
     * Hide Button
     */
    Hide,
    /**
     * Developer-Bar-Button
     */
    DeveloperBar
}

/**
 * the properties of the Button
 *
 * @export
 * @interface iTitleBarButtonProps
 */
export interface iTitleBarButtonProps {
    /**
     * the button type
     *
     * @type {TitleBarButtonType}
     * @memberof iTitleBarButtonProps
     */
    type: TitleBarButtonType;
}

interface iTitleBarButtonState { }

/**
 * A TitleBarButton
 *
 * @export
 * @class TitleBarButton
 * @extends {React.Component<iTitleBarButtonProps, iTitleBarButtonState>}
 */
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
                    <IconButton iconProps={{ iconName: "DeveloperTools" }} title={"Developer-Bar öffnen"} onClick={devApiRenderer.toggleDeveloperBar.bind(undefined)} />
                }
            </>
        );
    }
}