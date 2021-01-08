import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD9E2YQKqpY5Xj3cFCkCttjlURISZKOtKU",
  authDomain: "hall2-iitk-website.firebaseapp.com",
  databaseURL: "https://hall2-iitk-website.firebaseio.com",
  projectId: "hall2-iitk-website",
  storageBucket: "hall2-iitk-website.appspot.com",
  messagingSenderId: "723626456019",
  appId: "1:723626456019:web:9331f6b1010d04c9773526",
};

firebase.initializeApp(config);

export default firebase;