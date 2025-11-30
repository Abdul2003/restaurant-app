//Import firebase built-in functions from firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

//Auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

//Run this function only when a user is logged in
onAuthStateChanged(auth, async (user) => {
  //Fetch cart data from firestore database
  const cartDocRef = doc(db, "Cart", user.email);
  const cartDocSnap = await getDoc(cartDocRef);

  if (cartDocSnap.exists()) {
    //Initialize array for storing the price of items in cart
    const arr = [];
    for (let i = 0; i < cartDocSnap.data().Items.length; i++) {
      const row = document.getElementById("row");
      const total = document.getElementById("total");
      //Push the prices of items to the array
      arr.push(cartDocSnap.data().Items[i].totalPrice);

      const sum = arr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      total.innerHTML = "$" + sum;
      //Create the following elements for each item in the cart
      const cardRow = document.createElement("div");
      cardRow.classList.add("row");
      const nameCol = document.createElement("div");
      nameCol.classList.add(
        "col-4",
        "gap-3",
        "d-flex",

        "align-items-center"
      );
      const cartImg = document.createElement("img");
      cartImg.src = cartDocSnap.data().Items[i].image;
      cartImg.style.width = "60px";
      cartImg.style.height = "60px";
      const itemName = document.createElement("p");
      itemName.innerHTML = cartDocSnap.data().Items[i].foodName;

      const quantityCol = document.createElement("div");

      quantityCol.classList.add(
        "col-4",
        "d-flex",
        "align-items-center",
        "justify-content-center"
      );
      const quantity = document.createElement("p");
      quantity.innerHTML = cartDocSnap.data().Items[i].quantity;

      const priceCol = document.createElement("div");
      priceCol.classList.add(
        "col-4",
        "d-flex",
        "align-items-center",
        "justify-content-center"
      );
      const price = document.createElement("p");
      price.innerHTML = "$" + cartDocSnap.data().Items[i].totalPrice;

      const seperatorColumn = document.createElement("div");
      seperatorColumn.classList.add("col-12");
      const line = document.createElement("hr");

      //Append child elements to their respective parents and finally to the parent element in the html file
      nameCol.appendChild(cartImg);
      nameCol.appendChild(itemName);
      quantityCol.appendChild(quantity);
      priceCol.appendChild(price);
      cardRow.appendChild(nameCol);
      cardRow.appendChild(quantityCol);

      cardRow.appendChild(priceCol);
      row.appendChild(cardRow);
      seperatorColumn.appendChild(line);
      row.appendChild(seperatorColumn);
    }
  }

  const button = document.getElementById("button");
  button.onclick = () => orderItems();
  async function orderItems() {
    //Delete the items in the cart when a user clicks on the "Order" button
    await deleteDoc(doc(db, "Cart", user.email));

    //Display Success pop-up message
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Order Placed",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(function () {
      window.location = "/dashboard.html?q=bbqs";
    }, 1500);
  }
});
//Logout user
const button = document.getElementById("logOut");
button.onclick = () => logOut();

function logOut() {
  signOut(auth).then(() => {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Logged Out",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(function () {
      window.location = "/login.html";
    }, 1500);
  });
}
