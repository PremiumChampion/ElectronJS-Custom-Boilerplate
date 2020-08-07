import { iAdaptiveCard } from "./interfaces";

export const EmailAdaptiveCard: iAdaptiveCard = {
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
        {
            "type": "Container",
            "$data": "{value}",
            "items": [],
            "separator": true
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
}