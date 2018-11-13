// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCR52OlgJH6HSk8KZ30y_l88FXv9-Z3z3w",
    authDomain: "nightlife-coordi-1538037506623.firebaseapp.com",
    databaseURL: "https://nightlife-coordi-1538037506623.firebaseio.com",
    projectId: "nightlife-coordi-1538037506623",
    storageBucket: "nightlife-coordi-1538037506623.appspot.com",
    messagingSenderId: "585156913174"
  },  
  apiUrl: location.hostname == 'localhost' ?  
  'http://localhost:8080/api/polls'  :  document.URL + 'api/polls'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
