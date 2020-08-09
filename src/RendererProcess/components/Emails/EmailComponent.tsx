import React from "react";
import { Stack, IconButton } from "@fluentui/react";
import { Client } from "@microsoft/microsoft-graph-client";
import { iEmailResponse } from "./emailIntelliSenseInterfaces";
import { BasicAdaptiveCard } from "../../../helper/adaptivecards";
import * as AdaptiveCards from "adaptivecards";
import { eMail } from "./EmailAdaptiveCard";
import MarkdownIt from "markdown-it";

/**
 * The properties of the email component
 *
 * @export
 * @interface EmailProps
 */
export interface EmailProps {
    /**
 * A referenve to the MSGraphClient
 *
 * @type {Client}
 * @memberof MainProps
 */
    GraphClient: Client;
}

/**
 * The sate of the email component
 *
 * @interface EmailState
 */
interface EmailState {
    adaptiveCard: AdaptiveCards.AdaptiveCard;
}
/**
 * Component Email
 *
 * @export
 * @class Main
 * @extends {React.Component<EmailProps, EmailState>}
 */
export default class EmailComponent extends React.Component<EmailProps, EmailState> {

    constructor(props: EmailProps) {
        super(props);
        this.state = {
            adaptiveCard: null
        };
    }

    public render(): JSX.Element {

        return (
            <div>
                <Stack>
                    <IconButton iconProps={{ iconName: "Refresh" }} onClick={this.loadMails.bind(this)} />
                    {this.state.adaptiveCard != undefined && this.state.adaptiveCard != null &&
                        <div dangerouslySetInnerHTML={{ __html: this.state.adaptiveCard.renderedElement.outerHTML }}></div>
                    }
                </Stack>
            </div>
        );
    }

    public componentDidMount() {

        this.loadMails()
    }

    /** Queries the curren mails from the server, and matches tem to a adaptive card
     *
     *
     * @memberof Email
     */
    public async loadMails() {
        // Queries the messages of the users inbox
        let res: iEmailResponse = await this.props.GraphClient.api('/me/mailFolders/Inbox/messages')
            .get();

        let mails: eMail[] = res.value.map(mail => new eMail(mail));

        let emailCard = new BasicAdaptiveCard<eMail>();

        // Matches the adaptivecard
        emailCard.addItems(mails);

        // Create an AdaptiveCard instance
        let adaptiveCard = new AdaptiveCards.AdaptiveCard();

        // Set its hostConfig property unless you want to use the default Host Config
        // Host Config defines the style and behavior of a card
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
            fontFamily: "Segoe UI, Helvetica Neue, sans-serif",
        });

        // Support for converting markdown in html
        AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text: string, result: AdaptiveCards.IMarkdownProcessingResult) => {
            result.outputHtml = MarkdownIt().render(text);
            result.didProcess = true;
        }

        // console.log(emailCard.toAdaptiveCard();

        // Parse the card payload
        adaptiveCard.parse(emailCard.toAdaptiveCard());

        adaptiveCard.render();

        this.setState({ adaptiveCard });
    }
}
