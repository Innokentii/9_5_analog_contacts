// Функция проверки номера телефона;
export function phone_number_verification_f(text) {
    let work_text = text.split('');
    let array_perm = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspase', '+'];
    if (array_perm.includes(work_text[work_text.length - 1]) == false) {work_text = work_text.slice(0, -1)};
    if (work_text[0] != '+') {work_text = ['+', ...work_text]}
    if (array_perm.includes(work_text[work_text.length - 1]) == false) {
        work_text = work_text.filter((e)=>{
            if (array_perm.includes(e) == true) {return(e)}
        })}
    work_text = work_text.join('');
    return(work_text)
};

// Функция проверки имени и фамилии;
export function name_lastname_verification_f(text) {
    let work_text = text.split('');
    let forbidden_array = ("1 2 3 4 5 6 7 8 9 0 ~ ! @ # $ % ^ & * ( ) _ + - = { } [ ] \\ | ; : ' / < > , . ? /").split(' ');
    forbidden_array = [...forbidden_array, ' '];
    if (forbidden_array.includes(work_text[work_text.length - 1]) == true) {work_text = work_text.slice(0, -1)};
    let work_two_text = [];
    for (let i=0; i<work_text.length; i++) {work_two_text = [...work_two_text, work_text[i].toLowerCase()]};
    work_text = work_two_text;
    try {
        work_text = [work_text[0].toUpperCase(), ...work_text.slice(1)];
    }
    catch {
        console.log('Не увеличен');
    }
    work_text = work_text.filter(item => !forbidden_array.includes(item));
    work_text = work_text.join('');
    return(work_text)
};

// Функция проверки даты рождения;
export function date_birth_verification_f(text) {
    let work_text = text.split('');
    let array_perm = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'backspase'];
    let legal_age = 18; // Разрешенный возраст;
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear() - legal_age;
    if (text != 'backspase') {
        if (array_perm.includes(work_text[work_text.length - 1]) == false) {work_text = work_text.slice(0, -1)};
        if (work_text.length == 2 && work_text[1] == '.') {work_text = ['0', ...work_text]};
        if (work_text.length == 3 && work_text[2] != '.') {work_text = [...work_text.slice(0, 2), '.', work_text[work_text.length - 1]]};
        if (work_text.length == 4 && work_text[2] == '.' && work_text[3] != '1' && work_text[3] != '0') {work_text = [...work_text.slice(0, 3), '0', work_text[work_text.length - 1]]};
        if (work_text.length == 6 && work_text[5] != '.') {work_text = [...work_text.slice(0, 5), '.', work_text[work_text.length - 1]]};
        if (work_text.length == 7 && work_text[5] == '.' && work_text[6] != '1' && work_text[6] != '2') { work_text = [...work_text.slice(0, 6), '2', work_text[work_text.length - 1]] };
        if (work_text.length == 10) {
            var startDate = new Date(`${currentYear}-${work_text.slice(3, 5).join('')}-${work_text.slice(0, 2).join('')}`); // Начальная дата;
            var endDate = new Date(`${work_text.slice(6, 10).join('')}-${work_text.slice(3, 5).join('')}-${work_text.slice(0, 2).join('')}`);   // Конечная дата;
            var timeDifference = endDate - startDate;
            var differenceInYears = new Date(timeDifference).getUTCFullYear() - 1970;
            if (differenceInYears > 0) { work_text = [...work_text.slice(0, 6), (currentYear)] };
        };
        if (work_text.length > 10) { work_text = [...work_text.slice(0, 10)] };
    };
    work_text = work_text.join('');
    return (work_text)
};

// Функция проверки корректного ввода электронной почты;
export function checking_correct_mail_f(text) {
    let work_text = text.split('');
    let array_perm = "!#$%&'*+/=?^_`{|}~@.".split(''); // Специальные символы;
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']; // Числа;
    var latinUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Латинские буквы в верхнем регистре;
    var latinLowerCase = 'abcdefghijklmnopqrstuvwxyz'.split(''); // Латинские буквы в нижнем регистре;
    let glob_array = [...array_perm, ...latinUpperCase, ...latinLowerCase, ...numbers];
    if (glob_array.includes(work_text[work_text.length - 1]) == false) { work_text = work_text.slice(0, -1) };
    // Функция счета;
    function count_f(x) {
        let count = 0;
        for (let i = 0; i < work_text.length; i++) { if (work_text[i] == x) { count++ } };
        return (count);
    };
    if (count_f('@') == 2) { work_text = work_text.slice(0, -1) };
    if (count_f('@') != 1 && work_text[work_text.length - 1] == '.') { work_text = work_text.slice(0, -1) };
    if (count_f('.') == 2) { work_text = work_text.slice(0, -1) };
    work_text = work_text.join('');
    return (work_text)
};

// Функция проверки пароля и наличия логина;
export function login_verification_f(login, password) {
    // проверка логина на корректность;
    let num_simvol = 4;
    if (login.split('').length < num_simvol) { return ('Неверный логин') };
    // проверка пароли на корректность;
    let num_simvol_passw = 8;
    if (password.split('').length < num_simvol_passw) { return ('Неверный пароль') }
    return ('')
};

// Функция SMS оповещения;
let sms_data = ''; 
export function sms_notification_f(phone) {
    let n_1 = Math.floor(Math.random() * 10);
    let n_2 = Math.floor(Math.random() * 10);
    let n_3 = Math.floor(Math.random() * 10);
    let n_4 = Math.floor(Math.random() * 10);
    let n_5 = Math.floor(Math.random() * 10);
    let n_6 = Math.floor(Math.random() * 10);
    sms_data = `${n_1}${n_2}${n_3}${n_4}${n_5}${n_6}`;
    console.log(`смс код: ${sms_data}`);
    return(sms_data);
};

// Функция MAIL оповещения для потверждения почты;
export function mail_notification_f(mail) {
    console.log(`сообщение об потверждении отправлено в эл.почту: "${mail}"`);
};

