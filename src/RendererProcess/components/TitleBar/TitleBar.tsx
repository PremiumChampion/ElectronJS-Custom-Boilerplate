import React from "react";
import { Stack, StackItem, Text, divProperties } from "@fluentui/react";
import TitleBarButton, { TitleBarButtonType } from "./TitleBarButton";
import { windowApiRenderer } from "../../windowApiRender";
import { CustomError } from "../../../helper/CustomError";
import { devApiRenderer } from "../../devApiRenderer";


/**
 * The properties of the Title bar
 *
 * @export
 * @interface iTitleBarProps
 */
export interface iTitleBarProps {
    /**
     * the title of the window
     *
     * @type {string}
     * @memberof iTitleBarProps
     */
    title: string;
}

/**
 * the state of the title bar
 *
 * @interface iTitleBarState
 */
interface iTitleBarState {
    /**
     *indicates if the window is maximised or not
     *
     * @type {boolean}
     * @memberof iTitleBarState
     */
    isMaximised: boolean;
    /**
     * Constitutes the user-defined error, if it has occurred
     *
     * @type {CustomError}
     * @memberof iTitleBarState
     */
    err: CustomError;
    /**
     *indicates if the toggle-dev-tools butten should be shown
     *
     * @type {boolean}
     * @memberof iTitleBarState
     */
    showDevToolsButton: boolean;
}

/**
 * the title bar of the window
 *
 * @export
 * @class TitleBar
 * @extends {React.Component<iTitleBarProps, iTitleBarState>}
 */
export default class TitleBar extends React.Component<iTitleBarProps, iTitleBarState> {

    constructor(props: iTitleBarProps) {
        super(props);
        this.state = {
            isMaximised: false,
            err: null,
            showDevToolsButton: false
        };

    }

    public render(): JSX.Element {
        return (
            <div className={"titleBarContainer"}>
                <Stack className={"titleBar"} horizontal horizontalAlign={"center"}>
                    <StackItem align={"center"} ><Text nowrap variant={"mediumPlus"}>{this.props.title}</Text></StackItem>
                    {this.state.showDevToolsButton &&
                        <StackItem ><TitleBarButton type={TitleBarButtonType.DeveloperBar} /></StackItem>
                    }
                    <StackItem ><TitleBarButton type={TitleBarButtonType.Hide} /></StackItem>
                    <StackItem >
                        {this.state.isMaximised &&
                            <TitleBarButton type={TitleBarButtonType.Minimize} />
                        }
                        {!this.state.isMaximised &&
                            <TitleBarButton type={TitleBarButtonType.Maximize} />
                        }
                    </StackItem>
                    <StackItem ><TitleBarButton type={TitleBarButtonType.Close} /></StackItem>
                </Stack>
            </div>
        );
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.getWindowSize.bind(this))
    }

    public componentDidMount() {
        window.addEventListener("resize", this.getWindowSize.bind(this))
        devApiRenderer.isDevelopement()
            .then((showDevToolsButton) => {
                this.setState({ showDevToolsButton: showDevToolsButton });
            });
        this.getWindowSize();
    }

    /**
     * queries the window size and sets the state accordingly
     *
     * @private
     * @memberof TitleBar
     */
    private getWindowSize() {
        windowApiRenderer.getWindowSize()
            .then(isMaximised => {
                this.setState({ isMaximised: isMaximised });
            })
            .catch((err: CustomError) => {
                this.setState({ err: err });
            });
    }


}