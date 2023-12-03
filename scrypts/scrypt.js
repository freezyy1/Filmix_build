const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}
document.getElementById("submit-button").addEventListener("click", function() {
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var userData = {
    email: email,
    username: username,
    password: password
  };

  // Отправка данных на сервер
  fetch('/saveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.status === 400) {
      return response.json().then(data => {
        alert(data.message); // Ошибка, вы можете обработать ее здесь
      });
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "templates/main.html"; // Редирект в случае успеха
  });
});
