order.addEventListener("click", () => {
    const errorElement = document.getElementById("error");
    errorElement.innerText = ''; // Очищаем сообщение об ошибке

    const nameInput = document.getElementById("user_name");
    const emailInput = document.getElementById("user_email");
    const phoneInput = document.getElementById("user_phone");

    // Получаем значения полей
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Проверка имени
    if (name.length === 0) {
        errorElement.innerText = 'Введите ваше имя';
        nameInput.focus(); // Помещаем фокус на поле имени
        return;
    }

    // Проверка электронной почты
    if (!isValidEmail(email)) {
        errorElement.innerText = 'Введите корректный адрес электронной почты';
        emailInput.focus(); // Помещаем фокус на поле электронной почты
        return;
    }

    // Проверка номера телефона
    if (!isValidPhone(phone)) {
        errorElement.innerText = 'Введите корректный номер телефона';
        phoneInput.focus(); // Помещаем фокус на поле телефона
        return;
    }

    // Если все проверки пройдены, можно выполнять дальнейшие действия, например, отправку данных на сервер
    const data = {
        name: name,
        email: email,
        phone: phone
    };
    tg.sendData(JSON.stringify(data));

    // Закрываем Telegram
    tg.close();
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
