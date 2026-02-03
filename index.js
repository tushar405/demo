
const loginBtn = document.querySelector(".btn");

const usernameInput = document.querySelector('#loginpage input[type="text"]');
const passwordInput = document.querySelector('#loginpage input[type="password"]');

const loginPage = document.getElementById("loginpage");
const withdrawPage = document.getElementById("withdrawpage");
const lastPage = document.querySelector(".last");

loginBtn.addEventListener("click", () => {
  if (usernameInput.value && passwordInput.value) {
    loginPage.style.display = "none";
    withdrawPage.style.display = "block";
  } else {
    alert("Please fill username and password");
  }
});


const transferBtn = document.querySelector("#withdrawpage button");

transferBtn.addEventListener("click", () => {
  withdrawPage.style.display = "none";
  lastPage.style.display = "block";
});
