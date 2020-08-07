import React from "react";
import { Stack, IconButton } from "@fluentui/react";
import { Client } from "@microsoft/microsoft-graph-client";
import { iEmail, iEmailResponse, iAdaptiveCard } from "./interfaces";
import { EmailAdaptiveCard } from "./adaptivecards";
import * as AdaptiveCards from "adaptivecards";
import MarkdownIt from "markdown-it";

export interface EmailProps {
    /**
 * A referenve to the MSGraphClient
 *
 * @type {Client}
 * @memberof MainProps
 */
    GraphClient: Client;
}

interface EmailState {
    renderedCard: string;
}
/**
 * Component Email
 *
 * @export
 * @class Main
 * @extends {React.Component<EmailProps, EmailState>}
 */
export default class Email extends React.Component<EmailProps, EmailState> {

    constructor(props: EmailProps) {
        super(props);
        this.state = {
            renderedCard: null
        };
    }

    public render(): JSX.Element {
        
        return (
            <div>
                <Stack>
                    <IconButton iconProps={{ iconName: "Refresh" }} onClick={this.loadMails.bind(this)} />
                    {this.state.renderedCard != undefined && this.state.renderedCard != null &&
                        <div dangerouslySetInnerHTML={{ __html: this.state.renderedCard }}></div>
                    }
                </Stack>
            </div>
        );
    }

    public componentDidMount() {
        
        this.loadMails()
    }

    public async loadMails() {
        let res: iEmailResponse = await this.props.GraphClient.api('/me/mailFolders/Inbox/messages')
            .get();
        let emails: iEmail[] = res.value;

        let adaptivecard: iAdaptiveCard = JSON.parse(JSON.stringify(EmailAdaptiveCard));
        
        emails.forEach(email => {
            adaptivecard.body[0].items.push({
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": email.from.emailAddress.name,
                                "size": "Medium",
                                "weight": email.isRead ? 'normal' : 'bolder'
                            },
                            {
                                "type": "TextBlock",
                                "text": email.subject,
                                "spacing": "None",
                                "size": "Small",
                                "weight": email.isRead ? 'normal' : 'bolder'
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "auto",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${email.hasAttachments ? '📎' : ''} ${email.importance == 'normal' ? '' : '❗'}`,
                                "horizontalAlignment": "Right"
                            },
                            {
                                "type": "TextBlock",
                                "text": `${new Date(email.sentDateTime).toDateString()} ${new Date(email.sentDateTime).getHours()}:${new Date(email.sentDateTime).getMinutes()}`,
                                "spacing": "None",
                                "size": "Small"
                            }
                        ],
                        "verticalContentAlignment": "Center"
                    }
                ]
            });
            adaptivecard.body[0].items.push({
                "type": "TextBlock",
                "text": email.bodyPreview,
                "isVisible": false,
                "size": "Small",
                "isSubtle": true
            })
        })

        // Create an AdaptiveCard instance
        let adaptiveCard = new AdaptiveCards.AdaptiveCard();

        // Set its hostConfig property unless you want to use the default Host Config
        // Host Config defines the style and behavior of a card
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
            fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
        });

        (AdaptiveCards as any).processMarkdown = function (text: any) { return MarkdownIt().render(text); }

        // Parse the card payload
        adaptiveCard.parse(adaptivecard);

        // Render the card to an HTML element:
        let renderedCard = adaptiveCard.render().outerHTML;


        this.setState({ renderedCard });
    }
}