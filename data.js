//Прибирає червону рамку неправильного введення
function clearErrors() {
    var errorFields = document.querySelectorAll('.error');
    errorFields.forEach(function (field) {
        field.classList.remove('error');
    });
}
function validateForm(data) {
//Перевірка на розмірність і заповнення строк
    //ПІБ
    if (data.fullName != null && data.fullName.value.length < 3 )
    {
    alert('Поле "ПІБ" незаповнене або містить недостатньо символів');
    data.fullName.classList.add('error');
    return false;}
    else{
        clearErrors();
    }
    
    //Група
    if (data.group != null && data.group.value.length < 3)
    {
    alert('Поле "Група" незаповнене або містить недостатньо символів');
    data.group.classList.add('error');
    return false;}
    else{
        clearErrors();
    }
    
    //Факультет
    if(data.faculty != null && data.faculty.value.length < 3)
    {
    alert('Поле "Факультет" незаповнене або містить недостатньо символів');
    data.faculty.classList.add('error');
    return false;}
    else{
        clearErrors();
    }

    //Адреса
    if(data.address != null && data.address.value.length < 3)
    {
    alert('Поле "Адреса" незаповнене або містить недостатньо символів');
    data.address.classList.add('error');
    return false;}
    else{
        clearErrors();
    }

    //Телеграм
    if(data.telegram != null && data.telegram.value.length < 3)
    {
    alert('Поле "Адреса" незаповнене або містить недостатньо символів');
    data.telegram.classList.add('error');
    return false;}
    else{
        clearErrors();
    }
//Перевірка на правильність введення
    // ПІБ (ТТТТТТ Т.Т.)
    var fullNamePattern = /^[А-ЯІЇЄҐ]{1}[а-яіїєґ']{1,}\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/;
    if (!fullNamePattern.test(data.fullName.value)) {
        alert('ПІБ має бути у форматі: ТТТТТТ Т.Т.');
        data.fullName.classList.add('error');
        return false;
    }
    else{
        clearErrors();
    }

    // Група (ТТ-ЧЧ)
    var groupPattern = /^[А-ЯІЇЄҐ]{2}-[0-9]{2}$/;
    if (!groupPattern.test(data.group.value)) {
        alert('Група має бути у форматі: ТТ-ЧЧ');
        data.group.classList.add('error');
        return false;
    }
    else{
        clearErrors();
    }

    // Факультет (ТТТТ)
    var facultyPattern = /^[А-ЯІЇЄҐ]{4}$/;
    if (!facultyPattern.test(data.faculty.value)) {
        alert('Факультет має бути у форматі: ТТТТ');
        data.faculty.classList.add('error');
        return false;
    }
    else{
        clearErrors();
    }

    // Адреса (м. ЧЧЧЧЧЧ)
    var addressPattern = /м\.\s[А-ЯІЇЄҐ]{1}[а-яіїєґ']{1,}$/;
    if (!addressPattern.test(data.address.value)) {
        alert('Адреса має бути у форматі: м. ЧЧЧЧЧЧ');
        data.address.classList.add('error');
        return false;
    }
    else{
        clearErrors();
    }

    // Telegram (@Т_ТТТТТ)
    var telegramPattern = /@[\w]{1,}$/;
    if (!telegramPattern.test(data.telegram.value)) {
        alert('Telegram має бути у форматі: @Т_ТТТТТ');
        data.telegram.classList.add('error');
        return false;
    }
    else{
        clearErrors();
    }
//Виведення повідомлення у окреме вікно
    var FormInfo =
    'ПІБ: ' + data.fullName.value + '\n' +
    'Група: ' + data.group.value + '\n' +
    'Факультет: ' + data.faculty.value + '\n' +
    'Адреса: ' + data.address.value + '\n' +
    'Telegram: ' + data.telegram.value;
    alert('Форма успішно відправлена!');
    window.open('', '_blank').document.write('<pre>' + FormInfo + '</pre>');

    return true;
    
}

/*------------------------------------------------------------------------------------*/ 
//Визначення рандомного кольору
function changeColor(cell, color) {
    var letters = '0123456789ABCDEF';
    var newColor = color || '#';

    if (!color) {
        for (var i = 0; i < 6; i++) {
            newColor += letters[Math.floor(Math.random() * 16)];
        }
    }

    cell.style.backgroundColor = newColor;
}

var selectedPaletteColor = ''; //Для кольору з палітри з палітри

// Функція для зміни кольору клітинки варіанту
function changePaletteColor(cell) {
    // Елемент input для вибору кольору
    var colorInput = document.createElement("input");
    colorInput.type = "color";
    
    // Встановлюємо початковий колір як фоновий колір елемента
    colorInput.value = cell.style.backgroundColor;
    
    // Обробка вибору кольору
    colorInput.addEventListener("change", function () {
        selectedPaletteColor = colorInput.value;// Збереження обраного кольору в глобальній змінній
        cell.style.backgroundColor = selectedPaletteColor;

    });
    
    colorInput.click(); // Вікно вибору кольору
}
    
// Функція для зміни кольору в рядку через одну
function changeRowColors(row) {
    var cells = row.cells;
    var selectedIndex = -1;
    
    // Знаходимо індекс вибраної клітинки
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('selected-cell')) {
            selectedIndex = i;
            break;
        }
    }
    
    // Якщо вибрана клітинка знайдена
    if (selectedIndex !== -1) {
        for (var i = 0; i < cells.length; i++) {
            if (Math.abs(selectedIndex - i) % 2 === 0) {
                // Колір клітинки = колір з палітри
                cells[i].style.backgroundColor = selectedPaletteColor;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var table = document.createElement('table');

    for (var i = 0; i < 6; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 6; j++) {
            var cell = row.insertCell();
            cell.textContent = i * 6 + j + 1;

            cell.addEventListener('mouseover', function () {
                if (this.textContent == 30) {
                    changeColor(this);
                }
            });

            cell.addEventListener('click', function () {
                // Знімаємо клас 'selected-cell' у всіх клітинок
                var cells = this.parentNode.cells;
                for (var i = 0; i < cells.length; i++) {
                    cells[i].classList.remove('selected-cell');
                }

                // Додаємо клас 'selected-cell' тільки поточній клітинці
                this.classList.add('selected-cell');

                if (this.textContent == 30) {
                    changePaletteColor(this);
                }
            });

            cell.addEventListener('dblclick', function () {
                changeRowColors(this.parentNode);
            });
        }
    }

    document.body.appendChild(table);
});