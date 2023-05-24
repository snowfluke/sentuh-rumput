# Sentuh Rumput

Sentuh Rumput is a solution developed as a media for people to find a green open space for the use of space that can increase the quality of health in physically and mentally.

# Features

Sentuh rumput highlight some key essentials features such as:

- Register
- Search location
- See detail information
- Rate and reviews
- Personal recommendations
- Interactive maps
- Location submission
- Relaxation media
- Reports

# Installation

## General requirement

Software that needed:

- Node.js v16.16.0
  Download: https://nodejs.org/en/blog/release/v16.16.0/
- Visual Studio Code
  Download: https://code.visualstudio.com/Download
- Xcode (for Mac OS)
  Download: https://xcodereleases.com/
- Android Studio (for Linux, Mac Os dan Windows)
  Download: https://developer.android.com/studio
- Emulator/Real Device

Assuming Node.js already installed, check the version in terminal/cmd with the command:

```bash
node --version
```

Installing package manager `yarn` with command:

```bash
npm i -g yarn
```

## Developer account

Android development does not require a Google developer account, except when publishing on the Playstore, a Google Play Console account is required.

Reference: https://play.google.com/console/

## Environment setup

Reference: https://reactnative.dev/docs/environment-setup

### Windows

1.  Installing Java Development Kit (JDK 11)
    React Native recommends JDK version 8 or 11 with installation using `chocolatey`.

        Run the following command on cmd to install chocolatey:

        ```cmd!
        @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
        ```
        Reference: https://docs.chocolatey.org/en-us/choco/setup#non-administrative-install

        After success, close and reopen cmd and run the openjdk11 installation command with the command:

        ```cmd
        choco install -y openjdk11
        ```

2.  Installing Android Studio
    Make sure the following options are selected during installation: - Android SDK - Android SDK Platform - Android Virtual Device

        ![](https://i.imgur.com/Gh6Epk1.png)


        React Native requires SDK Android 12 (S). In Android Studio, select the __More Actions__ > __SDK Manager__ menu, select the __SDK Platforms__ tab and check the __Show Package Details__ section.

         Look for __Android 12 (S)__ and make sure to check:
        - Android SDK Platform 31
        - Intel x86 Atom_64 System Image atau Google APIs Intel x86 Atom System Image
        - Android SDK Build tools 31.0.0

3.  Settings the environtment variable

    ![](https://i.imgur.com/Hkeauy3.png)

- Open control panel
- Select **User Accounts** and select **User Accounts** back
- Select **Change my environtment variables**
- Select **New** and create variable **ANDROID_HOME** to the android SDK installation location. The location of the android SDK by default is:

```cmd
%LOCALAPPDATA%\Android\Sdk
```

- Still in **Change my environment variables** select **Path** then select **Edit** > **New**
- Add location of `platform-tools`
  by default is in:

```cmd
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

4.  Create emulator
    Open Android Studio and then select **Virtual Devices Manager**

        ![](https://i.imgur.com/A4rTZKk.png)

        Select the device type and Android type, then click next, the emulator installation is complete.

        ![](https://i.imgur.com/r0QZ9Q7.png)

### Linux

The development environment on Linux is not much different from Windows with the exception of the JDK installation which varies according to the existing distribution.

Arch-based distros:

```bash
pamac install jdk11-openjdk jre11-openjdk
```

Debian-based distros:

```bash
sudo apt install -y openjdk-11-jdk openjdk-11-jre
```

Then set the environment variables in `$HOME/.bash_profile` or `$HOME/.bashrc` (if uzing zsh is in `~/.zprofile` or `~/.zshrc`)

```bash
export ANDROID_SDK_ROOT=$HOME/Library/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### Mac OS

- Android
  Android development environment setup on Mac OS as it is on linux (using zsh).

## Importing project

Assuming that you have downloaded or done a `git clone` on the repository provided. Android studio and XCode can be closed and just running the emulator/simulator is enough.

### Linux dan Windows

- Opened the VSCode IDE
  Open the Project folder using VSCode
- Installation of dependencies
  Open a terminal in VSCode by selecting **View > Terminal** menu (Make sure it's cmd and not PowerShell open in Windows). Run the following command:
  ```bash
  yarn install
  ```

### Mac OS

- Android
  Same as on Linux and Windows

## Running debug

- Android
  Make sure the android emulator is running (see other sections for running on real device).
  Open two terminals on VSCode, run the following commands:
  Terminal 1:
  `bash
yarn start
`
  Terminals 2:
  `bash
yarn run android
`
  The build process takes 7-15 minutes depending on the specifications of the machine used.

        ![](https://i.imgur.com/0IukWkZ.png)

### Build status

Using CLI command, changing build state can run android command:

```
yarn run android --variant=release
```

# Credentials

You need to manually provide these 3 files due to .gitignore

1. google-service.json

Location to put: `android/app/google-service.json`. This file is downloaded when you're integrating with firebase.

2. webClientId.js

Location to put: `src/config/webClientId.js`. This file is required for Social SignIn with Google Account. The content of the file is as follow:

```js
export const WEB_CLIENT_ID = '*****.apps.googleusercontent.com';
```

You can get the `WEB_CLIENT_ID` from ` google-service.json`, look for `"client_type": 3`

2. googleMapsApi.js

Location to put: `src/config/googleMapsApi.js`. This file is required for using Google Maps.

```js
export const GOOGLE_MAPS_API_KEY = 'asdasdasdsd';
```

!! IMPORTANT !! DON'T FORGET TO PASS THE API AS WELL IN `AndroidManifest.xml`
