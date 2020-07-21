<h1 align="center">Hell-O chat App</h1>
<p align="center">
  <img width="250" src="./image/logo2.png"/>
</p>
<h3 align="center">
  Lets Start with Chat..
</h3>

## Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Setup firebase Config](#setup-firebase-config)
- [Usage](#usage-for-development)
- [Screenshots](#screenshots)
- [Download APK](#release-apk)
- [Contributors](#contributor)

## Introduction
this app built with React Native and  Google Firebase , Firebase Authentication , and Firebase Storage for save image . with Hell-O chat make us know a lot of people. and with online feature , we can know toher people stay on app(online) or offline. we can find our frined location and sharing location.

## Features
1. Users login or register if don't have account
2. Users can chat with other poeple in App.
3. Users can share his Location to other
4. User can know friends Location
5. Users can change profile data.

## Requirements

1. Node_modules `npm install` or `yarn install`
2. [`react-native`](https://facebook.github.io/react-native/docs/getting-started)
3. `Google maps API Key` you can get it [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Setup Firebase Config
if you run this app for development,Open setting in your firebase app, click general, copy your Firebase SDK snippet
paste to src/utils/firebaseConfig.js, 
```
const firebaseConfig = {
  apiKey: "YOUR_apiKey",
  authDomain: "YOUR_authDomain",
  databaseURL: "YOUR_databaseURL",
  projectId: "YOUR_projectId",
  storageBucket: "YOUR_storageBucket",
  messagingSenderId: "YOUR_messagingSenderId",
  appId: "YOUR_appId",
  measurementId: "YOUR_measurementId"
};
```

## Usage for development

1. Clone this Project 
2. Open app's directory in CMD or Terminal
3. Type `npm install` or `yarn install`
4. [Setup firebase Config](#setup-firebase-config)
5. Add your goole maps API Key on `AndroidManifest.xml` 
```
  <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_API_KEY"/>
  ```
6. Type `react-native run-android` or `yarn run android` if you use yarn
7. Register your account
8. Login to use
9. Lets Chat!



## Setting Google Maps 
 
## Screenshots
<div align="center">
  <img width="150" src="./src/assets/screenshot/Screenshot_20200629-211416_Hell-O Chat.jpg">
  <img width="150" src="./src/assets/screenshot/Screenshot_20200630-114809_Hell-O Chat.jpg">
  <img width="150" src="./src/assets/screenshot/Screenshot_20200628-105012_Hell-O Chat.jpg">

</div>
<div align="center">
  <img width="150" src="./src/assets/screenshot/Screenshot_20200628-105033_Hell-O Chat.jpg">
  <img width="150" src="./src/assets/screenshot/Screenshot_20200630-112900_Hell-O Chat.jpg">
  <img width="150" src="./src/assets/screenshot/Screenshot_20200630-112850_Hell-O Chat.jpg">
  <img width="150" src="./src/assets/screenshot/Screenshot_20200629-211514_Hell-O Chat.jpg">

</div>

## Release APK
<a href="https://bit.ly/3fPsS9N">
  <img src="https://img.shields.io/badge/Download%20on%20the-Google%20Drive-blue.svg?style=popout&logo=google-drive"/>
</a>


## Contributor
© [Dwiky Satria Hutomo](https://github.com/dwikysahut 'Dwiky Satria Hutomo')
