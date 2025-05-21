const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Username atau password salah!");
  }
});
