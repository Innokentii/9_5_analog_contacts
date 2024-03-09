import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Line } from 'react-native-svg';

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState,  } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, FlatList, TouchableOpacity, PanResponder, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { phone_number_verification_f } from './App_fun';
import { name_lastname_verification_f } from './App_fun';
import { date_birth_verification_f } from './App_fun';
import { checking_correct_mail_f } from './App_fun';
import { login_verification_f } from './App_fun';
import { sms_notification_f } from './App_fun';
import { mail_notification_f } from './App_fun';

import Profile_f from './components/profile';
import Like_f from './components/like';
import Search_f from './components/search';
import Main_f from './components/main';


const http_web_code = '192.168.1.22:5000';
const local_bd_code = 'local_bd.txt';

export default function App() {
  // Глобальные переменные для регулирования режима фона монитора ("тёмный" или "светлый");
  let [bg_main, set_bg_main] = useState({backgroundColor: '#080808'}); // Основной цвет фона ("тёмный" или "светлый");
  let [color_text, set_color_text] = useState({color: '#FCFCFD'}); // Основной цвет текста ("тёмный" или "светлый");
  let [reg_button_ad_controll, set_reg_button_ad_controll] = useState({backgroundColor: '#FCFCFD'}); // Основной цвет фона кнопки ("Принять и продолжить");
  let [reg_text_ad_controll, set_reg_text_ad_controll] = useState({color: '#080808'}); // Основной цвет текста кнопки ("Принять и продолжить");
  let [reg_button_ad_reject, set_reg_button_ad_reject] = useState({borderColor: '#FCFCFD'}); // Основной цвет рамки кнопки ("Принять и продолжить");
  let [bg_buttom_profile, set_bg_buttom_profile] = useState({backgroundColor: '#1D2939'}); // Основной цвет кнопки в профиле;

  let [back_arrow, set_back_arrow] = useState(require('./components/main_consols/back_arrow_black.png'));
  let [main_req, set_main_req] = useState(require('./components/main_consols/1_main_req_black.png'));
  let [search_req, set_search_req] = useState(require('./components/main_consols/1_search_req_black.png'));
  let [like_req, set_like_req] = useState(require('./components/main_consols/1_like_req_black.png'));
  let [profile_req, set_profile_req] = useState(require('./components/main_consols/1_profile_req_black.png'));
  let [customization, set_customization] = useState(require('./components/main_consols/customization_black.png'));
  let [changing_the_cover, set_changing_the_cover] = useState(require('./components/main_consols/changing_the_cover_black.png'));

  let [button_op_color, set_button_op_color] = useState({backgroundColor: '#475467'}); // Цвет фона кнопки переключенный в право;
  let [button_cl_color, set_button_cl_color] = useState({backgroundColor: '#98A2B3'}); // Цвет фона кнопки переключенный в влево;
  let [button_color, set_button_color] = useState({backgroundColor: '#FCFCFD'}); // Цвет фона кнопки;

  //Функция переключения режима светлый/темный;
  function light_dark_mode_switching_f(light_white) {
    if (light_white == 'темный') {
      set_bg_main({backgroundColor: '#080808'});
      set_color_text({color: '#FCFCFD'});
      set_reg_button_ad_controll({backgroundColor: '#FCFCFD'});
      set_reg_text_ad_controll({color: '#080808'});
      set_reg_button_ad_reject({borderColor: '#FCFCFD'});
      set_bg_buttom_profile({backgroundColor: '#1D2939'});

      set_back_arrow(require('./components/main_consols/back_arrow_black.png'));
      set_main_req(require('./components/main_consols/1_main_req_black.png'));
      set_search_req(require('./components/main_consols/1_search_req_black.png'));
      set_like_req(require('./components/main_consols/1_like_req_black.png'));
      set_profile_req(require('./components/main_consols/1_profile_req_black.png'));
      set_customization(require('./components/main_consols/customization_black.png'));
      set_changing_the_cover(require('./components/main_consols/changing_the_cover_black.png'));

      set_button_op_color({backgroundColor: '#475467'});
      set_button_cl_color({backgroundColor: '#98A2B3'});
      set_button_color({backgroundColor: '#FCFCFD'});
    }
    else {
      set_bg_main({backgroundColor: '#FCFCFD'});
      set_color_text({color: '#101828'});
      set_reg_button_ad_controll({backgroundColor: '#101828'});
      set_reg_text_ad_controll({color: '#FCFCFD'});
      set_reg_button_ad_reject({borderColor: '#101828'});
      set_bg_buttom_profile({backgroundColor: '#FCFCFD'});

      set_back_arrow(require('./components/main_consols/back_arrow_white.png'));
      set_main_req(require('./components/main_consols/1_main_req_white.png'));
      set_search_req(require('./components/main_consols/1_search_req_white.png'));
      set_like_req(require('./components/main_consols/1_like_req_white.png'));
      set_profile_req(require('./components/main_consols/1_profile_req_white.png'));
      set_customization(require('./components/main_consols/customization_white.png'));
      set_changing_the_cover(require('./components/main_consols/changing_the_cover_white.png'));

      set_button_op_color({backgroundColor: '#101828'});
      set_button_cl_color({backgroundColor: '#D0D5DD'});
      set_button_color({backgroundColor: '#FCFCFD'});
    }
  };

  //=====================================================================================================//

  // Функция индикатора загрузки;
  let [on_off_loading, set_on_off_loading] = useState({display: 'none'})
  let [point_loading, set_point_loading] = useState('');
  useEffect(()=>{
    let point_loading_count = 0;
    setInterval(()=>{
      point_loading_count = point_loading_count + 1;
      let point_str = '';
      for (let i=0; i<point_loading_count; i++) {point_str = point_str + '.'};
      set_point_loading(point_str);
      if (point_loading_count === 5) {point_loading_count = 0; set_point_loading('')};
    }, 1000);
  },[]);
  // Функция открытия загрузки;
  function on_loading_f() {
    set_on_off_loading({display: 'flex'});
    console.log('load_flex');
  };
  // Функция скрытия загрузки;
  function off_loading_f() {
    set_on_off_loading({display: 'none'});
    console.log('load_none');
  };

  let [display_mains_blocks, set_display_mains_blocks] = useState([
    {display: 'flex'}, /* Блок регистрации или входа; */ {display: 'none'}, /* Блок регистрации;*/ {display: 'none'}, /* Блок входа; */
    {display: 'none'}, /* Главный рабочий блок; */ {display: 'none'}
  ]);
  let [display_register_blocks, set_display_register_blocks] = useState([
    {display: 'flex'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(СТАРТ) */ {display: 'none'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(Потдверждение_номера) */
    {display: 'none'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(Ввод_данных) */ {display: 'none'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(Соглашение) */
  ]);
  
  // ФУНКЦИИ БЛОКА "РЕГИСТРАЦИЯ ИЛИ ВХОД":
  function none_main_block_f() {
    // Рестарт состояния видимости основных блоков;
    set_display_mains_blocks([
      {display: 'none'}, /* Блок регистрации или входа; */ {display: 'none'}, /* Блок регистрации;*/ {display: 'none'}, /* Блок входа; */
      {display: 'none'}, /* Главный рабочий блок; */ {display: 'none'}, /* Блок профиля; */ {display: 'none'}, /* Блок чужого профиля; */
      {display: 'none'}, /* Блок сообщений; */ {display: 'none'}, /* Блок аудио связи; */ {display: 'none'}, /* Блок видео связи; */
      {display: 'none'}, /* #9; */ {display: 'none'}, /* #10; */ {display: 'none'}, /* #11; */
    ]);
  };
  function back_1_block_f() {
    // Функция возврата в блок "БЛОК_РЕГИСТРАЦИИ_ИЛИ_ВХОДА";
    set_display_mains_blocks((prev) => [{ display: 'flex' }, ...prev.slice(1)]);
  };
  function none_block_1_f() {
    // Функция возврата в блок "БЛОК_РЕГИСТРАЦИИ";
    set_display_mains_blocks((prev) => [...prev.slice(0, 1), { display: 'flex' }, ...prev.slice(2)]);
  };
  function none_block_2_f() {
    // Функция возврата в блок "БЛОК_ВХОДА";
    set_display_mains_blocks((prev) => [...prev.slice(0, 2), { display: 'flex' }, ...prev.slice(3)]);
  };
  let [main_boofer, set_main_boofer] = useState({display: 'flex'});
  function none_block_3_f() {
    // Функция возврата в блок "Главный рабочий блок";
    set_display_mains_blocks((prev) => [...prev.slice(0, 3), { display: 'flex' }, ...prev.slice(4)]);
    set_main_boofer({display: 'none'});
  };

  // ФУНКЦИИ БЛОКА "РЕГИСТРАЦИЯ":
  function none_reg_block_f() {
    // Рестарт состояния видимости под блоков раздела "регистрация";
    set_display_register_blocks([
      {display: 'none'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(СТАРТ) */ {display: 'none'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(Потдверждение_номера) */
      {display: 'none'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(Ввод_данных) */ {display: 'none'}, /* ПОДБЛОК_РЕГИСТРАЦИИ_(Соглашение) */
    ]);
  };
  function back_reg_1_block_f() {
    // Функция возврата или входа в блок "ПОДБЛОК_РЕГИСТРАЦИИ_(СТАРТ)";
    set_display_register_blocks((prev) => [{ display: 'flex' }, ...prev.slice(1)]);
  };
  function back_reg_2_block_f() {
    // Функция возврата в или входа блок "ПОДБЛОК_РЕГИСТРАЦИИ_(Потдверждение_номера)";
    set_display_register_blocks((prev) => [...prev.slice(0, 1), { display: 'flex' }, ...prev.slice(2)]);
  };
  function back_reg_3_block_f() {
    // Функция возврата в или входа блок "ПОДБЛОК_РЕГИСТРАЦИИ_(Ввод_данных)";
    set_display_register_blocks((prev) => [...prev.slice(0, 2), { display: 'flex' }, ...prev.slice(3)]);
  };
  function back_reg_4_block_f() {
    // Функция возврата в или входа блок "ПОДБЛОК_РЕГИСТРАЦИИ_(Соглашение)";
    set_display_register_blocks((prev) => [...prev.slice(0, 3), { display: 'flex' }, ...prev.slice(4)]);
  };

  // ФУНКЦИИ_ПРОВЕРКИ_КОРЕКТНОСТИ_ВВОДОВ_ДАННЫХ:
  let [phone_main_reg_text, set_phone_main_reg_text] = useState(''); // номер телефона;
  let [name_main_reg_text, set_name_main_reg_text] = useState(''); // Имя пользователя;
  let [lastname_main_reg_text, set_lastname_main_reg_text] = useState(''); // Фамилия пользователя;
  let [date_birth_main_reg_text, set_date_birth_main_reg_text] = useState(''); // Дата рождения;
  let [mail_main_reg_text, set_mail_main_reg_text] = useState(''); // Электронная почта;
  let [login_main_reg_text, set_login_main_reg_text] = useState(''); // Логин;
  let [password_main_reg_text, set_password_main_reg_text] = useState(''); // Пароль;
  let [sms_main_reg_text, set_sms_main_reg_text] = useState(''); // sms;
  let [advertising_by_mail, set_advertising_by_mail] = useState({display: 'flex'}); // Рассылка оповещения на почту;

  // Проверка логина, пароля и отправка смс;
  let [sms_code, set_sms_code] = useState('');
  const check_login_password_f = async (phone, login, password) => {
    set_sms_code('');
    let value_request = '';
    try {
      value_request = '';
      const response = await axios.get(`http://${http_web_code}/list_of_logins`);
      let data_check_login_password = (response.data)[0];
      if (data_check_login_password == undefined) {data_check_login_password = []};
      value_request = login_verification_f(login, password);
      if (value_request === 'Неверный логин') { return (alert('Логин должен состоять хотябы из 4-х символов')) };
      if (value_request === 'Неверный пароль') { return (alert('Пароль должен состоять минимум из 8 символов')) };
      if (value_request === '') {
        if (data_check_login_password.includes(login) == true) {
          alert(`данный логин ${login} уже существует.`);
        }
        else {
          none_reg_block_f();
          back_reg_2_block_f();
          set_sms_code(sms_notification_f(phone));
        }
      };
    } catch {
      alert('Нет сигнала сети');
    }
  };

  // Функция SMS оповещения;
  function checking_sms_code_f(text) {
    set_sms_main_reg_text(text);
    if (text === sms_code) {
      none_reg_block_f();
      back_reg_3_block_f();
    }
  };

  // Функция регистрации пользователя;
  const user_registration_f = async () => {
    let advertising_mail = 'yes';
    try {
      if (advertising_by_mail.display === 'none') {advertising_mail = 'no'};
      const response = await axios.get(`http://${http_web_code}/user_registration?login=${login_main_reg_text}&password=${password_main_reg_text}&phone=${phone_main_reg_text}&name=${name_main_reg_text}&lastname=${lastname_main_reg_text}&date_birth=${date_birth_main_reg_text}&mail=${mail_main_reg_text}&advertisement=${advertising_mail}`);
      let new_data = response.data;
      if (new_data === 'Зарегистрирован') {
        on_loading_f();
        none_reg_block_f();
        none_block_3_f();
        mail_notification_f(mail_main_reg_text);
        local_save_bd_f(login_main_reg_text, password_main_reg_text);
      };
    } catch {
      alert('Нет сигнала сети');
    }
  };

  // Блок паузы ввода даты рождения;
  let [block_birth_main_reg_text, set_block_birth_main_reg_text] = useState(true);
  function block_birth_main_reg_text_f(text) {
    set_block_birth_main_reg_text(false);
    console.log(block_birth_main_reg_text);
    if (block_birth_main_reg_text === true) {
      set_date_birth_main_reg_text(date_birth_verification_f(text));
      setTimeout(()=>{set_block_birth_main_reg_text(true)}, 900);
    } else {
      return(false)
    };
  };

  // Разрешение рассылки оповещения на почту;
  function advertising_by_mail_f() {
    console.log('123');
    if (advertising_by_mail.display === 'flex') {
      set_advertising_by_mail({display: 'none'});
      console.log('none');
    } else {
      set_advertising_by_mail({display: 'flex'});
      console.log('flex');
    };
  };

  // Функция расцветки рамки input;
  let [frame_color_start, set_frame_color_start] = useState({borderColor: 'rgb(85, 84, 84)'})
  let [frame_color, set_frame_color] = useState([
    frame_color_start, frame_color_start, frame_color_start, frame_color_start, frame_color_start,
    frame_color_start, frame_color_start, frame_color_start, frame_color_start, frame_color_start
  ]);
  function frame_color_f(num_inp) {
    set_frame_color([...frame_color.slice(0,num_inp), reg_button_ad_reject, ...frame_color.slice((num_inp+1),10)]);
  };

  // Функция входа;
  let [open_login_main_reg_text, set_open_login_main_reg_text] = useState('');
  let [open_password_main_reg_text, set_open_password_main_reg_text] = useState('');
  const user_open_f = async () => {
    try {
      const response = await axios.get(`http://${http_web_code}/user_open?login=${open_login_main_reg_text}&password=${open_password_main_reg_text}`);
      let new_data = response.data;
      if (new_data === 'НП логин') {alert('Не правильный логин!')};
      if (new_data === 'НП пароль') {alert('Не правильный пароль!')};
      if (new_data === 'Вход') {
        on_loading_f();
        none_main_block_f();
        none_block_3_f();
        mail_notification_f(mail_main_reg_text);
        local_save_bd_f(open_login_main_reg_text, open_password_main_reg_text);
      };
    } catch {
      alert('Нет сигнала сети');
    }
  };

  // Функция cохранение пользователя в локалной БД;
  const fileUri = FileSystem.documentDirectory + local_bd_code;
  function local_save_bd_f(login, password) {
    console.log(login);
    console.log(password);
    let text = `${login}\n${password}`;
    console.log(text);
    FileSystem.writeAsStringAsync(fileUri, text)
      .then(() => {
        console.log('Файл успешно записан');
        // Чтение файла;
        setTimeout(()=>{
          FileSystem.readAsStringAsync(fileUri)
          .then(content => {console.log(content); setTimeout(()=>{open_profile_block_f()}, 100)})
          .catch(error => console.error(error));
        }, 300)
      })
      .catch(error => console.error(error));
  };

  // Функция выхода пользователя;
  function user_logout_f() {
    FileSystem.writeAsStringAsync(fileUri, '')
    .then(() => {
      console.log('Пользователь вышел');
      none_main_block_f();
      back_1_block_f();
    })
    .catch(error => console.error(error));
  };

  // Функция ВХОДА пользователя при наличии локального сохранения;
  function start_user_login_f() {
    FileSystem.readAsStringAsync(fileUri)
      .then(content => {
        console.log(content);
        if (content == '') {
          console.log('пользователь не сохранился')
        }
        else {
          save_useSatte_f(content);
        }
      })
      .catch(error => console.error(error));
    function save_useSatte_f(text) {
      let work_text = text;
      work_text =  work_text.split('\n');
      const user_open_f = async (login, password) => {
        try {
          const response = await axios.get(`http://${http_web_code}/user_open?login=${login}&password=${password}`);
          let new_data = response.data;
          if (new_data === 'НП логин') {alert('Не правильный логин!')};
          if (new_data === 'НП пароль') {alert('Не правильный пароль!')};
          if (new_data === 'Вход') {
            on_loading_f();
            none_main_block_f();
            none_block_3_f();
            mail_notification_f(mail_main_reg_text);
            local_save_bd_f(login, password);
          };
        } catch {
          alert('Нет сигнала сети');
        }
      };
      user_open_f(work_text[0], work_text[1]);
    }
  };
  useEffect(()=>{
    start_user_login_f();
  },[])



  // Функция переключения подблоков главного блока;
  let [main_block_cl_op, set_main_block_cl_op] = useState([{display: 'flex'}, {display: 'none'}]);
  let [search_block_cl_op, set_search_block_cl_op] = useState([{display: 'flex'}, {display: 'none'}]);
  let [reels_block_cl_op, set_reels_block_cl_op] = useState({display: 'none'});
  let [like_block_cl_op, set_like_block_cl_op] = useState([{display: 'flex'}, {display: 'none'}]);
  let [profile_block_cl_op, set_profile_block_cl_op] = useState([{display: 'flex'}, {display: 'none'}]);

  function hiding_all_main_blocks_f() {
    set_main_block_cl_op([{display: 'flex'}, {display: 'none'}]);
    set_search_block_cl_op([{display: 'flex'}, {display: 'none'}]);
    set_like_block_cl_op([{display: 'flex'}, {display: 'none'}]);
    set_profile_block_cl_op([{display: 'flex'}, {display: 'none'}]);
    set_reels_block_cl_op({display: 'none'});
  };

  function open_main_block_f() {
    hiding_all_main_blocks_f();
    set_main_block_cl_op([{display: 'none'}, {display: 'flex'}]);
  };

  function open_search_block_f() {
    hiding_all_main_blocks_f();
    set_search_block_cl_op([{display: 'none'}, {display: 'flex'}]);
  };

  function open_reels_block_f() {
    set_reels_block_cl_op({display: 'flex'});
  };
  

  function open_like_block_f() {
    hiding_all_main_blocks_f();
    set_like_block_cl_op([{display: 'none'}, {display: 'flex'}]);
  };

  function open_profile_block_f() {
    reels_img_off_f();
    hiding_all_main_blocks_f();
    set_profile_block_cl_op([{display: 'none'}, {display: 'flex'}]);
    data_request_user_f();
  };

  // Функция запроса данных о пользователе для блока "Профиль";
  let [user_data, set_user_data] = useState([]);
  function data_request_user_f() {
    let user = '';
    let password = '';
    const fileUri = FileSystem.documentDirectory + local_bd_code;
    FileSystem.readAsStringAsync(fileUri)
      .then(content => {
        content = content.split('\n');
        user = content[0];
        password = content[1];
        user_data_request_f(user, password);
      })
      .catch(error => console.error(error));
    const user_data_request_f = async (user, password) => {
      let advertising_mail = 'yes';
      try {
        if (advertising_by_mail.display === 'none') { advertising_mail = 'no' };
        const response = await axios.get(`http://${http_web_code}/data_request_user?login=${user}&password=${password}`);
        set_user_data(response.data);
        light_dark_mode_switching_f((response.data)[30]);
        profile_change_f();
        data_request_reels_f();
      } catch {
        alert('Нет сигнала сети/ либо нет данных');
      }
    };
  };

  // Функция изменения профиля пользователя;
  let [img_profile, set_img_profile] = useState(null);
  let [img_bg, set_img_bg] = useState(null);
  function profile_change_f() {
    const fileUri = FileSystem.documentDirectory + local_bd_code;
    FileSystem.readAsStringAsync(fileUri)
      .then(content => {
        content = content.split('\n');
        user = content[0];
        let img_req_1 = `http://${http_web_code}/static/users/${user}/profile_photo.jpg?timestamp=${Date.now()}`;
        set_img_bg({ uri: img_req_1 });
        let img_req_2 = `http://${http_web_code}/static/users/${user}/bg_photo.jpg?timestamp=${Date.now()}`;
        set_img_profile({ uri: img_req_2 });
      })
      .catch(error => console.error(error));
  };

  // Функция запроса данных о REELS пользователя для блока "Профиль";
  let [reels_data, set_reels_data] = useState([]);
  function data_request_reels_f() {
    on_loading_f();
    let user = '';
    let password = '';
    const fileUri = FileSystem.documentDirectory + local_bd_code;
    FileSystem.readAsStringAsync(fileUri)
      .then(content => {
        content = content.split('\n');
        user = content[0];
        password = content[1];
        user_data_request_f(user, password);
      })
      .catch(error => console.error(error));
    const user_data_request_f = async (user, password) => {
      try {
        const response = await axios.get(`http://${http_web_code}/data_request_reels?login=${user}&password=${password}`);
        let work_resp = response.data;
        let work_array_big = [];
        for (let i=0; i<work_resp.length; i++) {
          let work_array_mini = [];
          work_array_mini.push(`http://${http_web_code}/static/users/${user}/reels/${work_resp[i][0]}_reels.jpg`);
          // Генерация времени;
          let time = ((work_resp[i][3].split(' '))[1]).split(':').slice(0, 2).join(':');
          work_array_mini.push(time);
          
          // Генерация дня;
          let day = (((work_resp[i][3].split(' '))[0]).split('-'))[2];
          // Генерация месяца;
          let mounth_arrow = {'01':'января,', '02':'февраля,', '03':'марта,', '04':'апреля,', '05':'майя,', '06':'июнья,', '07':'июля,', '08':'августа,', '09':'сентября,', '10':'октября,', '11':'ноября,', '12':'декабря,'}
          let mounth = (((work_resp[i][3].split(' '))[0]).split('-'))[1];
          mounth = mounth_arrow[mounth];
          // Генерация дня недели;
          const dateString = (work_resp[i][3].split(' '))[0];
          const dateObject = new Date(dateString);
          const dayOfWeek = dateObject.getDay();
          const daysOfWeekText = ["вос", "пон", "вто", "сре", "чет", "пят", "суб"];
          const dayOfWeekText = daysOfWeekText[dayOfWeek];
          // общая дата;
          let arrow_date = [day, mounth, dayOfWeekText].join(' ');
          work_array_mini.push(arrow_date);

          // год;
          let year = (((work_resp[i][3].split(' '))[0]).split('-'))[0];
          work_array_mini.push(year);

          // Хештег;
          work_array_mini.push(work_resp[i][1]);

          // время воспроизведения;
          work_array_mini.push(work_resp[i][2]);

          // тип;
          work_array_mini.push(work_resp[i][5]);

          // изображение либо видео;
          if (work_resp[i][5] === 'img') {
            work_array_mini.push(`http://${http_web_code}/static/users/${user}/reels/${work_resp[i][0]}_music.mp3`);
          } else {
            work_array_mini.push(`http://${http_web_code}/static/users/${user}/reels/${work_resp[i][0]}_video.mp4`);
          }

          // логин рилса;
          work_array_mini.push(work_resp[i][3]);

          // время удаления рилса рилса;
          work_array_mini.push(work_resp[i][6] + " мин");

          work_array_big.push(work_array_mini);
        }
        console.log(work_array_big);
        set_reels_data(work_array_big);
        reels_img_off_f();
        off_loading_f(); // отключение иконки загрузки;
      } catch {
        console.log('Нет сигнала сети/ либо нет данных локальной БД');
        reels_img_off_f();
        off_loading_f(); // отключение иконки загрузки;
      }
    };
  };



  //===================УСТАНОВКА_REELS_ИЗОБРАЖЕНИЯ===================//
  let [on_off_image_discrept, set_on_off_image_discrept] = useState({display: 'none'})
  // выбор изображения для reels;
  let [bg_image, set_bg_image] = useState(require('./components/main_consols/black_img.png'));
  const bg_image_profile_f = async () => {
    set_bg_image(require('./components/main_consols/black_img.png'))
    set_on_off_image_discrept({display: 'flex'});
    set_text_editor_button([{display: 'flex'}, {display: 'none'}]);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      set_bg_image({uri: result.assets[0].uri});
    }
  };






  // Функция редактирования текста;
  let [text_array, set_text_array] = useState([]); // массив текста рилс;
  let [text_editor_button, set_text_editor_button] = useState([{display: 'flex'}, {display: 'none'}]);
  function text_editing_go_f() {
    // функция начала редактирования текста;
    set_text_editor_button([{ display: 'none' }, { display: 'flex' }]);
    set_editable_text('');
    set_selectedColorBG('#080808');
    set_positoin_top_color_BG(0);
    set_selectedColorText('#FCFCFD');
    set_positoin_top_color_text(290);
    set_text_orientation('center');
    set_text_orientation_cl({ textAlign: 'center' });
    set_text_orientation_img(require('./components/main_consols/center_text.png'));
    set_font_italics_text('normal');
    set_font_italics_text_cl({ fontStyle: 'normal' });
    set_font_italics_text_bg({ backgroundColor: '#D198F4' });
    set_font_thickness_text('normal');
    set_font_thickness_text_cl({ fontWeight: 'normal' });
    set_font_thickness_text_bg({ backgroundColor: '#D198F4' });
    set_font_edited_text_cl({fontSize: 16});
    set_font_edited_text('16');
  };
  function text_editing_stop_f() {
    // функция остановки редактирования текста;
    set_text_editor_button([{display: 'flex'}, {display: 'none'}]);
  };

  let [font_edited_text, set_font_edited_text] = useState('16'); // Переменная изменения размера шрифта;
  let [font_edited_text_cl, set_font_edited_text_cl] = useState({fontSize: 16}); 
  function text_editing_f(text) {
    // функция ввода размера шрифта в переменные;
    if (Number(text) < 8) {
      set_font_edited_text('8');
      set_font_edited_text_cl({fontSize: 8});
    }
    else {
      set_font_edited_text(text);
      let work_num = Number(text);
      set_font_edited_text_cl({fontSize: work_num});
    }
  };

  let [font_thickness_text, set_font_thickness_text] = useState('normal'); // Переменная изменения толщины шрифта;
  let [font_thickness_text_cl, set_font_thickness_text_cl] = useState({fontWeight: 'normal'});
  let [font_thickness_text_bg, set_font_thickness_text_bg] = useState({backgroundColor: '#D198F4'});
  function font_thickness_f() {
    // функция изменения толщины текста в переменные;
    if (font_thickness_text === 'normal') {
      set_font_thickness_text('bold');
      set_font_thickness_text_cl({fontWeight: 'bold'});
      set_font_thickness_text_bg({backgroundColor: '#A79EAC'});
    }
    else {
      set_font_thickness_text('normal');
      set_font_thickness_text_cl({fontWeight: 'normal'});
      set_font_thickness_text_bg({backgroundColor: '#D198F4'});
    }
  };

  let [font_italics_text, set_font_italics_text] = useState('normal'); // Переменная изменения КУРСИВА шрифта;
  let [font_italics_text_cl, set_font_italics_text_cl] = useState({fontStyle: 'normal'});
  let [font_italics_text_bg, set_font_italics_text_bg] = useState({backgroundColor: '#D198F4'});
  function font_italics_f() {
    // функция изменения КУРСИВА шрифта в переменные;
    if (font_italics_text === 'normal') {
      set_font_italics_text('italic');
      set_font_italics_text_cl({fontStyle: 'italic'});
      set_font_italics_text_bg({backgroundColor: '#A79EAC'});
    }
    else {
      set_font_italics_text('normal');
      set_font_italics_text_cl({fontStyle: 'normal'});
      set_font_italics_text_bg({backgroundColor: '#D198F4'});
    }
  };

  let [text_orientation, set_text_orientation] = useState('center'); // Переменная изменения ориентации шрифта;
  let [text_orientation_cl, set_text_orientation_cl] = useState({textAlign: 'center'});
  let [text_orientation_img, set_text_orientation_img] = useState(require('./components/main_consols/center_text.png'));
  function text_orientation_f() {
    // функция изменения Ориентации шрифта в переменные;
    if (text_orientation_img === require('./components/main_consols/center_text.png')) {
      set_text_orientation_img(require('./components/main_consols/end_text.png'));
      set_text_orientation_cl({textAlign: 'right'});
      set_text_orientation('right');
      return
    };
    if (text_orientation_img === require('./components/main_consols/end_text.png')) {
      set_text_orientation_img(require('./components/main_consols/start_text.png'));
      set_text_orientation_cl({textAlign: 'left'});
      set_text_orientation('left');
      return
    };
    if (text_orientation_img === require('./components/main_consols/start_text.png')) {
      set_text_orientation_img(require('./components/main_consols/center_text.png'));
      set_text_orientation_cl({textAlign: 'center'});
      set_text_orientation('center');
      return
    };
  };

  let [selectedColorText, set_selectedColorText] = useState('#FCFCFD'); // Переменная изменения цвета текста;
  let [positoin_top_color_text, set_positoin_top_color_text] = useState(290);
  const handleColorTextChange = (x_w) => {
    // функция изменения цвета текста;
    set_positoin_top_color_text(x_w-67.5);
    let x = x_w - 42;
    let dem_work = 345;
    let pros = (dem_work/7)/100;
    let newColor;
    if (x < ((dem_work/7)*1+20)) {
      let Q = 255 - ((70 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, 0, 0)`;
    }
    if (x >= ((dem_work/7)*1+20) && x < (dem_work/7)*2) {
      let Q = 255 - (((dem_work/7)*2 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${255-Q}, ${Q}, 0)`;
    }
    if (x >= (dem_work/7)*2 && x < (dem_work/7)*3) {
      let Q = 255 - (((dem_work/7)*3 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(0, ${255-Q}, ${Q})`;
    }
    if (x >= (dem_work/7)*3 && x < (dem_work/7)*4) {
      let Q = 255 - (((dem_work/7)*4 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, ${Q}, ${255-Q})`;
    }
    if (x >= (dem_work/7)*4 && x < (dem_work/7)*5) {
      let Q = 255 - (((dem_work/7)*5 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, ${255-Q}, ${Q})`;
    }
    if (x >= (dem_work/7)*5 && x < (dem_work/7)*6) {
      let Q = 255 - (((dem_work/7)*6 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${255-Q}, ${Q}, ${Q})`;
    }
    if (x >= (dem_work/7)*6) {
      let Q = 255 - ((40*7 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, 255, 255)`;
    }
    set_selectedColorText(newColor);
  };
  const panResponderText = PanResponder.create({
    // функция изменения цвета ФОНА текста;
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      handleColorTextChange(gestureState.moveX);
    },
  });

  let [selectedColorBG, set_selectedColorBG] = useState('#080808'); // Переменная изменения цвета ФОНА текста;
  let [positoin_top_color_BG, set_positoin_top_color_BG] = useState(0);
  const handleColorBGChange = (x_w) => {
    // функция изменения цвета ФОНА текста;
    set_positoin_top_color_BG(x_w-67.5);
    let x = x_w - 42;
    let dem_work = 345;
    let pros = (dem_work/7)/100;
    let newColor;
    if (x < ((dem_work/7)*1)) {
      let Q = 255 - ((70 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, 0, 0)`;
    }
    if (x >= ((dem_work/7)*1) && x < (dem_work/7)*2) {
      let Q = 255 - (((dem_work/7)*2 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${255-Q}, ${Q}, 0)`;
    }
    if (x >= (dem_work/7)*2 && x < (dem_work/7)*3) {
      let Q = 255 - (((dem_work/7)*3 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(0, ${255-Q}, ${Q})`;
    }
    if (x >= (dem_work/7)*3 && x < (dem_work/7)*4) {
      let Q = 255 - (((dem_work/7)*4 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, ${Q}, ${255-Q})`;
    }
    if (x >= (dem_work/7)*4 && x < (dem_work/7)*5) {
      let Q = 255 - (((dem_work/7)*5 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, ${255-Q}, ${Q})`;
    }
    if (x >= (dem_work/7)*5 && x < (dem_work/7)*6) {
      let Q = 255 - (((dem_work/7)*6 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${255-Q}, ${Q}, ${Q})`;
    }
    if (x >= (dem_work/7)*6) {
      let Q = 255 - ((40*7 - x)/pros)*2.55; // Разница градиента;
      newColor = `rgb(${Q}, 255, 255)`;
    }
    set_selectedColorBG(newColor);
  };
  const panResponderBG = PanResponder.create({
    // функция изменения цвета ФОНА текста;
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      handleColorBGChange(gestureState.moveX);
    },
  });

  let [editable_text, set_editable_text] = useState(''); // Переменная редактируемый текст;
  




  // Функция установки reels изображения или видео;
  let [on_off_image_install, set_on_off_image_install] = useState({display: 'none'}); // Блок настройки Reels_img_video;
  function image_installation_img_f() {
    off_loading_f();
    set_on_off_image_install({display: 'flex'});
    set_reels_block_cl_op({display: 'none'});
    set_hashtag_text('');
    set_reels_time('1');
    set_reels_gap_time('5');
  };
  function reels_img_off_f() {
    set_on_off_image_install({display: 'none'});
    set_reels_block_cl_op({display: 'none'});
  };

  // Функция проверки времени воспроизведения reels;
  function playback_time_reels_f(text) {
    let work_text = text.replace(/[^0-9]/g, '');
    if (Number(work_text) < 1) { work_text = '1' };
    if (Number(work_text) > 60) { work_text = '60' };
    console.log(work_text);
    return(work_text)
  };
  // Функция проверки времени удаления reels;
  function delete_time_reels_f(text) {
    let work_text = text.replace(/[^0-9]/g, '');
    if (Number(work_text) < 1) { work_text = '1' };
    if (Number(work_text) > 60) { work_text = '1440' };
    console.log(work_text);
    return(work_text)
  };

  // Функция загрузки reels на сервер (POST запрос);
  function changing_user_bg_log_f() {
    const fileUri = FileSystem.documentDirectory + local_bd_code;
    FileSystem.readAsStringAsync(fileUri)
      .then(content => {
        content = content.split('\n');
        user = content[0];
        password = content[1];
        register_reels_img_f(user, password);
      })
      .catch(error => console.error(error));
  };
  let [hashtag_text, set_hashtag_text] = useState(''); // Хештег REELS;
  let [reels_time, set_reels_time] = useState(1); // время продолжительности REELS;
  let [reels_gap_time, set_reels_gap_time] = useState(5); // время видимости REELS;
  let http_port_bg = `http://${http_web_code}/register_reels_img`;
  const register_reels_img_f = async (login, password) => {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('heshteg', hashtag_text);
    formData.append('time', reels_time);
    formData.append('gap_time', reels_gap_time);
    formData.append('type', 'img');
    formData.append('reels_object', {
      uri: bg_image.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    try {
      const response = await fetch(http_port_bg, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = await response.json();
      console.log(data);
      profile_change_f();
    } catch (error) { console.error('Error updating profile:', error) };
  };




  return (
    <View style={[styles.container, bg_main]}>
      <View style={[styles.smartphone_camerabuffer, main_boofer]}>{/*===Буфер_камеры_смартфона==*/}</View>
      {/*===БЛОК_РЕГИСТРАЦИИ_ИЛИ_ВХОДА===*/}
      <View style={display_mains_blocks[0]}>
        <View style={styles.text_1_block_cl}>
          <Text style={[styles.text_1_cl, color_text]}>Добро пожаловать на Domiki Ykt</Text>
        </View>
        <View style={styles.registration_block_cl}>
          <View style={styles.logo_img_block_cl}>
            <ImageBackground
              source={require('./assets/logo_Domiki_Ykt.png')} resizeMode='cover'
              style={styles.logo_img_cl}></ImageBackground>
          </View>
          <TouchableOpacity onPress={()=>{none_main_block_f(); none_block_1_f()}}>
            <View style={styles.text_main_button_block_cl}>
              <Text style={[styles.text_main_button_cl]}>Регистрация</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { none_main_block_f(); none_block_2_f() }}>
            <View style={[styles.text_to_come_in_block_cl]}>
              <Text style={[styles.text_to_come_in_cl, color_text, {textDecorationLine: 'underline'}]}>Войти</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/*===БЛОК_РЕГИСТРАЦИИ===*/}
      <View style={display_mains_blocks[1]}>
        {/*===ПОДБЛОК_РЕГИСТРАЦИИ_(СТАРТ)===*/}
        <View style={display_register_blocks[0]}>
          <View style={styles.text_1_block_two_cl}>
            <TouchableOpacity onPress={() => { none_main_block_f(); back_1_block_f() }}>
              <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
            </TouchableOpacity>
            <Text style={[styles.text_1_cl, color_text]}>Зарегистрируйтесь</Text>
          </View>
          <View style={styles.registration_block_cl}>
            <View style={[styles.reg_text_block_cl, frame_color[0]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Номер телефона'
                placeholderTextColor={'#667085'}
                maxLength={20}
                value={phone_main_reg_text}
                onChangeText={(text) => {
                  let work_length = text.split('');
                  let work_array = '+1234567890'.split('');
                  if (work_array.includes(work_length[work_length.length - 1])) { set_phone_main_reg_text(phone_number_verification_f(text)), frame_color_f(0) }
                  else { set_phone_main_reg_text('') }
                }
                }
              />
            </View>
            <View style={[styles.reg_text_block_cl, frame_color[1]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Придумайте логин'
                placeholderTextColor={'#667085'}
                value={login_main_reg_text}
                onChangeText={(text) => {set_login_main_reg_text(text), frame_color_f(1)}}
                maxLength={20}
              />
            </View>
            <View style={[styles.reg_text_block_cl, frame_color[2]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Придумайте пароль'
                placeholderTextColor={'#667085'}
                value={password_main_reg_text}
                onChangeText={(text) => {set_password_main_reg_text(text), frame_color_f(2)}}
                maxLength={30}
              />
            </View>
            <Text style={[styles.reg_text_description_cl, color_text]}>
              Мы позвоним вам или отправим SMS, чтобы подвердить
              номер телефона. Применяются стандартные условия вашего тарифа на прием сообщений и передачу данных
            </Text>
            <TouchableOpacity onPress={() => { check_login_password_f(phone_main_reg_text, login_main_reg_text, password_main_reg_text) }}>
              <View style={styles.text_main_button_block_cl}>
                <Text style={[styles.text_main_button_cl]}>Продолжить</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*===ПОДБЛОК_РЕГИСТРАЦИИ_(Потдверждение_номера)===*/}
        <View style={display_register_blocks[1]}>
          <View style={styles.text_1_block_two_cl}>
            <TouchableOpacity onPress={() => { none_reg_block_f(), back_reg_1_block_f() }}>
              <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
            </TouchableOpacity>
            <Text style={[styles.text_1_cl, color_text]}>Подтвердить номер</Text>
          </View>
          <View style={styles.registration_block_cl}>
            <Text style={[styles.reg_text_description_cl, color_text]}>Введите код, отправленный на {phone_main_reg_text}</Text>
            <View style={[styles.reg_2_text_block_cl, frame_color[3]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Введите код'
                placeholderTextColor={'#667085'}
                value={sms_main_reg_text}
                onChangeText={(text) => {checking_sms_code_f(text), frame_color_f(3)}}
                maxLength={6}
              />
            </View>
            <View style={styles.reg_block_sms_text_cl}>
              <Text style={[styles.reg_text_description_cl, color_text]}>SMS не пришло?</Text>
              <TouchableOpacity onPress={() => { check_login_password_f(phone_main_reg_text, login_main_reg_text, password_main_reg_text) }}>
                <Text style={[styles.reg_text_description_cl, color_text, {textDecorationLine: 'underline'}]}>Отправить еще раз</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/*===ПОДБЛОК_РЕГИСТРАЦИИ_(Ввод_данных)===*/}
        <View style={display_register_blocks[2]}>
          <View style={styles.text_1_block_two_cl}>
            <TouchableOpacity onPress={() => { none_reg_block_f(), back_reg_2_block_f() }}>
              <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
            </TouchableOpacity>
            <Text style={[styles.text_1_cl, color_text]}>Завершение регистрации</Text>
          </View>
          <View style={styles.registration_block_cl}>
            <View style={{height: 15}}>{/*===БУФЕР===*/}</View>
            <View style={[styles.reg_2_text_block_cl, frame_color[4]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Имя'
                placeholderTextColor={'#667085'}
                value={name_main_reg_text}
                onChangeText={(text) => {set_name_main_reg_text(name_lastname_verification_f(text)), frame_color_f(4)}}
                maxLength={30}
              />
            </View>
            <View style={[styles.reg_2_text_block_cl, frame_color[5]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Фамилия'
                placeholderTextColor={'#667085'}
                value={lastname_main_reg_text}
                onChangeText={(text) => {set_lastname_main_reg_text(name_lastname_verification_f(text)), frame_color_f(5)}}
                maxLength={30}
              />
            </View>
            <Text style={styles.reg_mini_deg_text_cl}>Имя должны совпадать с данными в удостоверении личности.</Text>
            <View style={[styles.reg_2_text_block_cl, frame_color[6]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Дата рождения (дд.мм.гггг)'
                placeholderTextColor={'#667085'}
                value={date_birth_main_reg_text}
                editable={block_birth_main_reg_text}
                onChangeText={(text) => { block_birth_main_reg_text_f(text), frame_color_f(6)}}
                maxLength={10}
              />
            </View>
            <Text style={styles.reg_mini_deg_text_cl}>Минимальный возраст для регистрации: 18. Другие пользователи Domiki Ykt не увидят дату вашего рождения.</Text>
            <View style={[styles.reg_2_text_block_cl, frame_color[7]]}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Электронная почта'
                placeholderTextColor={'#667085'}
                value={mail_main_reg_text}
                onChangeText={(text) => {set_mail_main_reg_text(checking_correct_mail_f(text)), frame_color_f(7)}}
                maxLength={40}
              />
            </View>
            <Text style={styles.reg_mini_deg_text_cl}>Мы отправим подтверждение поездки и квитанции по электронной почте</Text>
            <View style={styles.reg_mini_deg_big_text_cl}>
              <Text style={[styles.text_to_come_in_cl, color_text, { width: '100%' }]}>
                Нажимая «Согласиться и продолжить», я принимаю условия Upstors (
                <Text style={[styles.text_to_come_in_cl, { color: '#1849A9' }, { width: '100%' }, {textDecorationLine: 'underline'}]}>Условия представления услуг</Text>
                <Text style={[styles.text_to_come_in_cl, color_text, { width: '100%' }]}>, </Text>
                <Text style={[styles.text_to_come_in_cl, { color: '#1849A9' }, { width: '100%' }, {textDecorationLine: 'underline'}]}>Условия обработки платежей</Text>
                <Text style={[styles.text_to_come_in_cl, color_text, { width: '100%' }]}>, </Text>
                <Text style={[styles.text_to_come_in_cl, { color: '#1849A9' }, { width: '100%' }, {textDecorationLine: 'underline'}]}>Политика недискриминации Domiki Ykt</Text>
                <Text style={[styles.text_to_come_in_cl, color_text, { width: '100%' }]}> и </Text>
                <Text style={[styles.text_to_come_in_cl, { color: '#1849A9' }, { width: '100%' }, {textDecorationLine: 'underline'}]}>Политика конфиденциальности</Text>
                <Text style={[styles.text_to_come_in_cl, color_text, { width: '100%' }]}>).</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
              if (date_birth_main_reg_text.split('').length === 10) {
              none_reg_block_f(), back_reg_4_block_f()
              } else {
                alert('Введите корректно дату рождения.')
              }
              }}>
              <View style={[styles.reg_button_adoption_cl, reg_button_ad_controll]}>
                <Text style={[styles.reg_text_ad_controll_cl, reg_text_ad_controll]}>Принять и продолжить</Text>
              </View>
            </TouchableOpacity>
            <Text style={[styles.text_to_come_in_mini_cl, color_text]}>
              Domiki Ykt будет отправлять вам эксклюзивные предложения, идеи, рекламные письма и push-оповещения.
              Вы можете отказаться от них в настройках аккаунта в маркетинговом уведомлении.
            </Text>
            <View style={[styles.block_reg_check_mark_cl]}>
              <TouchableOpacity onPress={()=>{advertising_by_mail_f()}}>
                <View style={[styles.reg_check_mark_cl, reg_button_ad_controll]}>
                  <View style={advertising_by_mail}>
                    <Text style={[reg_text_ad_controll]}>&#10004;</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={[styles.reg_mini_deg_text_cl, color_text, {marginBottom: 0}]}>Я не хочу получать рекламные сообщения от Domiki Ykt</Text>
            </View>
          </View>
        </View>
        {/*===ПОДБЛОК_РЕГИСТРАЦИИ_(Соглашение)===*/}
        <View style={display_register_blocks[3]}>
          <View style={[styles.registration_block_cl, {height: '95%', justifyContent: 'flex-end'}]}>
            <Text style={[color_text, {fontSize: 12}]}>Обязательство сообщество</Text>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
              <Text style={[color_text, {fontSize: 20, }]}>Upstors </Text>
              <Text style={[color_text, {fontSize: 20, }]}>&#9135;</Text>
              <Text style={[color_text, {fontSize: 24, fontWeight: 'bold'}]}> сообщество, в</Text>
            </View>
            <Text style={[color_text, {fontSize: 24, fontWeight: 'bold'}]}>котором каждый как дома</Text>
            <Text style={[color_text, {fontSize: 14, marginTop: 20}]}>Для этого мы просим вас принять следующее:</Text>
            <Text style={[color_text, {fontSize: 14, marginTop: 20}]}>
              я соглашаюсь относиться с уважением, без
              осуждения или предвзятости ко всем членам
              сообщества Upstors вне зависимости от их
              расы, религии, национальной и этнической
              принадлежности, цветы кожи, физических
              особенностей, пола, гендерной идентичности,
              сексуальной ориентации или возраста.
            </Text>
            <Text style={[color_text, { fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline',  marginTop: 20,  marginBottom: 60}]}>Подробнее</Text>
            <TouchableOpacity onPress={()=>{ user_registration_f() }}>
              <View style={styles.text_main_button_block_cl}>
                <Text style={[styles.text_main_button_cl]}>Согласиться и продолжить</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{none_reg_block_f(), back_reg_3_block_f()}}>
              <View style={[styles.reg_button_reject_cl, reg_button_ad_reject]}>
                <Text style={[styles.text_main_button_cl, color_text]}>Отклонить</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*===БЛОК_ВХОДА===*/}
      <View style={display_mains_blocks[2]}>
        <View style={styles.text_1_block_two_cl}>
          <TouchableOpacity onPress={()=>{none_main_block_f(); back_1_block_f()}}>
            <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
          </TouchableOpacity>
          <Text style={[styles.text_1_cl, color_text]}>Войти в аккунт</Text>
        </View>
        <View style={styles.registration_block_cl}>
          <View style={[styles.reg_text_block_cl, frame_color[8]]}>
            <TextInput
              style={[styles.reg_text_cl, color_text]}
              placeholder='Ваш логин'
              placeholderTextColor={'#667085'}
              value={open_login_main_reg_text}
              onChangeText={(text) => {set_open_login_main_reg_text(text), frame_color_f(8)}}
            />
          </View>
          <View style={[styles.reg_text_block_cl, frame_color[9]]}>
            <TextInput
              style={[styles.reg_text_cl, color_text]}
              placeholder='Введите пароль'
              placeholderTextColor={'#667085'}
              value={open_password_main_reg_text}
              onChangeText={(text) => {set_open_password_main_reg_text(text), frame_color_f(9)}}
            />
          </View>
          <TouchableOpacity onPress={()=>{user_open_f()}}>
            <View style={[styles.text_main_button_block_cl, { marginTop: 40 }]}>
              <Text style={[styles.text_main_button_cl]}>Продолжить</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/*===РАБОЧАЯ_ЗОНА===*/}
      <View style={display_mains_blocks[3]}>
        <View style={{width: '100%', height: '90%'}}>
          {/*===ГЛАВНАЯ===*/}
          <View style={main_block_cl_op[1]}>
            <Main_f></Main_f>
          </View>
          {/*===ПОИСК===*/}
          <View style={search_block_cl_op[1]}>
            <Search_f></Search_f>
          </View>



          {/*===НОВЫЙ_РЕЕЛС===*/}
          <View style={[styles.fog_reels_cl, reels_block_cl_op]}>{/*ТУМАН*/}</View>
          <View style={[styles.reels_menu_cl, reels_block_cl_op, bg_buttom_profile]}>
            <TouchableOpacity onPress={() => { bg_image_profile_f() }}>
              <View style={[styles.reels_menu_buttom_cl]}>
                <Text style={[color_text, { fontSize: 20, fontWeight: 'bold' }]}>Фото</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.reels_menu_buttom_cl]}>
              <Text style={[color_text, { fontSize: 20, fontWeight: 'bold' }]}>Видео</Text>
            </View>
            <TouchableOpacity onPress={() => { reels_img_off_f() }}>
              <View style={[styles.reels_menu_buttom_cl]}>
                <Text style={[color_text, { fontSize: 20, fontWeight: 'bold' }]}>Отмена</Text>
              </View>
            </TouchableOpacity>
          </View>



          {/*===Блок осмотра Reels_img_video===*/}
          <View style={[styles.reels_img_cl, bg_main, on_off_image_discrept]}>
            <ImageBackground
              source={bg_image}
              resizeMode='cover'
              style={[styles.reels_img_big_cl, {justifyContent: 'space-between', alignItems: 'center'}]}>
              <View>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 50, gap: 20, paddingHorizontal: '5%' }}>
                  <TouchableOpacity onPress={() => { text_editing_go_f() }}>
                    <View style={[styles.text_editing_buttom_cl, text_editor_button[0],]}>
                      <Text style={[reg_text_ad_controll, { fontSize: 32, fontWeight: 'bold' }]}>T</Text>
                    </View>
                  </TouchableOpacity>

                  {/*ВВОД_УСТАНОВКА_ТЕКСТА*/}
                  <TouchableOpacity onPress={() => { text_editing_stop_f() }}>
                    <View style={[styles.text_editing_buttom_cl, text_editor_button[1], { width: 50 }, bg_buttom_profile]}>
                      <Text style={[color_text, { fontSize: 24, fontWeight: 'bold' }]}>Ok</Text>
                    </View>
                  </TouchableOpacity>


                  {/*ВВОД_КУРСИВА_ТЕКСТА*/}
                  <TouchableOpacity onPress={() => { font_italics_f() }}>
                    <View style={[styles.text_editing_buttom_cl, text_editor_button[1],, font_italics_text_bg]}>
                      <Text style={[reg_text_ad_controll, { fontSize: 32, fontWeight: 'normal' }, font_italics_text_cl]}>K</Text>
                    </View>
                  </TouchableOpacity>
                  {/*ВВОД_ТОЛЩИНЫ_ТЕКСТА*/}
                  <TouchableOpacity onPress={() => { font_thickness_f() }}>
                    <View style={[styles.text_editing_buttom_cl, text_editor_button[1], font_thickness_text_bg]}>
                      <Text style={[reg_text_ad_controll, { fontSize: 32, fontWeight: 'bold' }, font_thickness_text_cl]}>B</Text>
                    </View>
                  </TouchableOpacity>
                  {/*ВВОД_ОРИЕНТАЦИЯ_ТЕКСТА*/}
                  <TouchableOpacity onPress={()=>{text_orientation_f()}}>
                    <View style={[styles.text_editing_buttom_cl, text_editor_button[1], font_thickness_text_bg]}>
                      <ImageBackground
                      source={text_orientation_img}
                      resizeMethod='cover'
                      style={{width: '100%', height: '100%'}}
                      ></ImageBackground>
                    </View>
                  </TouchableOpacity>
                  {/*ВВОД_ШРИФТА_ТЕКСТА*/}
                  <View style={[styles.text_editing_buttom_cl, text_editor_button[1],]}>
                    <TextInput
                      style={[reg_text_ad_controll, { fontSize: 24, textDecorationLine: 'underline' }]}
                      value={font_edited_text}
                      maxLength={2}
                      keyboardType="numeric"
                      onChangeText={(text) => { text_editing_f(text) }}
                    />
                  </View>

                </View>
                {/*Градиент_настройки_цвета_текста*/}
                <View style={[{ width: '100%', paddingLeft: '5%', marginTop: 20, display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'flex-start' }, text_editor_button[1]]}>
                  <View style={{width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: 2, borderRadius: 3, overflow: 'hidden'}}>
                    <Text style={{fontSize: 18, color: 'black'}}>TX</Text>
                  </View>
                  <Svg height="30" width="300">
                    <Line
                      x1="0"
                      y1="10"
                      x2="300"
                      y2="10"
                      stroke={selectedColorText}
                      strokeWidth="30"
                      {...panResponderText.panHandlers}
                      style={{ zIndex: 1004 }}
                    >
                    </Line>
                    <ImageBackground
                      source={require('./components/main_consols/line_gradient.png')}
                      resizeMode='cover'
                      style={{ width: '100%', height: 30, borderColor: 'white', borderWidth: 2, borderRadius: 3, overflow: 'hidden' }}
                    >
                      <View style={[{ height: 30, width: 10, backgroundColor: 'black', position: 'absolute', left: positoin_top_color_text }]}>{/*СТРЕЛКА*/}</View>
                    </ImageBackground>
                  </Svg>
                </View>
                {/*Градиент_настройки_цвета_фона_текста*/}
                <View style={[{ width: '100%', paddingLeft: '5%', marginTop: 20, display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'flex-start' }, text_editor_button[1]]}>
                  <View style={{width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: 2, borderRadius: 3, overflow: 'hidden'}}>
                    <Text style={{fontSize: 18, color: 'black'}}>BG</Text>
                  </View>
                  <Svg height="30" width="300">
                    <Line
                      x1="0"
                      y1="10"
                      x2="300"
                      y2="10"
                      stroke={selectedColorBG}
                      strokeWidth="30"
                      {...panResponderBG.panHandlers}
                      style={{ zIndex: 1004 }}
                    >
                    </Line>
                    <ImageBackground
                      source={require('./components/main_consols/line_gradient.png')}
                      resizeMode='cover'
                      style={{ width: '100%', height: 30, borderColor: 'white', borderWidth: 2, borderRadius: 3, overflow: 'hidden' }}
                    >
                      <View style={[{ height: 30, width: 10, backgroundColor: 'black', position: 'absolute', left: positoin_top_color_BG }]}>{/*СТРЕЛКА*/}</View>
                    </ImageBackground>
                  </Svg>
                </View>
              </View>
              {/*РЕДАКТОР_ТЕКСТА*/}
              <TouchableWithoutFeedback>
                <TextInput
                  placeholder='Abc...'
                  placeholderTextColor={'#9E98B3'}
                  multiline={true}
                  maxLength={400}
                  value={editable_text}
                  onChangeText={(text) => { set_editable_text(text) }}
                  style={[styles.pos_create_text_cl, text_editor_button[1], { backgroundColor: selectedColorBG }, font_edited_text_cl, font_thickness_text_cl, font_italics_text_cl, text_orientation_cl, { color: selectedColorText, width: 'auto', height: 'auto + 30px', }]}
                />
              </TouchableWithoutFeedback>


              {/*==========ЗОНА_УСТАНОВКИ_ТЕКСТА==========*/}
              {/*
              <FlatList  data={text_array} renderItem={({ item })=>(
                <View><Text></Text></View>
              )}/>
              */}




              

              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
                <TouchableOpacity style={{width: '40%'}} onPress={()=>{set_on_off_image_discrept({display: 'none'}); image_installation_img_f() }}>
                  <View style={[reg_button_ad_reject, styles.text_editing_buttom_main_cl, bg_buttom_profile]}>
                    <Text style={[{ fontSize: 20 }, color_text]}>Далее</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '40%'}} onPress={()=>{set_on_off_image_discrept({display: 'none'}); reels_img_off_f() }}>
                  <View style={[reg_button_ad_reject, styles.text_editing_buttom_main_cl, bg_buttom_profile]}>
                    <Text style={[{ fontSize: 20 }, color_text]}>Отмена</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          {/*===Блок настройки Reels_img_video===*/}
          <View style={[styles.reels_block_cl_op_cl, bg_main, on_off_image_install]}>
            <View style={[styles.text_1_block_two_cl, { marginTop: 40 }]}>
              <TouchableOpacity onPress={() => { reels_img_off_f() }}>
                <ImageBackground
                  source={back_arrow}
                  resizeMode='cover'
                  style={[{ width: 24, height: 24 }]}>
                </ImageBackground>
              </TouchableOpacity>
              <Text style={[styles.text_1_cl, { marginLeft: 20 }, color_text]}>Отмена</Text>
            </View>
            <View style={{marginLeft: '5%', marginTop: '5%', marginBottom: 5}}>
              <Text style={[{fontSize: 16, color: '#667085'},]}>Хештег сопровождение вашего reels:</Text>
            </View>
            <View style={{borderWidth: 2, borderColor: '#667085', height: 150, width: '90%', marginLeft: '5%', padding: 10, borderRadius: 8 }}>
              <TextInput
                style={[color_text, { width: '90%', fontSize: 16 }]}
                placeholder='Добавить описание'
                placeholderTextColor={'#667085'}
                multiline={true}
                numberOfLines={6}
                value={hashtag_text}
                maxLength={240}
                onChangeText={(text) => { set_hashtag_text(text) }}
              />
            </View>
            <View style={{marginLeft: '5%', marginTop: '5%', marginBottom: 5}}>
              <Text style={[{fontSize: 16, color: '#667085'},]}>Продолжительность вашего reels в секундах (max: 60 сек):</Text>
            </View>
            <View style={{borderWidth: 2, borderColor: '#667085', width: '90%', marginLeft: '5%', padding: 10, borderRadius: 8 }}>
              <TextInput
                style={[color_text, { width: '90%', fontSize: 16 }]}
                placeholder='Укажите продолжительность'
                placeholderTextColor={'#667085'}
                value={reels_time}
                maxLength={2}
                keyboardType="numeric"
                onChangeText={(text) => { set_reels_time(playback_time_reels_f(text)) }}
              />
            </View>
            <View style={{marginLeft: '5%', marginTop: '5%', marginBottom: 5}}>
              <Text style={[{fontSize: 16, color: '#667085'},]}>Промежуток до удаления рилс в минутах (min: 5 мин, max: 24 часа):</Text>
            </View>
            <View style={{borderWidth: 2, borderColor: '#667085', width: '90%', marginLeft: '5%', padding: 10, borderRadius: 8 }}>
              <TextInput
                style={[color_text, { width: '90%', fontSize: 16 }]}
                placeholder='Укажите промежуток до удаления рилс'
                placeholderTextColor={'#667085'}
                value={reels_gap_time}
                maxLength={4}
                keyboardType="numeric"
                onChangeText={(text) => { set_reels_gap_time(delete_time_reels_f(text)) }}
              />
            </View>
            <View style={{width: '100%', marginTop: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => { reels_img_off_f();  changing_user_bg_log_f() }}>
                <View style={[reg_button_ad_reject, { borderWidth: 2, borderRadius: 8, padding: 10 }]}>
                  <Text style={[{ fontSize: 20 }, color_text]}>Установить reels</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>






          {/*=====ПОКАЗ_РИЛС_ИЗОБРАЖЕНИЯ=====*/}
          <View style={[styles.reels_img_cl, bg_main, {display: 'none'}]}>
            <ImageBackground
              source={img_bg}
              resizeMode='cover'
              style={[styles.reels_img_big_cl,]}>
              <View style={{ height: '8%' }}>{/*БУФЕР*/}</View>

              <FlatList style={{ width: '90%', marginHorizontal: '5%', display: 'flex', flexDirection: 'row', gap: 3, }} data={reels_data} renderItem={({ items }) => (
                <View style={{ width: '100%', height: 4, backgroundColor: 'red', borderRadius: 2 }}>

                </View>
              )} />

            </ImageBackground>
          </View>






          {/*===НРАВИТСЯ===*/}
          <View style={like_block_cl_op[1]}>
              <Like_f></Like_f>
          </View>
          {/*===ПРОФИЛЬ===*/}
          <View style={profile_block_cl_op[1]}>
            <Profile_f BG={[bg_main, reg_button_ad_controll, color_text, bg_buttom_profile, user_data, img_profile, img_bg, data_request_user_f, back_arrow, reg_button_ad_reject, button_op_color, button_cl_color, button_color, reg_text_ad_controll, customization, changing_the_cover, reels_data, on_loading_f, off_loading_f, user_logout_f]}></Profile_f>
          </View>
        </View>
        <View style={[styles.main_consols_cl]}>
          {/*===ГЛАВНАЯ===*/}
          <View style={{width: 60}}>
            <TouchableOpacity onPress={()=>{open_main_block_f()}}>
              <ImageBackground
                source={main_req} resizeMode='cover'
                style={[{width: 46, height: 48}, main_block_cl_op[0]]}>
              </ImageBackground>
            </TouchableOpacity>
            <ImageBackground
              source={require('./components/main_consols/1_main_req.png')} resizeMode='cover'
              style={[{width: 46, height: 48}, main_block_cl_op[1]]}>
            </ImageBackground>
          </View>
          {/*===ПОИСК===*/}
          <View style={{width: 60}}>
            <TouchableOpacity onPress={() => { open_search_block_f() }}>
              <ImageBackground
                source={search_req} resizeMode='cover'
                style={[{width: 36, height: 48}, search_block_cl_op[0]]}>
              </ImageBackground>
            </TouchableOpacity>
            <ImageBackground
              source={require('./components/main_consols/1_search_req.png')} resizeMode='cover'
              style={[{width: 36, height: 48}, search_block_cl_op[1]]}>
            </ImageBackground>
          </View>
          {/*===НОВЫЙ_РЕЕЛС===*/}
          <TouchableOpacity onPress={()=>{open_reels_block_f()}}>
            <View style={[reg_button_ad_reject, styles.new_rail_block_cl]}>
              <Text style={[color_text, { fontSize: 24, position: 'relative', top: -5 }]}>&#43;</Text>
            </View>
          </TouchableOpacity>
          {/*===НРАВИТСЯ===*/}
          <View style={{width: 60}}>
            <TouchableOpacity onPress={() => { open_like_block_f(); }}>
              <ImageBackground
                source={like_req} resizeMode='cover'
                style={[{ width: 54, height: 48 }, like_block_cl_op[0]]}>
              </ImageBackground>
            </TouchableOpacity>
            <ImageBackground
              source={require('./components/main_consols/1_like_req.png')} resizeMode='cover'
              style={[{ width: 54, height: 48 }, like_block_cl_op[1]]}>
            </ImageBackground>
          </View>
          {/*===ПРОФИЛЬ===*/}
          <View style={{width: 60}}>
            <TouchableOpacity onPress={() => { on_loading_f(); open_profile_block_f() }}>
              <ImageBackground
                source={profile_req} resizeMode='cover'
                style={[{ width: 52, height: 48 }, profile_block_cl_op[0]]}>
              </ImageBackground>
            </TouchableOpacity>
            <ImageBackground
              source={require('./components/main_consols/1_profile_req.png')} resizeMode='cover'
              style={[{ width: 52, height: 48 }, profile_block_cl_op[1]]}>
            </ImageBackground>
          </View>
        </View>
        <View style={{height: '4%'}}>{/*===БУФЕР===*/}</View>
      </View>
      {/*=====ИКОНКА_ЗАГРУЗКИ=====*/}
      <View style={[styles.loading_cl, bg_main, on_off_loading]}>
        <Text style={[color_text, {fontSize: 24}]}>Loading {point_loading}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading_cl: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'flex-start',
  },
  smartphone_camerabuffer: {
    height: 44,
  },
  text_1_cl: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_1_block_cl: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#D0D5DD',
  },
  text_1_block_two_cl: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#D0D5DD',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  registration_block_cl: {
    paddingHorizontal: 20,
  },
  logo_img_cl: {
    height: '100%',
  },
  logo_img_block_cl: {
    width: '100%',
    height: '68%',
    paddingVertical: 20,
  },
  text_main_button_cl: {
    fontSize: 16,
    color: '#FCFCFD',
  },
  text_main_button_block_cl: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5925DC',
  },
  text_to_come_in_cl: {
    fontSize: 14,
  },
  text_to_come_in_block_cl: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  x_cl: {
    fontSize: 36,
    fontWeight: '100',
  },
  reg_text_block_cl: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 4,
    padding: 6,
    paddingHorizontal: 12,
  },
  reg_text_cl: {
    fontSize: 14,
  },
  reg_text_description_cl: {
    fontSize: 14,
    marginVertical: 20,
  },
  reg_2_text_block_cl: {
    width: '65%',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    padding: 6,
    paddingHorizontal: 12,
  },
  reg_block_sms_text_cl: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  reg_2_text_block_cl: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 4,
    padding: 6,
    paddingHorizontal: 12,
  },
  reg_mini_deg_text_cl: {
    color: '#667085',
    marginBottom: 20,
  },
  reg_mini_deg_big_text_cl: {
    display: 'flex',
    flexDirection: 'row',
  },
  reg_button_adoption_cl: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  reg_text_ad_controll_cl: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_to_come_in_mini_cl: {
    width: '100%',
    fontSize: 12,
  },
  block_reg_check_mark_cl: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    marginLeft: 10,
  },
  reg_check_mark_cl: {
    width: 24,
    height: 24,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reg_button_reject_cl: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  main_consols_cl: {
    width: '100%',
    height: '8%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: '#98A2B3',
    zIndex: 10,
  },
  new_rail_block_cl: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 30,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
  },
  reels_block_cl_op_cl: {
    zIndex: 1000,
    width: '100%',
    height: '200%',
  },
  reels_img_cl: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1003
  },
  fog_reels_cl: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '150%',
    backgroundColor: 'black',
    opacity: 0.6,
    zIndex: 999,
  },
  reels_menu_cl: {
    position: 'absolute',
    top: '60%',
    left: 0,
    width: '100%',
    height: '50%',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    paddingTop: 20,
  },
  reels_menu_buttom_cl: {
    width: '100%',
    height: 40,
    borderBottomWidth: 2,
    borderColor: '#667085',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reels_img_big_cl: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text_editing_buttom_cl: {
    width: 50,
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D198F4',
  },
  text_editing_buttom_main_cl: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pos_create_text_cl: {
    position: 'absolute',
    top: '40%',
    borderRadius: 8,
    padding: 4,
    overflow: 'hidden',
  },
});
