document.addEventListener("DOMContentLoaded", function () {


    const header = document.getElementById("header");

    header.innerHTML = `
<div class="header">
\t\t\t<div class="logo">
\t\t\t\t<div class="logo_text">
\t\t\t\t\t<h1><a href="../main.html">Filmix</a></h1>
\t\t\t\t\t<h2>Любовь к кино у нас в крови</h2>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div class="menubar">
\t\t\t\t<ul class="menu">
\t\t\t\t\t<li><a href="../main.html">Главная</a></li>\t
\t\t\t\t\t<li><a href="../films.html">Фильмы</a></li>
\t\t\t\t\t<li><a href="../serial.html">Сериалы</a></li>
\t\t\t\t\t<li><a href="../rating.html">Рейтинг фильмов</a></li>
\t\t\t\t\t<li><a href="../contact.html">Контакты</a></li>
\t\t\t\t</ul>
\t\t\t</div>
</div>
    `;
});