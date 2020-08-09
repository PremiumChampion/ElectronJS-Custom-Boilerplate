# Configuration for your new electronjs app

## 1\. Configure your project

A. Edit the name of your product in [package.json](./package.json) and the title of the navigation-bar in the [renderer.ts](/src/renderer.ts):

```json
{
     "name": "YOUR_APP_NAME",
     "productName": "YOUR_APP_PRODUCT_NAME"
  }
```

```typescript
ReactDOM.render(React.createElement(TitleBar, { title: "YOUR_APP_NAME" }), document.querySelector("#TitleBar"));}
```

B. Edit Description of your project in [package.json](./package.json):

```json
{
    "description": "YOUR_APP_DESCRIPTION"
}
```

```typescript
ReactDOM.render(React.createElement(Footer, { text: "YOUR_FOOTER_TEXT } as FooterProps), document.querySelector("#Footer"));
```

C. Add author information to your project in the [package.json](./package.json) and hte application-footer in the [renderer.ts](/src/renderer.ts):

```json
{
"author": {

    "name": "YOUR_NAME",
    "email": "YOUR_EMAIL"
    }
}
```

D. Select youre license [(List of licenses)](https://spdx.org/licenses/):

```json
{
    "license": "YOUR_SELECTED_LICENSE"
}
```

E. Set your app icon:

```json
{
  "config": {

     "forge": {
         "packagerConfig": {
             "icon": "THE_PATH_TO_YOUR_APP_ICON"
         }
     }
  }
```

## 2\. Start writing your code

a. Set electron configuration in [index.ts](/src/index.ts).

**IMPORTANT: Do not turn on webSecurity when running** `npm run production` **,** `npm run make` **or** `npm run publish`**, as it will result in not showing your selected HTML-Site.**

b. To run code in WebContext use [renderer.ts](/src/renderer.ts).

c. Change the contents of the [index.html](/src/index.html) according to your needs.

d. You can add packages according to your needs with `npm i --save YOUR_PACKAGE_NAME` or if its a developement-tool with `npm i --save-dev YOUR_PACKAGE_NAME` .

## 3\. Connect to Microsoft-Services

### A. Register an Application in Azure ([Source](https://www.linkedin.com/pulse/create-electron-application-interact-sharepoint-using-raman))

Create \ Register an Azure Application and Grant the required permission. Follow the steps specified below to register a new application and assign the required permission.

1) Sign in to the Azure portal using tenant admin account.

If the account that is being used has access to more than one tenant, select the particular account in the top right corner, and set portal session to the Azure AD tenant that needs to be used.

2) In the left-hand navigation pane, select the Azure Active Directory service and then select App registrations > New registration.

Provide a name (Here its EmployeeRegisteration) and under Redirect URI enter `https://login.microsoftonline.com/common/oauth2/nativeclient`

Click Register.

![Registering an Application in Azure](img/readme/RegisterApplication.png)

3) Go to API permission and click on Add permission. Select Microsoft Graph option and then select Delegated Permission. Since we are requesting sign-in credentials from logged in user, we are selecting delegated permission. Select the necesarry permissions and click "Add permissions".

![Registering an Application in Azure](img/readme/ApiPermissions.png)

4) Go to Authentication, select 'Access Tokens' under Advance Settings -> Implicit Grant category & Click 'Save'.

![Registering an Application in Azure](img/readme/TenantInformation.png)

### B. Apply generated information to your project

In order to interact with the MicrosoftGraph during developement properly, create a file [.env](/.env). Add the following code and fill out the placeholders with the Information above:

```bash
REDIRECT_URL=<Your redirect url of the client>
TENANT_ID=<The id of your Microsoft tenant>
CLIENT_ID=<The id of your Client application>
RESOURCE=<The url of the resource>
```

## 4\. Interaction with the Microsoft Authentication

### A. Setup

In order to use the Microsoft Authenticatication import the [MicrosoftAuthenticationMain.ts](src/MainProcess/MicrosoftAuthenticationMain.ts) file into your [index.ts](src/index.ts):

```typescript
import "./MainProcess/MicrosoftAuthenticationMain";
```

In your renderer-process use the `MicrosoftAuthenticationProvider` class to interact with the microsoft authentication.

### B. Connect with Microsoft Graph

In order to generate a microsoft graph client add the folowing code. It creates a instance of the MicrosoftAuthenticationProvider which handles fetching the current accesstoken from the user. You can then interact with the graph as described [here](https://www.npmjs.com/package/@microsoft/microsoft-graph-client#4-make-requests-to-the-graph).

```typescript
import { Client, ClientOptions } from "@microsoft/microsoft-graph-client";

let clientOptions: ClientOptions = {
    authProvider: new MicrosoftAuthenticationProvider(),
};
const MSGraphClient = Client.initWithMiddleware(clientOptions);
```

### C. Login

To authenticate the user call the static `MicrosoftAuthenticationProvider.login()` method as shown in the example:

```typescript
MicrosoftAuthenticationProvider.login()
    .then(() => { console.info("Login successfull 👍"); })
    .catch(err => { 
        // An error has occurred or the user has aborted the login process
    })
```

### D. Logout

To give the user the option to log out call the static `MicrosoftAuthenticationProvider.logout()` method as shown in the example. This will call the official logout page from microsoft in the background and deauthenticates the user and deletes the current accesstokens.

```typescript
MicrosoftAuthenticationProvider.logout()
    .then(() => { console.info("Logout successfull 👍"); })
    .catch(err => { 
        // An error has occurred while the user logged out.
     })
```

## 5\. Rendering AdaptiveCards

### A. Ceate a class for your adaptive card item which extends the `BasicAdaptiveCardItem` interface.

```typescript
export class YOUR_CLASS_NAME implements BasicAdaptiveCardItem {

}
```

### B. Implement the interface `BasicAdaptiveCardItem`.

```typescript
export class eMail implements BasicAdaptiveCardItem {
    public toAdapticeCardItem() : any {
        return ({ }); // Here you return the object of your adaptive card item, and can fill it with dynamic values.
    }
}
```

### C. Create an instance of your BasicAdaptiveCard

<t> where T is the class created above</t>

```typescript
let card = new BasicAdaptiveCard<YOUR_CLASS_NAME>();
```

### D. Add your item/s to render using the `card.addItem(yourItem)` or `card.addItems(yourItemArray)` methods.

```typescript
card.addItem(new YOUR_CLASS_NAME()); // Adds one item
card.addItems([new YOUR_CLASS_NAME(),new YOUR_CLASS_NAME(),new YOUR_CLASS_NAME()]); // Adds three items
```

### E. Setup the AdaptiveCards library

```typescript
import MarkdownIt from "markdown-it";
import * as AdaptiveCards from "adaptivecards";

// Create an AdaptiveCard instance
let adaptiveCard = new AdaptiveCards.AdaptiveCard();

// Set its hostConfig property unless you want to use the default Host Config
// Host Config defines the style and behavior of a card
adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
    fontFamily: "Segoe UI, Helvetica Neue, sans-serif",
});

// Support for converting markdown in html
AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text: string, result: AdaptiveCards.IMarkdownProcessingResult) => {
    result.outputHtml = MarkdownIt().render(text); // Handle custom markdown rendering using MarkdownIt package 
    result.didProcess = true;
}

// Parse the card
adaptiveCard.parse(card.toAdaptiveCard());

// render the card
adaptiveCard.render();

// grab the generated the html output
let renderedAdaptiveCard = adaptiveCard.renderedElement.outerHTML;

// do your rendering stuff here
```

## 6\. Custom Notifications

### A. Setup the notifications in the main-process

In order to use custom notifications import the [notificationApiInternalMain.ts](src/Notifications/notificationApiInternalMain.ts) file into your [index.ts](src/index.ts):

```typescript
import "./Notifications/notificationApiInternalMain";
```

### B. Display a information notification

To generate a information notification call this method with custom parameters

```typescript
CustomNotification.createInformationNotification("Example Title", "This is my message");
```

### C. Get Text-UserInput from notification

Ask the user for text input.

```typescript
CustomNotification.getTextInputFromNotification("Example Title", "This is my message",
    {
        inputOptions: {
            placeholder: "Bitte gebe einen Text ein", // The placeholder of the textfield (mandatory)
            regex: / /, // (optional)
            validationErrorMessage: "This is a error message..." //The message shown to the user if the entered text does not match the regex value (optional)
        } as iTextInputOptions,
        submitButtonLabel: "Submit", // The label of the submit button if shown
        type: null,
        requireInput: false // Allow the user to close the notification?
    } as iCustomAction
)
    .then((response: string)=>{
        // the text entered by the user
    })
    .catch((err: CustomError) => { 
        console.log(err.getErrorMessage());
    });
```

### D. Get Boolean-UserInput from notification

Ask the user to answer `Yes` or `No` on a specific question.

```typescript
CustomNotification.getBooleanInputFromNotification("Example Title", "Sind die Notifications cool?",
    {
        inputOptions: {
            displayType: BooleanDisplayType.Buttons, // The input type of the YES/NO fields Abailable: BooleanDisplayType.Buttons | BooleanDisplayType.DropDown | BooleanDisplayType.Toggle
            falseLabel: "Nein", // the label of the false input
            trueLabel: "Ja" // the label of the true input
        } as iBooleanInputOptions,
        submitButtonLabel: "Submit", // the label of the submit button
        type: null,
        requireInput: false // Allow the user to close the notification?
    } as iCustomAction
)
    .then((response: boolean)=>{
        // the value selected by the user
    })
    .catch((err: CustomError) => { 
        console.log(err.getErrorMessage()); 
    });
```

### E. Get Choice-UserInput from notification

Ask the user to select one of the given options.

```typescript
CustomNotification.getChoiceInputFromNotification("Example Title", "This is my message",
    {
        inputOptions: {
            options: [ // The options for the user to choose from. The key value MUST be unique | The text value is the label of this specific option.
                { key: "A", text: "A" },
                { key: "B", text: "B" },
                { key: "C", text: "C" },
                { key: "D", text: "D" },
                { key: "E", text: "E" },
                { key: "F", text: "F" }
            ]
        } as iChoiceInputOptions,
        submitButtonLabel: "Submit", // the label of the submit button
        type: null,
        requireInput: false // Allow the user to close the notification?
    } as iCustomAction
)
    .then((response: {key: string, text: string})=>{
        // the option selected by the user
    })
    .catch((err: CustomError) => { 
        console.log(err.getErrorMessage());
    });
```

## 7\. Window-Api

### A. Setup

In order to use custom notifications import the [windowApiMain.ts](src/MainProcess/windowApiMain.ts) file into your [index.ts](src/index.ts):

```typescript
import "./MainProcess/windowApiMain";
```

### B. Close

To close the aplication call the `windowApiRenderer.close()` method:

```typescript
windowApiRenderer.close()
```

### C. Hide

To minimize the aplication call the `windowApiRenderer.hide()` method:

```typescript
windowApiRenderer.hide()
```

### D. Maximize

To maximize the aplication call the `windowApiRenderer.maximize()` method:

```typescript
windowApiRenderer.maximize()
```

### E. Shrink the application

To shrink the aplication call the `windowApiRenderer.minimize()` method:

```typescript
windowApiRenderer.minimize()
```

### F. Toggle Developer-Toolbar

To toggle the developer toolbar call `devApiRenderer.toggleDeveloperBar()` method:

```typescript
devApiRenderer.toggleDeveloperBar()
```

### G. Query if the window is maximised

To query if the application is maximised await the `windowApiRenderer.getWindowSize()` method:

```typescript
windowApiRenderer.getWindowSize()
    .then((isMaximised: boolean) => {
        // TRUE if the window is maximised | FALSE if the window is not maximised
    })
    .catch((err: CustomError) => {
        // the main process did not respond in time
    });
```