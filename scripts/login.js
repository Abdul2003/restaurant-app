//Import firebase built-in functions from firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //Get value of email and password fields
  const email = loginForm["username"].value;
  const password = loginForm["password"].value;

  //Call firebase built-in function to login a user to the application
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      //Display success message upon successful login
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        window.location = "dashboard.html?q=bbqs";
      }, 1500);
      loginForm.reset();
    })
    .catch((error) => {
      //Display error message if login is not possible
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
});
