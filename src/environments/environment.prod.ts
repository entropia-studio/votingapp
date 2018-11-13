export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCR52OlgJH6HSk8KZ30y_l88FXv9-Z3z3w",
    authDomain: "nightlife-coordi-1538037506623.firebaseapp.com",
    databaseURL: "https://nightlife-coordi-1538037506623.firebaseio.com",
    projectId: "nightlife-coordi-1538037506623",
    storageBucket: "nightlife-coordi-1538037506623.appspot.com",
    messagingSenderId: "585156913174"
  },
  apiUrl: location.hostname == 'localhost' ?  
  'http://localhost:8080/api/polls'  :  location.protocol + location.hostname + '/api/polls'  
};
