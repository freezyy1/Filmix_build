// Попытайтесь получить данные из localStorage
const userData = localStorage.getItem('userData');

if (!userData) {
    window.location.href = 'forget.html';
}