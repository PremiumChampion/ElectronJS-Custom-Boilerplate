import { iEmail } from "./emailIntelliSenseInterfaces";
import { BasicAdaptiveCardItem } from "../../../helper/adaptivecards";

/**
 * Represents a email
 *
 * @export
 * @class eMail
 * @implements {BasicAdaptiveCardItem}
 */
export class eMail implements BasicAdaptiveCardItem {
    
    /**
     * Creates an instance of eMail.
     * @param {iEmail} currentMail the response of the mail api request
     * @memberof eMail
     */
    constructor(private currentMail: iEmail) {
    }

    /**
     * Converts the email to a adaptive card item
     *
     * @return {*}  {*}
     * @memberof Email
     */
    public toAdapticeCardItem() : any {
        return (
            [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": this.currentMail.from.emailAddress.name,
                                    "size": "Medium",
                                    "weight": this.currentMail.isRead ? 'normal' : 'bolder'
                                },
                                {
                                    "type": "TextBlock",
                                    "text": this.currentMail.subject,
                                    "spacing": "None",
                                    "size": "Small",
                                    "weight": this.currentMail.isRead ? 'normal' : 'bolder'
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${this.currentMail.hasAttachments ? '📎' : ''} ${this.currentMail.importance == 'normal' ? '' : '❗'}`,
                                    "horizontalAlignment": "Right"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": `${new Date(this.currentMail.sentDateTime).toDateString()} ${new Date(this.currentMail.sentDateTime).getHours()}:${new Date(this.currentMail.sentDateTime).getMinutes()}`,
                                    "spacing": "None",
                                    "size": "Small"
                                }
                            ],
                            "verticalContentAlignment": "Center"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": this.currentMail.bodyPreview,
                    "isVisible": false,
                    "size": "Small",
                    "isSubtle": true
                }
            ]
        )
    }
}