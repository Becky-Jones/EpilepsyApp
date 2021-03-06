# EpilepsyApp

## Running mobile application
### Extensions which need installing
- Auto Close Tag
- Auto Complete Tag
- Auto Rename Tag
- Babel Javascript
- Colour Highlight
- ESLint
- Flow Language Support
- Git Blame
- Prettier
- MongoDB for VSCode
- React Native Tools

### Install required dependencies
running 'npm install' should install all of the required dependencies, if there are some missing the below are the install commands.  

### Install react native app
npm install -g react-native-app
npm install -g yarn

### Install dependencies
npm install react-router-dom --save
npm install react-navigation
npm install react-screens react-native-screens
npm install @react-navigation/native-stack
npm install react-native-uuid
npm install nodemon
npm install @react-native-community/datetimepicker --save
npm install react-native-dropdown-picker
npm install react-native-chart-kit

### Install react native cli and expo cli
npm install -g react-native-cli
npm install -g expo-cli

### Install table. Info here: https://www.npmjs.com/package/react-native-simple-table
npm install react-native-simple-table --save

### To run the app
Run npm run-script build to build the dist folder which is needed for the backend routes to work with the front end. If this fails, comment out this line in the tsconfig.json file -   "extends": "expo/tsconfig.base"

Then run npm run-script build and it should build the dist folder successfully. To run the tests, run 'npm test' - this will run the jest task and run the unit tests.

Run npm start to start both the backend server and the frontend on expo - you might have to run it from the cmd window but it must be located in the app (i.e. EpilepsyApp).

### To get it on your phone
install an app called Expo (expo go on andriod). Then you scan the QR code which is either printed on your cmd terminal or on your local host which should automatically load when you start the app. This will then show the app on your phone!
