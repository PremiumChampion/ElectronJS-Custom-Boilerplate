import React from "react";
import { Text, Stack } from "@fluentui/react";
import "./footer.css"

/**
 * The Properties of the Footer
 *
 * @export
 * @interface FooterProps
 */
export interface FooterProps {
    /**
     *The text to display on the footer
     *
     * @type {string}
     * @memberof FooterProps
     */
    text: string;
}

/**
 * The state od the footer
 *
 * @interface FooterState
 */
interface FooterState {
}
/**
 * the footer of the notification
 *
 * @export
 * @class Main
 * @extends {React.Component<FooterProps, FooterState>}
 */
export default class Footer extends React.Component<FooterProps, FooterState> {

    constructor(props: FooterProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (<Stack horizontal horizontalAlign={"center"}><Text variant={"tiny"}>{this.props.text}</Text></Stack>);
    }

}