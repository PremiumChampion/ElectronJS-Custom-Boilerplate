export interface iAdaptiveCard {
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "Container",
      "$data": "{value}",
      "items": any[],
      "separator": true
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
}

export const iEmailCardItem = [
  {
    "type": "ColumnSet",
    "columns": [
      {
        "type": "Column",
        "width": "stretch",
        "items": [
          {
            "type": "TextBlock",
            "text": "{from.emailAddress.name}",
            "size": "Medium",
            "weight": "{if(isRead, 'normal', 'bolder')}"
          },
          {
            "type": "TextBlock",
            "text": "{subject}",
            "spacing": "None",
            "size": "Small",
            "weight": "{if(isRead, 'normal', 'bolder')}"
          }
        ]
      },
      {
        "type": "Column",
        "width": "auto",
        "items": [
          {
            "type": "TextBlock",
            "text": "{if(hasAttachments, '📎', '')} {if(importance == 'normal', '', '❗')} {if(flag.flagStatus == 'flagged', '🚩', '')}",
            "horizontalAlignment": "Right"
          },
          {
            "type": "TextBlock",
            "text": "{{DATE({sentDateTime}, COMPACT)}} {{TIME({sentDateTime})}}",
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
    "text": "{bodyPreview}",
    "isVisible": false,
    "size": "Small",
    "isSubtle": true
  }
]

export interface iEmailResponse {
  "@odata.context": string;
  "@odata.nextLink": string;
  "value": iEmail[]
}

export interface iEmail {
  "@odata.etag": string;
  "id": string;
  "createdDateTime": string;
  "lastModifiedDateTime": string;
  "changeKey": string;
  "categories": [],
  "receivedDateTime": string;
  "sentDateTime": string;
  "hasAttachments": boolean;
  "internetMessageId": string;
  "subject": string;
  "bodyPreview": string;
  "importance": string;
  "parentFolderId": string;
  "conversationId": string;
  "conversationIndex": string;
  "isDeliveryReceiptRequested": boolean,
  "isReadReceiptRequested": boolean,
  "isRead": boolean,
  "isDraft": boolean,
  "webLink": string;
  "inferenceClassification": string;
  "body": {
    "contentType": string;
    "content": string;
  },
  "sender": {
    "emailAddress": {
      "name": string;
      "address": string;
    }
  },
  "from": {
    "emailAddress": {
      "name": string;
      "address": string;
    }
  },
  "toRecipients": {
    "emailAddress": {
      "name": string;
      "address": string;
    }
  }[],
  "ccRecipients": {
    "emailAddress": {
      "name": string;
      "address": string;
    }[],
    "bccRecipients": {
      "emailAddress": {
        "name": string;
        "address": string;
      }[],
      "replyTo": [],
      "flag": {
        "flagStatus": string;
      }
    }