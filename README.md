# Contributions

After pulling the repo from GitHub, follow these steps:

## Configuring MongoDB

Create an config.js file in the backend/ directory and add your MongoDB credentials in the following format:

```js
const config = {
  user: "<your-mongodb-user>",
  password: "<your-mongodb-user-password>",
  cluster: "<your-mongodb-cluster>",
  database: "<your-mongodb-database>",
};
const uri = `mongodb+srv://${config.user}:${config.password}@${config.cluster}/${config.database}?authSource=admin&ssl=true`;
const jwtKey =
  "lasbawQtxkdYertgwJG4pb5rNLCtmD41OCablLBdEnonMRFlO3kjwXlqc2iMdjj5c4Q0JZq";

const notifications = {
  newUser: (name) => `Hello ${name}, Welcome to Kariyasemmal!`,
};
module.exports = { config, uri, jwtKey, notifications };
```

## Configuring Firebase

Create an environment.ts and environment.prod.ts file in the src/environments directory and add the following code:

`environment.ts`

```ts
export const environment = {
  production: false,
  baseURL: "http://localhost:3000/api/v1",
  baseWsURL: "ws://localhost:3000/api/v1",
  firebase: {
    apiKey: "<your-api-key>",
    authDomain: "<your-auth-domain>",
    projectId: "<your-project-id>",
    storageBucket: "<your-storage-bucket>",
    messagingSenderId: "<your-messaging-sender-id>",
    appId: "<your-app-id>",
    measurementId: "<your-measurement-id>",
  },
};
```

`environment.prod.ts`

```ts
export const environment = {
  production: true,
  baseURL: "/api/v1",
  baseWsURL: `wss://${location.host}/api/v1`,
  firebase: {
    apiKey: "<your-api-key>",
    authDomain: "<your-auth-domain>",
    projectId: "<your-project-id>",
    storageBucket: "<your-storage-bucket>",
    messagingSenderId: "<your-messaging-sender-id>",
    appId: "<your-app-id>",
    measurementId: "<your-measurement-id>",
  },
};
```

Replace the placeholders with your Firebase project's information.

## Running the Application

Run the following commands in the terminal:

1. `npm i` - for installing the required packages
2. `npm run backend` - for the backend server
3. `npm start` - open a new terminal tab and run this for the frontend dev server

The backend server will start at http://localhost:3000 and the frontend development server will start at http://localhost:4200.

## Deploying

Just, run `npm run deploy`!
