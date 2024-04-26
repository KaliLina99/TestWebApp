// Получаем объект Telegram.WebApp из глобального объекта window
let tg = window.Telegram.WebApp;
// Получаем кнопки "buy" и "order" из DOM
let buy = document.getElementById("buy");
let order = document.getElementById("order");
let errorElement = document.getElementById("error");

// Расширяем интерфейс Telegram
tg.expand();

// Обработчик события для кнопки "buy"
buy.addEventListener("click", () => {
    // Скрываем основной контент и отображаем форму при нажатии на кнопку "buy"
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
    // Устанавливаем значение имени пользователя в поле ввода имени из данных Telegram
    document.getElementById("user_name").value = tg.initDataUnsafe.user.first_name + " " + tg.initDataUnsafe.user.last_name;
});

// Обработчик события для кнопки "order"
order.addEventListener("click", () => {
    errorElement.innerText = ''; // Очищаем сообщение об ошибке

    // Получаем значения полей
    let name = document.getElementById("user_name").value.trim();
    let email = document.getElementById("user_email").value.trim();
    let phone = document.getElementById("user_phone").value.trim();

    // Проверка имени на пустое значение или некорректные символы
    if (!isValidName(name)) {
        showError("Введите корректное имя");
        return;
    }

    // Проверка электронной почты
    if (!isValidEmail(email)) {
        showError("Введите корректный адрес электронной почты");
        return;
    }

    // Проверка номера телефона
    if (!isValidPhone(phone)) {
        showError("Введите корректный номер телефона");
        return;
    }

    // Если все проверки пройдены, можно выполнять дальнейшие действия, например, отправку данных на сервер
    let data = {
        name: name,
        email: email,
        phone: phone
    }
    tg.sendData(JSON.stringify(data));
});

// Функция для проверки правильного формата имени
function isValidName(name) {
    // Простая проверка наличия символов в имени
    return name.length > 0;
}

// Функция для отображения ошибки
function showError(message) {
    errorElement.innerText = message;
}

// Функция для проверки правильного формата электронной почты
function isValidEmail(email) {
    // Регулярное выражение для проверки формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для проверки правильного формата номера телефона
function isValidPhone(phone) {
    // Регулярное выражение для проверки формата номера телефона
    const phoneRegex = /^\+?(\d{1,3})?[-. ]?(\d{3})[-. ]?(\d{3})[-. ]?(\d{2})[-. ]?(\d{2})$/;
    return phoneRegex.test(phone);
}
