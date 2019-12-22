# Faster Development Environment

This document was created to change development process for our current UI development process, to make it better and faster.

6 months ago when I joined the FLO team, making **single** Component/Style change in FLO Experiment Designer take 5 to 10 minutes to see the result 😴 (Build UI -> Rebuild Solution -> Run Backend Server) because the development process use Backend Server to serve UI.

---------------------
## Different Server
---------------------
With the problem stated above, I decide to use proxy so node server (UI) can run outside the backend server, and making changes more painless.

Before we started to proxying something, we have to make sure a better understanding about what are we going to make and how we make it better. 

Using React, we have to distinguish between Production and Development mode. Production mode only serve a single static bundled folder that already optimized, hashed and minified by webpack. But in Development mode, the node is serving dynamic and debug-able file which is very sensitive with changes (Live Reload, Hot Reload, etc).


### **React Scripts 1.1 (Creact-React-App)**

The old version of FLO is using CRA v 1.1. We can use this changes to set the proxy for our UI server.

Place this code inside *devServer* bracket in **webpack.config.js**

```javascript
proxy: {
          '/api': {
              target: 'http://localhost:5005' //Backend Port
          },
          '/hub': {
              target: 'http://localhost:5005', //Backend Port
              ws: true // Websocket Support
          }
       }
```


### **React Script 3.0**

In FLO New UI, we use CRA 3 and already implement all of this item below :

In React Script 3.0 you cannot use webpack.config.js or package.json to manually connect proxy because it is deprecated, so we have to install third party library http-proxy-middleware

```javascript
npm install http-proxy-middleware --save
```

Then, create **setupProxy.js** file inside *src* folder.



```javascript
/*setupProxy.js*/
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:5005/' }));
    app.use(proxy('/hub', { target: 'http://localhost:5005/', 
    ws: true }));
};
```


----------------------
## Hot Reload/ Live Reload
----------------------
After changing the proxy, we have to figure it out how we can make our development process faster. 

### **React Scripts 1.1**

Hot Reload cannot be achieved using CRA 1.1 without **eject**ing, but at least we can see our changes with refreshing our browser.

- **CODE**

replace package.json code :
```
"build": "webpack",
```
with 
```
"build": "webpack --watch",
```
**Don't ever push this code into repository, just use it in your local**

- **RUN**

Run the backend server (FloWebServer.exe) and do in terminal
```
npm run start && npm run build
```

Go to http://localhost:2507 (or any port defined in devServer) 

Everytime we make changes, just refresh the page.

### **React Scripts 3.0**

CRA is only support Live Reload, not Hot Reload [see the difference ](https://stackoverflow.com/questions/41428954/what-is-the-difference-between-hot-reloading-and-live-reloading-in-react-native) . To approach a hot reload, we have to add react-app-rewired-hot-loader 

react-app-rewired 

1. Install react-app-rewired-hot-loader :
```javascript
npm install --save react-app-rewired
npm install --save react-hot-loader
npm install --save react-app-rewire-hot-loader
```

2. In the config-overrides.js of the root of your project you created for react-app-rewired add this code:
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

```javascript
/* config-overrides.js */
module.exports = function override (config, env) {
  config = rewireReactHotLoader(config, env)
  return config
}
```

3. Mark your root component as hot-exported:

```javascript
import React from 'react'
import { hot } from 'react-hot-loader/root'

const App = () => <div>Hello World!</div>

export default process.env.NODE_ENV === "development" ? hot(App) : App
```

4. Replace 'react-scripts' with 'react-app-rewired' in package.json
```javascript
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app-rewired eject"
  },
  ```

5. Start the server :
```
npm start              //to start
OR
npm run build          //to build into static file
```

----------------------
## Debug using VS Code
----------------------
To debug the client side React code, we'll need to install the (Debugger for Chrome)[https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome] extension. You can find it in VS Code Marketplace (Ctrl+Shift+X), search "Debugger for Chrome"

![debugger for chrome](https://code.visualstudio.com/assets/docs/nodejs/reactjs/debugger-for-chrome.png)

Click install.

After installed, press Ctrl+Shift+D, click the Gear Icon 


![Debugger](https://code.visualstudio.com/assets/docs/nodejs/reactjs/debug-variable.png)

Choose Chrome from the Select Environment drop-down list. This will create a launch.json file in a new .vscode folder in your project which includes a configuration to launch the website.

We need to make one change for our example: change the port of the url from 8080 to 3000. Your launch.json should look like this:

```javascript
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Don' forget to start your server before use the debugging feature. Set breakpoint in your code, click the Play icon on debugger, now your IDE become your Inspect Element panel.