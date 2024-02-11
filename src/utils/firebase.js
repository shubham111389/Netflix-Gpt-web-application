// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbtNsiTEW5NTQgnKSxpIZjhA2VFEx0d3s",
  authDomain: "netflix-gpt-d9ad8.firebaseapp.com",
  projectId: "netflix-gpt-d9ad8",
  storageBucket: "netflix-gpt-d9ad8.appspot.com",
  messagingSenderId: "378527320100",
  appId: "1:378527320100:web:29bdea3a1fb461328530b1",
  measurementId: "G-921YL5VF7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);