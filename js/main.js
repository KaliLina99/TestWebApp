// Получаем объект Telegram.WebApp из глобального объекта window
let tg = window.Telegram.WebApp;
// Получаем кнопки "buy" и "order" из DOM
let buy = document.getElementById("buy");
let order = document.getElementById("order");

// Расширяем интерфейс Telegram
tg.expand();

// Обработчик события для кнопки "buy"
buy.addEventListener("click", ()=>{
    // Скрываем основной контент и отображаем форму при нажатии на кнопку "buy"
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
    // Устанавливаем значение имени пользователя в поле ввода имени из данных Telegram
    document.getElementById("user_name").value = tg.initDataUnsafe.user.first_name + " " + tg.initDataUnsafe.user.last_name;
});

// Обработчик события для кнопки "order"
order.addEventListener("click", () => {
    document.getElementById("error").innerText = '';
    // Получаем значения полей имени, электронной почты и телефона
    let name = document.getElementById("user_name").value;
    let email = document.getElementById("user_email").value;
    let phone = document.getElementById("user_phone").value;
 
    // Проверка формы при нажатии на кнопку "order"
    // Проверка имени на пустое значение
    if (name.trim() === "") {
        alert("Введите ваше имя");
        return; // Прерываем выполнение функции
    }

    // Проверка электронной почты на правильный формат
    if (!isValidEmail(email)) {
        alert("Введите корректный адрес электронной почты");
        return; // Прерываем выполнение функции
    }

    // Проверка номера телефона на правильный формат
    if (!isValidPhone(phone)) {
        alert("Введите корректный номер телефона");
        return; // Прерываем выполнение функции
    }

    // Если все проверки пройдены, можно выполнять дальнейшие действия, например, отправку данных на сервер
    let data = {
        name: name,
        email: email,
        phone: phone
    }
    tg.sendData(JSON.stringify(data));
});

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

tg.close();