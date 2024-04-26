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
