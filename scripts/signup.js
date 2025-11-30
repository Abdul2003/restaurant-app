//Import firebase built-in functions from firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

//Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8q6OPklViilMN9r_SkUuzoSQIMIibzfI",
  authDomain: "simple-restaurant-app-3e054.firebaseapp.com",
  projectId: "simple-restaurant-app-3e054",
  storageBucket: "simple-restaurant-app-3e054.firebasestorage.app",
  messagingSenderId: "536340559721",
  appId: "1:536340559721:web:558313c3ba54ecbcc26ff8",
  measurementId: "G-4LFS8QVDK5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //Get value of email and password fields
  const email = signUpForm["username"].value;
  const password = signUpForm["password"].value;
  const confirmPassword = signUpForm["confirmPassword"].value;
  //Check if "password" and "confirm password" fields are equal
  if (confirmPassword != password) {
    Swal.fire({
      title: "Error",
      text: "Passwords Do Not Match",
      icon: "error",
    });
  }
  //Call firebase built-in function to create a user in the application
  
});
