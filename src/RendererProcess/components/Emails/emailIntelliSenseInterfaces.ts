
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
  }
}