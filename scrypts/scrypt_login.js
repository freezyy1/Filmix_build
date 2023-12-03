const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

document.getElementById("registration-form").addEventListener("submit", function (e) {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var userData = {
    email: email,
    username: username,
    password: password,
  };
  // Отправка данных на сервер для аутентификации
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json()) // Преобразуйте ответ в JSON
  .then(data => {
    alert(data.message);
    if (data.message === 'Success') {
      // Перенаправление на main.html при успешной аутентификации
      localStorage.setItem("userData", JSON.stringify(userData));
      window.location.href = 'main.html';
    } else {
      alert('Invalid credentials. Please check your data.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later. ' + error.message);
  });  
});
  
  