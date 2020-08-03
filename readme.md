# Configuration for your new electronjs app

1. Edit the name of your product in [package.json](./package.json) and the title of the [index.html](/src/index.html):

  ```json
  {
     "name": "YOUR_APP_NAME",
     "productName": "YOUR_APP_PRODUCT_NAME"
  }
  ```

  ```html
  <head>
     <title>YOUR_APP_NAME</title>
  </head>
  ```

2. Edit Description of your project in [package.json](./package.json):

```json
{
    "description": "YOUR_APP_DESCRIPTION"
}
```

1. Add author information to your project in the [package.json](./package.json):

```json
{
"author": {

    "name": "YOUR_NAME",
    "email": "YOUR_EMAIL"
    }
}
```

1. Select youre license [(List of licenses)](https://spdx.org/licenses/):

```json
{
    "license": "YOUR_SELECTED_LICENSE"
}
```

1. Set your app icon:

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

2. Start writing your code:

    a. Set electron configuration in [index.ts](/src/index.ts).

    **IMPORTANT: Do not turn on webSecurity when running** `npm run production` **,** `npm run make` **or** `npm run publish`**, as it will result in not showing your selected HTML-Site.**

    b. To run code in WebContext use [renderer.ts](/src/renderer.ts).

    c. Change the contents of the [index.html](/src/index.html) according to your needs.

3. You can add packages according to your needs with `npm i --save YOUR_PACKAGE_NAME` or if its a developement-tool with `npm i --save-dev YOUR_PACKAGE_NAME` .

4. In order to interact with the MicrosoftGraph during developement properly, create a file [.env](/.env). Add the following code and fill out the placeholders:

```bash
REDIRECT_URL=<Your redirecht url of the client>
TENANT_ID=<The id of your Microsoft tenant>
CLIENT_ID=<The id of your Client application>
RESOURCE=<The id of the resource>
```
