

let CartData = JSON.parse(localStorage.getItem("CartData")) || []

let cardlength=document.getElementById("cardlength")


let username = localStorage.getItem("username")
if(username==null){
  userId.innerText = "SIGN IN";
}else{
  userId.innerText = username;
  cardlength.innerText=CartData.length
}




const showFormRadio = document.getElementById("show-form");
const hideFormRadio = document.getElementById("hide-form");
const formContainer = document.getElementById("form-container");

showFormRadio.addEventListener("click", () => {
  formContainer.style.display = "block";
});

hideFormRadio.addEventListener("click", () => {
  formContainer.style.display = "none";
});

// formdata below

let Addform = document.getElementById("billForm");
let firstName = document.getElementById("Fname");
let lastname = document.getElementById("Lname");
let Email = document.getElementById("email");
let country = document.getElementById("country");
let Add = document.getElementById("Address");
let city = document.getElementById("city");
let pincode = document.getElementById("pincode");
let mobile = document.getElementById("mobile");

//event listner below =>

Addform.addEventListener("submit", (e) => {
  e.preventDefault();

  addressFormData();
});
let formDataArr = JSON.parse(localStorage.getItem("userform"))  || [];
//
//empty-Array

function addressFormData() {
  let formDataObj = {
    firstName: firstName.value,
    lastname: lastname.value,
    Email: Email.value,
    country: country.value,
    Address1: Add.value,
    city: city.value,
    pincode: pincode.value,
    mobile: mobile.value,
  };

  formDataArr.push(formDataObj);
  console.log(formDataArr)
  localStorage.setItem("userform", JSON.stringify(formDataArr));

  window.location.href = "../HTML/orderSucessPage.html"
}













