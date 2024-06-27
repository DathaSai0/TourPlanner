const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const passwordele = document.getElementById("password");
const registerTagele = document.getElementById("registerTag");
const loginTagele = document.getElementById("loginTag");
const logincontainerele = document.getElementById("login-container");
const registercontainerele = document.getElementById("register-container");
const usernameinput = document.getElementById("username");
const registeremailinput = document.getElementById("register-email");
const registerpasswordinput = document.getElementById("register-password");
const reregisterpasswordinput = document.getElementById("re-register-password");
const nameErrele = document.getElementById("nameErr");
const emailErrele = document.getElementById("emailErr");
const passwordErrele = document.getElementById("passwordErr");
const RepasswordErrele = document.getElementById("RepasswordErr");
function formValidation(e) {
  e.preventDefault();
  const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const regpassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  let isRigistered = true;
  if (usernameinput.value.length < 3) {
    nameErrele.style.visibility = "visible";
    isRigistered = false;
  } else {
    nameErrele.style.visibility = "hidden";
  }
  if (!regExp.test(registeremailinput.value)) {
    emailErrele.style.visibility = "visible";
    isRigistered = false;
  } else {
    emailErrele.style.visibility = "hidden";
  }
  if (!regpassword.test(registerpasswordinput.value)) {
    passwordErrele.style.visibility = "visible";
    isRigistered = false;
  } else {
    passwordErrele.style.visibility = "hidden";
  }
  if (registerpasswordinput.value !== reregisterpasswordinput.value) {
    RepasswordErrele.style.visibility = "visible";
    isRigistered = false;
  } else {
    RepasswordErrele.style.visibility = "hidden";
  }

  if (isRigistered) {
    let userObj = {
      userName: usernameinput.value,
      userEmail: registeremailinput.value,
      userPassword: registerpasswordinput.value,
    };
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    userData.push(userObj);
    localStorage.setItem("userData", JSON.stringify(userData));
    usernameinput.value = "";
    registeremailinput.value = "";
    registerpasswordinput.value = "";
    alert("You are succesfully registered");
    registercontainerele.style.display = "none";
    logincontainerele.style.display = "block";
  }
}
registerBtn.addEventListener("click", formValidation);
registerTagele.addEventListener("click", (e) => {
  logincontainerele.style.display = "none";
  registercontainerele.style.display = "block";
});
loginTagele.addEventListener("click", (e) => {
  registercontainerele.style.display = "none";
  logincontainerele.style.display = "block";
});

// login section
const loginemail = document.getElementById("email");
const loginpassword = document.getElementById("password");
function checkUser(e) {
  e.preventDefault();
  let userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  let userLogin = false;
  for (obj of userData) {
    if (
      obj.userEmail === loginemail.value &&
      obj.userPassword === loginpassword.value
    ) {
      userLogin = true;
    }
  }
  localStorage.setItem("userLogin", JSON.stringify(userLogin));
  if (userLogin) {
    alert("user logged in successfully..");
    loginemail.value = "";
    loginpassword.value = "";
    window.location.href = "index.html";
  } else {
    alert("login credentials are incorrect..");
  }
}
loginBtn.addEventListener("click", checkUser);
