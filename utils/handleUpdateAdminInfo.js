const form = document.getElementById("updateAdminInformation");
const usernameInput = document.getElementById("admin_username");
const nameInput = document.getElementById("admin_name");
const phoneInput = document.getElementById("admin_phoneNumber");
const addressInput = document.getElementById("admin_address");
const emailInput = document.getElementById("admin_email");
const usernameError = document.getElementById("usernameError");
const nameError = document.getElementById("nameError");
const phoneNumberError = document.getElementById("phoneNumberError");
const addressError = document.getElementById("addressError");
const emailError = document.getElementById("emailError");
form.addEventListener("submit", (event) => {
  event.preventDefault();


  const username = usernameInput.value;
  const name = nameInput.value;
  const phoneNumber = phoneInput.value;
  const email = emailInput.value;
  const address = addressInput.value;


  let hasError = false;

  if (name) {
    nameError.innerText = "";
  } else {
    hasError = true;
    nameError.innerText = "Required";
  }

  if (username) {
    usernameError.innerText = "";
  } else {
    hasError = true;
    usernameError.innerText = "Required";
  }

  if (phoneNumber) {
    phoneNumberError.innerText = "";
  } else {
    hasError = true;
    phoneNumberError.innerText = "Required";
  }
  if (email) {
    emailError.innerText = "";
  } else {
    hasError = true;
    emailError.innerText = "Required";
  }
  if (address) {
    addressError.innerText = "";
  } else {
    hasError = true;
    addressError.innerText = "Required";
  }
  

  const data = {
    username,
    name,
    phoneNumber,
    email,
    address
  };

  console.log({ data });

  if (!hasError) {
    fetch("/account/updateAdminInformation", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => (window.location = "/account/detail"));
  }
});
