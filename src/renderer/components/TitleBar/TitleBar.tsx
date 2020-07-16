import React from "react";
import { Stack, StackItem, Text, divProperties } from "@fluentui/react";
import TitleBarButton, { TitleBarButtonType } from "./TitleBarButton";
import { windowApiRenderer } from "./../../windowApiRender";
import { CustomError } from "./../../../helper/CustomError";
import { devApiRenderer } from "./../../devApiRenderer";


export interface iTitleBarProps {
    title: string;
}

interface iTitleBarState {
    isMaximised: boolean;
    err: CustomError;
    windowSizeErrorCount: number;
    showDevToolsButton: boolean;
}

export default class TitleBar extends React.Component<iTitleBarProps, iTitleBarState> {

    private windowDrag: boolean = false;

    constructor(props: iTitleBarProps) {
        super(props);
        this.state = {
            isMaximised: false,
            err: null,
            windowSizeErrorCount: 0,
            showDevToolsButton: false
        };

    }

    public render(): JSX.Element {
        return (
            <div className={"titleBarContainer"}>
                <Stack className={"titleBar"} horizontal horizontalAlign={"center"}>
                    <StackItem align={"center"} ><Text variant={"mediumPlus"}>{this.props.title}</Text></StackItem>
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

    private getWindowSize() {
        windowApiRenderer.getWindowSize()
            .then(isMaximised => {
                this.setState({ isMaximised: isMaximised, windowSizeErrorCount: 0 });
            })
            .catch((err: CustomError) => {
                this.setState({ err: err, windowSizeErrorCount: this.state.windowSizeErrorCount + 1 });
            });
    }


}