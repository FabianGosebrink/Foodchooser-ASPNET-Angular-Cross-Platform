# ASP.NET // Webpack // Angular2 // Typescript // Cross Platform - Project "Foodchooser" 

> Get the Android SDK here [Android SDK](https://developer.android.com/sdk/index.html/ "Android SDK")  
> Get the Windows SDK here [Windows SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk "Windows SDK")

> Make sure you have installed <br/>
> Typescript compiler: `tsc -v` = Version 1.8.10 <br/>
> Npm: `npm -v` = 2.15.1 <br/>
> Node `node -v` = v4.4.4 <br/>
> Cordova: `cordova -v` = 6.1.1  <br/>

### In this repository we have done an example app with 

* Angular 2
* Typescript
* Bootstrap
* Automapper
* WebPack
* ASP.NET WebAPI 2.2
* Gulp.js
* NPM 
* Azure

### to make it cross platform, which means its working as an exe, as an app on phones and as a web application.

### This is done with

* Cordova (for the Apps)
* Electron (for the exe)
* Gulp (for the web application)
* WebPack (for the web application)
* ASP.NET WebAPI (for the backend)

### Feel free to add gulp tasks as you want :)

## This is the Angular 2 Version of the Foodchooser-Example. Find the Angular 1 Version here: [Angular1 Version](https://github.com/FabianGosebrink/ASPNET-Foodchooser-Cross-Platform-Angular1 "Foodchooser - ASP.NET WebAPI AngularJs Cross Platform")

# Start

Navigate to the "Client"-Folder and type in 
```
npm install
```
and
```
tsc
```
to install all dependencies and run 

```
npm start
```
and browse to "localhost:8080" to start the application.

![Alternativtext](_gitAssets/webpack-server.png "GulpTasks")

If you want to start right ahead with the gulp tasks listed below just make sure you ran the <pre>tsc</pre> command in the client folder first.

# Gulp

Navigate to the "Client"-Folder and type in 
```
gulp
```
 to get a ist of all the tasks available

![Alternativtext](_gitAssets/gulpTasks.png "GulpTasks")

With <pre>gulp build:all</pre> you can build all variations the repository brings. A <pre>.dist</pre>-Folder will be created containing all outputs.

![Alternativtext](_gitAssets/distFolder.png "DistFolder")

#Screenshots

## Cordova-Project in Visual Studio
![Alternativtext](_gitAssets/cordova.png "Cordova")

## Windows 8.1 App
![Alternativtext](_gitAssets/win81.png "Windows81")

## Windows 10 Mobile
![Alternativtext](_gitAssets/winMobile.png "WinMobile")

## Windows 10
![Alternativtext](_gitAssets/win10.png "Windows10")

## Android (Appetize.io)
![Alternativtext](_gitAssets/android_appetize.png "Android")

## Executable (Electron)
![Alternativtext](_gitAssets/electron.png "Electron")

## Web
![Alternativtext](_gitAssets/web.png "Web")

