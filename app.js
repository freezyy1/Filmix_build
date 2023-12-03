const express = require('express');
const validator = require('validator');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/templates/main.html', (req, res) => {
  res.sendFile(__dirname + '/templates/main.html');
});

app.post('/saveData', (req, res) => {
  const newData = req.body;
  let jsonData = [];

  // Чтение существующих данных из файла (если они есть)
  try {
    jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  } catch (error) {
    console.error('Error reading data.json:', error);
  }

  // Проверяем, нет ли уже данных с таким же email или username

  const existingEmail = jsonData.find(
    (item) => item.email === newData.email
  );

  const existingUsername = jsonData.find(
    (item) => item.username === newData.username
  );

  if (existingEmail) {
    return res.status(400).json({ message: 'Почта пользователя уже существуют' });
  }

  if (existingUsername) {
    return res.status(400).json({ message: 'Имя пользователя уже существуют' });
  }


  // Проверка, что email является действительным
  if (!validator.isEmail(newData.email)) {
    return res.status(400).json({ message: 'Введите корректный email' });
  }

  // Проверка, что username состоит только из латинских букв, цифр и специальных знаков
  if (!/^[a-zA-Z0-9-_]+$/.test(newData.username)) {
    return res.status(400).json({ message: 'Имя может состоять только из латинских букв, цифр, и специальных знаков' });
  }


  // Добавление новых данных
  jsonData.push(newData);

  // Запись обновленных данных обратно в файл
  fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2), 'utf-8');

  res.redirect('/templates/main.html');
});

app.post('/login', (req, res) => {
    const { username, password, email } = req.body;
    try {
      const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  
      // Поиск пользователя с совпадающими данными
      const user = jsonData.find((user) => user.username === username && user.password === password && user.email === email);
      if (user) {
        return res.json({ message: 'Success' });
      }
    } catch (error) {
      console.error('Error reading data.json:', error);
    }
    // Если пользователь не найден или произошла ошибка, отправить сообщение об ошибке
    res.status(400).json({ message: 'Invalid credentials' });
});

// Обработчик ошибки для несуществующих маршрутов
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/templates/unknown.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
