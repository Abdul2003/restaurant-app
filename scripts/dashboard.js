//Import firebase built-in functions from firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
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
const auth = getAuth();
//Search parameter to get the parameter value from the URL
const params = new URLSearchParams(location.search);
const id = params.get("q");
//Add the clicked item to the user's cart
function addToCart(name, quantity, price, image) {
  //Check if a user is currently logged in
  onAuthStateChanged(auth, async (user) => {
    const db = getFirestore(app);
    const docRef = doc(db, "Cart", user.email);
    const docSnap = await getDoc(docRef);

    //Check if user exists in database
    if (docSnap.exists()) {
      //Update user's cart with new food item if the user's cart already exists in database
      updateDoc(docRef, {
        Items: arrayUnion({
          foodName: name,
          image: image,
          quantity: quantity,
          totalPrice: price,
        }),
      }).then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Added To Cart",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      //Create user cart and add food item if the user's cart does not exist in database
      setDoc(docRef, {
        Items: arrayUnion({
          foodName: name,
          image: image,
          quantity: quantity,
          totalPrice: price,
        }),
      }).then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Added To Cart",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  });
}
//Logout
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

//call function to fetch api and display data
getData();
async function getData() {
  //select radio buttons for food types
  const radioGroup = document.querySelectorAll('input[type="radio"]');
  //loop through radio buttons to check which radio button is currently checked
  for (let j = 0; j < radioGroup.length; j++) {
    if (id == radioGroup[j].value) {
      radioGroup[j].checked = true;
    }
    //when a user clicks on a radio button go to the following link with the radio button's value as a parameter of the url
    radioGroup[j].onclick = () =>
      (window.location = `dashboard.html?q=${radioGroup[j].value}`);
  }
  const response = await fetch(
    `https://free-food-menus-api-two.vercel.app/${id}`
  );
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    //For each data in the array create the following elements
    const container = document.getElementById("row-container");
    const column = document.createElement("div");
    column.classList.add("col", "d-flex", "justify-content-center");
    const card = document.createElement("div");
    card.classList.add("my-3", "card", "border-0");
    card.style.width = "18rem";
    card.style.Height = "30rem";
    const cardImg = document.createElement("img");
    cardImg.classList.add("imgCard");
    cardImg.src = data[i].img;
    cardImg.onerror = () => column.classList.add("d-none");
    cardImg.classList.add("card-img-top");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "mt-3", "bg-dark", "rounded-top", "rounded-bottom");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "text-light");
    cardTitle.innerHTML = data[i].name;
    const btnContainer = document.createElement("div");
    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "text-light");
    cardText.innerHTML = data[i].dsc;
    const cardBtn = document.createElement("a");

    cardBtn.classList.add("btn", "btn-warning");
    cardBtn.innerHTML = "Add To Cart";
    cardBtn.onclick = () =>
      //Call the "addToCart" function when a user clicks on the add to cart button
      addToCart(
        data[i].name,
        quantity.value,
        Math.floor(data[i].price * quantity.value),
        data[i].img
      );

    const inputRow = document.createElement("div");
    inputRow.classList.add("row", "mt-3");
    const inputCol = document.createElement("div");
    inputCol.classList.add(
      "col-sm-5",
      "col-md-6",
      "col-lg-5",
      "col-xl-5",
      "col-xxl-4",
      "col-7"
    );

    const quantity = document.createElement("input");
    quantity.classList.add("form-control");
    quantity.type = "number";
    quantity.placeholder = "QTY";
    quantity.defaultValue = 1;
    quantity.min = 1;
    quantity.max = 10;
    quantity.onchange = () =>
      (price.innerHTML = "$" + Math.floor(data[i].price * quantity.value));

    const priceCol = document.createElement("div");
    priceCol.classList.add(
      "col-sm-5",
      "col-md-6",
      "col-lg-5",
      "col-xl-5",
      "col-xxl-4",
      "col-7"
    );

    const price = document.createElement("h3");
    price.classList.add("text-light");
    price.innerHTML = "$" + Math.floor(data[i].price * quantity.value);

    container.appendChild(column);
    column.appendChild(card);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    btnContainer.appendChild(cardBtn);
    inputCol.appendChild(quantity);
    inputRow.appendChild(inputCol);
    priceCol.appendChild(price);
    inputRow.appendChild(priceCol);
    btnContainer.appendChild(inputRow);
    cardBody.appendChild(btnContainer);
  }
}
