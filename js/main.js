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
    if (name.length < 5) {
        document.getElementById("error").innerText = 'Ошибка в Имени';
        return; // Прерываем выполнение функции
    }

    // Проверка электронной почты на правильный формат
    if (email.length < 5) {
        document.getElementById("error").innerText = 'Ошибка в Email';
        return; // Прерываем выполнение функции
    }
    // Проверка номера телефона на правильный формат
    if (phone.length < 5) {
        document.getElementById("error").innerText = 'Ошибка в номере телефона';
        return; // Прерываем выполнение функции
    }
    // Если все проверки пройдены, можно выполнять дальнейшие действия, например, отправку данных на сервер
    let data = {
        name: name,
        email: email,
        phone: phone
    }
    tg.sendData(JSON.stringify(data));

    tg.close();
});


