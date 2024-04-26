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


order.addEventListener("click", async (event) => {
    event.preventDefault(); // Предотвращаем стандартное действие кнопки (перезагрузку страницы)

    errorElement.innerText = ''; // Очищаем сообщение об ошибке

    // Получаем значения полей
    let name = document.getElementById("user_name").value.trim();
    let email = document.getElementById("user_email").value.trim();
    let phone = document.getElementById("user_phone").value.trim();

    let hasError = false; // Переменная для отслеживания наличия ошибок

    // Проверка на пустые значения всех трех полей
    if (name === "" && email === "" && phone === "") {
        showError("Введите данные в хотя бы одно поле");
        hasError = true;
    }

    // Проверка имени на пустое значение или некорректные символы
    if (!isValidName(name)) {
        showError("Введите корректное имя");
        hasError = true;
    }

    // Проверка электронной почты
    if (!isValidEmail(email)) {
        showError("Введите корректный адрес электронной почты");
        hasError = true;
    }

    // Проверка номера телефона
    if (!isValidPhone(phone)) {
        showError("Введите корректный номер телефона");
        hasError = true;
    }

    // Если есть ошибка, не отправляем данные
    if (hasError) {
        return;
    }

    // Если все проверки пройдены, можно выполнять дальнейшие действия, например, отправку данных на сервер
    let data = {
        name: name,
        email: email,
        phone: phone
    }

    try {
        // Отправляем данные на сервер Telegram WebApp
        await tg.sendData(JSON.stringify(data));
        // Если данные успешно отправлены, закрываем Telegram WebApp
        tg.close();
    } catch (error) {
        // Если произошла ошибка при отправке данных, показываем сообщение об ошибке
        showError("Ошибка при отправке данных. Пожалуйста, попробуйте еще раз.");
    }
});


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

// Функция для проверки правильного формата имени
function isValidName(name) {
    // Простая проверка наличия символов в имени
    return name.length > 0;
}
