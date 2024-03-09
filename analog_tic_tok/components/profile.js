import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { name_lastname_verification_f } from '../App_fun';
import { date_birth_verification_f } from '../App_fun';
import { checking_correct_mail_f } from '../App_fun';
import { phone_number_verification_f } from '../App_fun';

const http_web_code = '192.168.1.22:5000';
const local_bd_code = 'local_bd.txt';

export default function Profile_f({BG}) {

    const on_loading_f = BG[17]; // Функция запуска иконки загрузки;
    const off_loading_f = BG[18]; // Функция остановки иконки загрузки;
    const user_logout_f = BG[19]; // Функция остановки иконки загрузки;

    // Функция входа и выхода в или из настройки профиля;
    let [open_menu, set_open_menu] = useState({display: 'none'});
    function open_menu_f() {
        set_name_main_reg_text(BG[4][4]);
        set_lastname_main_reg_text(BG[4][5]);
        set_date_birth_main_reg_text(BG[4][6]);
        set_mail_main_reg_text(BG[4][7]);
        set_phone_main_reg_text(BG[4][3]);
        set_post_reg_text(BG[4][23]);
        set_descr_text(BG[4][24]);
        set_telegramm_main_reg_text(BG[4][25]);
        set_whatsapp_main_reg_text(BG[4][26]);
        set_web_main_reg_text(BG[4][27]);
        set_open_menu({display: 'flex'});
        if (BG[4][28]=='все') {set_advertising_by_2([BG[9], {display: 'none'}]); set_advertising_by_1([BG[1], {display: 'flex'}])}
        else {set_advertising_by_2([BG[1], {display: 'flex'}]); set_advertising_by_1([BG[9], {display: 'none'}])};
        if (BG[4][29]=='нет') {set_advertising_by_3([{display: 'none'}, BG[11], {justifyContent: 'flex-start'}])}
        else {set_advertising_by_3([{display: 'flex'}, BG[10], {justifyContent: 'flex-end'}])};
        if (BG[4][30]=='темный') {set_advertising_by_4([{display: 'flex'}, BG[11], {justifyContent: 'flex-start'}, {display: 'none'}])}
        else {set_advertising_by_4([{display: 'none'}, BG[10], {justifyContent: 'flex-end'}, {display: 'flex'}])};

    };
    function close_menu_f() {set_open_menu({display: 'none'})};

    //Функция изменения цвета рамки;
    let [frame_color_start, set_frame_color_start] = useState({borderColor: 'rgb(85, 84, 84)'});
    let [reg_button_ad_reject, set_reg_button_ad_reject] = useState({borderColor: '#FCFCFD'}); // Основной цвет рамки кнопки ("Принять и продолжить");
    let [frame_color, set_frame_color] = useState([
        frame_color_start, frame_color_start, frame_color_start, frame_color_start, frame_color_start,
        frame_color_start, frame_color_start, frame_color_start, frame_color_start, frame_color_start
    ]);
    function frame_color_f(num_inp) {
        set_frame_color([...frame_color.slice(0,num_inp), reg_button_ad_reject, ...frame_color.slice((num_inp+1),10)]);
    };

    // Функция изменения данных пользователя в сервере;
    let [name_main_reg_text, set_name_main_reg_text] = useState(''); // Имя пользователя;
    let [lastname_main_reg_text, set_lastname_main_reg_text] = useState(''); // Фамилия пользователя;
    let [date_birth_main_reg_text, set_date_birth_main_reg_text] = useState(''); // Дата рождения;
    let [mail_main_reg_text, set_mail_main_reg_text] = useState(''); // Электронная почта;
    let [phone_main_reg_text, set_phone_main_reg_text] = useState(''); // номер телефона;
    let [post_reg_text, set_post_reg_text] = useState(''); // пост пользователя;
    let [telegramm_main_reg_text, set_telegramm_main_reg_text] = useState(''); // ссылка на Телеграмм;
    let [whatsapp_main_reg_text, set_whatsapp_main_reg_text] = useState(''); // ссылка на WhatsApp;
    let [web_main_reg_text, set_web_main_reg_text] = useState(''); // ссылка на сайт;
    
    let [block_birth_main_reg_text, set_block_birth_main_reg_text] = useState(true);
    function block_birth_main_reg_text_f(text) {
        // Блок паузы ввода даты рождения;
        set_block_birth_main_reg_text(false);
        if (block_birth_main_reg_text === true) {
            set_date_birth_main_reg_text(date_birth_verification_f(text));
            setTimeout(() => { set_block_birth_main_reg_text(true) }, 300);
        } else {
            return (false)
        };
    };

    // Функция входа и выхода в или из настройки профиля;
    let [open_description_menu, set_open_description_menu] = useState({display: 'none'});
    function open_desc_menu_f() {set_open_description_menu({display: 'flex'})};
    function close_desc_menu_f() {set_open_description_menu({display: 'none'})};

    // Функция контроля количества символов в описании;
    let [descr_text, set_descr_text] = useState(''); // ;
    let [descr_text_count, set_descr_text_count] = useState(0);
    let [redy_color_text, set_redy_color_text] = useState({color: '#98A2B3'});
    let [redy_color_text_num, set_redy_color_text_num] = useState({color: '#98A2B3'});
    let [text_limit_close, set_text_limit_close] = useState({display: 'flex'});
    let [text_limit_open, set_text_limit_open] = useState({display: 'none'});
    function description_controlls_f(text) {
        let work_text = text.split('');
        if (work_text.length > 0) {set_redy_color_text({color: '#5925DC'})}
        else {set_redy_color_text({color: '#98A2B3'})};
        if (work_text.length > 80) {
            work_text = work_text.slice(0, 80);
            set_descr_text_count(work_text.length);
            work_text = work_text.join('');
            set_descr_text(work_text);
            set_text_limit_close({display: 'none'});
            set_text_limit_open({display: 'flex'});
        }
        else {
            work_text = work_text.join('');
            set_descr_text_count(work_text.length);
            set_descr_text(work_text);
            set_text_limit_close({display: 'flex'});
            set_text_limit_open({display: 'none'});
        };
        if (work_text.length === 80) {set_redy_color_text_num({color: '#5925DC'});}
        else {set_redy_color_text_num({color: '#98A2B3'});};
    };

    // Функция изменение данных о пользователе;
    function changing_user_data_f() {
        const fileUri = FileSystem.documentDirectory + local_bd_code;
        FileSystem.readAsStringAsync(fileUri)
            .then(content => {
                content = content.split('\n');
                user = content[0];
                password = content[1];
                chan_user_data_f(user, password);
            })
            .catch(error => console.error(error));

    };
    const work_fun = BG[7];
    const chan_user_data_f = async (login, password) => {
        on_loading_f();
        let i_story = 'все'; // сториз видят;
        let closed_account = 'нет'; // закрытый аккаунт;
        let dark_light_mode = 'темный'; // Темный/светлый режим;
        if (advertising_by_1[1].display === 'none') {i_story = 'Только подписчики'};
        if (advertising_by_3[0].display === 'flex') {closed_account = 'да'};
        if (advertising_by_4[0].display === 'none') {dark_light_mode = 'светлый'};
        try {
            const response = await axios.get(`http://${http_web_code}/changing_user_data?login=${login}&password=${password}&name=${name_main_reg_text}&lastname=${lastname_main_reg_text}&datebirth=${date_birth_main_reg_text}&mail=${mail_main_reg_text}&phone=${phone_main_reg_text}&post=${post_reg_text}&descr=${descr_text}&telegram=${telegramm_main_reg_text}&whatsapp=${whatsapp_main_reg_text}&web=${web_main_reg_text}&i_story=${i_story}&closed_account=${closed_account}&dark_light_mode=${dark_light_mode}`);
            let new_data = response.data;
            if (new_data === 'данные изменены') {
                console.log('данные изменены');
                setTimeout(()=>{
                    try {work_fun()}
                    catch {console.log('Перехват ощибки #1');}
                }, 300);
            };
        } catch {
            alert('Нет сигнала сети');
            off_loading_f();
        }
    };

    // Функция переключения блоков telegram/whatsapp/web;
    let [telegramm_block, set_telegramm_block] = useState([{display: 'flex'},{display: 'none'}]);
    function telegramm_block_open_close_f() {
        if (telegramm_block[0].display === 'flex') {set_telegramm_block([{display: 'none'},{display: 'flex'}])}
        else {set_telegramm_block([{display: 'flex'},{display: 'none'}])};
    };
    let [whatsapp_block, set_whatsapp_block] = useState([{display: 'flex'},{display: 'none'}]);
    function whatsapp_block_open_close_f() {
        if (whatsapp_block[0].display === 'flex') {set_whatsapp_block([{display: 'none'},{display: 'flex'}])}
        else {set_whatsapp_block([{display: 'flex'},{display: 'none'}])};
    };
    let [web_block, set_web_block] = useState([{display: 'flex'},{display: 'none'}]);
    function web_block_open_close_f() {
        if (web_block[0].display === 'flex') {set_web_block([{display: 'none'},{display: 'flex'}])}
        else {set_web_block([{display: 'flex'},{display: 'none'}])};
    };

    function close_tel_wat_web_f() {
        set_telegramm_block([{display: 'flex'},{display: 'none'}]);
        set_whatsapp_block([{display: 'flex'},{display: 'none'}]);
        set_web_block([{display: 'flex'},{display: 'none'}]);
        console.log(telegramm_main_reg_text);
        console.log(whatsapp_main_reg_text);
        console.log(web_main_reg_text);
    };

    // Функция загрузки фото (из галереи);
    let [image, setImage] = useState(null);
    const image_profile_f = async () => {
        setImage(null);
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
            setImage(result);
        }
    };

    useEffect(()=>{
        set_selected_image_f();
    }, [image]);

    // Функция показа и скрытия блока выбора изображения;
    let [img_url, set_img_url] = useState(require('./profile_photo.jpg'));
    let [selected_image, set_selected_image] = useState({display: 'none'});
    function set_selected_image_f() {
        try {
            let new_uri = image.assets[0].uri;
            console.log(new_uri);
            set_img_url({uri: new_uri});
            set_selected_image({display: 'flex'});
        }
        catch {console.log('Перехват ощибки №3')}
    };
    function set_selected_image_close_f() {
        set_selected_image({display: 'none'});
    };

    // Функция вывода логина и пароли для функции chan_user_profile_f();
    function changing_user_profile_f() {
        const fileUri = FileSystem.documentDirectory + local_bd_code;
        FileSystem.readAsStringAsync(fileUri)
            .then(content => {
                content = content.split('\n');
                user = content[0];
                password = content[1];
                chan_user_profile_f(user, password);
            })
            .catch(error => console.error(error));
    };

    // Функция загрузки фото профиля на сервер (POST запрос);
    let http_port = `http://${http_web_code}/changing_user_profile`;
    const chan_user_profile_f = async (login, password) => {
        const formData = new FormData();
        formData.append('login', login);
        formData.append('password', password);
        formData.append('image', {
            uri: image.assets[0].uri,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
        try {
            const response = await fetch(http_port, {
                method: 'POST',
                body: formData,
                headers: {'Content-Type': 'multipart/form-data'},
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {console.error('Error updating profile:', error)};
    };

    // Функция показа и скрытия блока выбора меню;
    let [menu_selection, set_menu_selection] = useState({display: 'none'}); // Меню "НАСТРОЙКИ";
    let [fog_menu_selection, set_fog_menu_selection] = useState({display: 'none'}); // Меню "Туман_НАСТРОЙКИ";
    let [menu, set_menu] = useState({display: 'none'}); // Меню "Настройки и конфиденциальность";
    function menu_selection_f() {
        try {
            set_menu({display: 'flex'});
            set_menu_selection({display: 'none'});
            set_fog_menu_selection({display: 'flex'});
        }
        catch {console.log('Перехват ощибки №3')}
    };
    function menu_selection_close_f() {
        set_menu_selection({display: 'none'});
        set_menu({display: 'none'});
        set_fog_menu_selection({display: 'none'});
    };

    // Функция нажатия на кнопку "Настройки и конфиденциальность";
    function setup_privacy_buttom_f() {
        set_menu({display: 'none'});
        set_menu_selection({display: 'flex'});
        set_fog_menu_selection({display: 'none'});
    };

    // выбор обложки;
    let [bg_image, set_bg_image] = useState(null);
    const bg_image_profile_f = async () => {
        set_bg_image(null);
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
            set_bg_image(result);
        }
    };

    useEffect(()=>{
        set_selected_bg_image_f()
    }, [bg_image]);

    // Функция показа и скрытия блока выбора изображения;
    let [bg_image_url, set_bg_image_url] = useState(require('./bg_photo.jpg'));
    function set_selected_bg_image_f() {
        try {
            let new_uri = bg_image.assets[0].uri;
            console.log(new_uri);
            set_bg_image_url({uri: new_uri});
            bg_selection_block_f();
        }
        catch {console.log('Перехват ощибки №5')}
    };

    // Функция нажатия на кнопку "Изменить обложку";
    let [bg_selection_block, set_bg_selection_block] = useState({display: 'none'});
    function bg_selection_block_f() {
        set_menu({display: 'none'});
        set_menu_selection({display: 'none'});
        set_fog_menu_selection({display: 'none'});
        set_bg_selection_block({display: 'flex'});
    };
    function bg_selection_block_close_f() {
        set_bg_selection_block({display: 'none'});
    };

    // Функция вывода логина и пароли для функции chan_user_profile_f();
    function changing_user_bg_log_f() {
        const fileUri = FileSystem.documentDirectory + local_bd_code;
        FileSystem.readAsStringAsync(fileUri)
            .then(content => {
                content = content.split('\n');
                user = content[0];
                password = content[1];
                changing_user_bg_f(user, password);
            })
            .catch(error => console.error(error));
    };

    // Функция загрузки фона сервер (POST запрос);
    let http_port_bg = `http://${http_web_code}/changing_user_bg`;
    const changing_user_bg_f = async (login, password) => {
        const formData = new FormData();
        formData.append('login', login);
        formData.append('password', password);
        formData.append('image', {
            uri: bg_image.assets[0].uri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        try {
            const response = await fetch(http_port_bg, {
                method: 'POST',
                body: formData,
                headers: {'Content-Type': 'multipart/form-data'},
            });
            const data = await response.json();
            console.log(data);
            bg_selection_block_close_f();
            work_fun();
        } catch (error) {console.error('Error updating profile:', error)};
    };

    // Функция переключателей "Мои сториз видят";
    let [storisa_menu_close_open, set_storisa_menu_close_open] = useState([{display: 'flex'}, {display: 'none'}]);
    function storisa_menu_close_open_f() {
        // Основное переключение;
        if (storisa_menu_close_open[1].display === 'none') {set_storisa_menu_close_open([{display: 'none'}, {display: 'flex'}])}
        else {set_storisa_menu_close_open([{display: 'flex'}, {display: 'none'}])};
        if (BG[4][28]==='все') {the_all_button_f()}
        else {subscribers_only_button_f()};
    };
    let [advertising_by_1, set_advertising_by_1] = useState([BG[1], {display: 'none'}]);
    function the_all_button_f() {
        // Установка флажка на кномке "ВСЕ";
        if (advertising_by_1[1].display === 'flex') {set_advertising_by_1([BG[9], {display: 'none'}]); set_advertising_by_2([BG[1], {display: 'flex'}])}
        else {set_advertising_by_1([BG[1], {display: 'flex'}]); set_advertising_by_2([BG[9], {display: 'none'}])};
    };
    let [advertising_by_2, set_advertising_by_2] = useState([BG[1], {display: 'none'}]);
    function subscribers_only_button_f() {
        // Установка флажка на кнопке "Только подписчики";
        if (advertising_by_2[1].display === 'flex') {set_advertising_by_2([BG[9], {display: 'none'}]); set_advertising_by_1([BG[1], {display: 'flex'}])}
        else {set_advertising_by_2([BG[1], {display: 'flex'}]); set_advertising_by_1([BG[9], {display: 'none'}])};
    };

    // Функция переключения режима кнопки "Закрытый аккаунт";
    let [advertising_by_3, set_advertising_by_3] = useState([{display: 'none'}, BG[11], {justifyContent: 'flex-start'}]);
    function closed_account_buttom_f() {
        if (advertising_by_3[0].display === 'none') {set_advertising_by_3([{display: 'flex'}, BG[10], {justifyContent: 'flex-end'}])}
        else {set_advertising_by_3([{display: 'none'}, BG[11], {justifyContent: 'flex-start'}])};
    };

    // Функция переключения режима кнопки "Темный/светлый режим";
    let [advertising_by_4, set_advertising_by_4] = useState([{display: 'flex'}, BG[11], {justifyContent: 'flex-start'}, {display: 'none'}]);
    function dark_light_mode_buttom_f() {
        if (advertising_by_4[0].display === 'flex') {set_advertising_by_4([{display: 'none'}, BG[10], {justifyContent: 'flex-end'}, {display: 'flex'}])}
        else {set_advertising_by_4([{display: 'flex'}, BG[11], {justifyContent: 'flex-start'}, {display: 'none'}])};
        try {work_fun()}
        catch {console.log('Перехват ощибки #4');}
    };

    // Удаление Аккаунта;
    let [del_status, set_del_status] = useState([{display: 'flex'}, {display: 'none'}]);
    function change_of_status_f() {
        if (BG[4][21]==='удален') {set_del_status([{display: 'none'}, {display: 'flex'}])}
        else {set_del_status([{display: 'flex'}, {display: 'none'}])};
    };
    useEffect(()=>{change_of_status_f()},[BG[4][21]])
    function del_creat_accaunt_f(del_creat) {
        on_loading_f();
        // Функция изменение данных о пользователе;
        const fileUri = FileSystem.documentDirectory + local_bd_code;
        FileSystem.readAsStringAsync(fileUri)
            .then(content => {
                content = content.split('\n');
                user = content[0];
                password = content[1];
                delete_user_f(user, password);
            })
            .catch(error => console.error(error));
        const delete_user_f = async (login, password) => {
            try {
                const response = await axios.get(`http://${http_web_code}/delete_create_user?login=${login}&password=${password}&del_creat=${del_creat}`);
                let new_data = response.data;
                if (new_data === 'аккаунт удален') {
                    console.log('аккаунт удален');
                    setTimeout(() => {
                        try { work_fun(); menu_selection_close_f()}
                        catch { console.log('Перехват ощибки #6'); }
                    }, 300);
                };
            } catch { alert('Нет сигнала сети') }
        };
    };

    return(
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            {/*===ФОНОВАЯ_ЗОНА===*/}
            <View style={del_status[0]}>
                {/*===ФОНОВАЯ_ЗОНА===*/}
                <View style={{ width: '100%', height: 218, }}>
                    <ImageBackground
                        source={BG[5]}
                        resizeMode='cover'
                        style={[{ width: '100%', height: '100%' }]}>
                    </ImageBackground>
                    {/*===КНОПКА_НАСТРОЙКИ===*/}
                    <TouchableOpacity onPress={() => { menu_selection_f() }}>
                        <View style={[BG[0], styles.menu_buttom_cl]}>
                            <View style={[{ width: 4, height: 4, borderRadius: 1, }, BG[1]]}>{/*точка*/}</View>
                            <View style={[{ width: 4, height: 4, borderRadius: 1, }, BG[1]]}>{/*точка*/}</View>
                            <View style={[{ width: 4, height: 4, borderRadius: 1, }, BG[1]]}>{/*точка*/}</View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*===КОНТАКТНАЯ_ЗОНА===*/}
                <View style={{ height: 50 }}>
                    {/*===АВАТАРКА===*/}
                    <View style={styles.avatar_block_cl}>
                        <ImageBackground
                            source={BG[6]}
                            resizeMode='cover'
                            style={[styles.avatar_img_cl, { width: '100%', height: '100%' },]}>
                        </ImageBackground>
                    </View>
                    {/*===ПОДПИСКИ===*/}
                    <View style={styles.subscriptions_block_cl}>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Text style={[BG[2], { fontSize: 20, fontWeight: 'bold' }]}>0</Text>
                            <Text style={{ color: '#98A2B3', fontSize: 14, }}>Статусов</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Text style={[BG[2], { fontSize: 20, fontWeight: 'bold' }]}>0</Text>
                            <Text style={{ color: '#98A2B3', fontSize: 14, }}>Подписчики</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Text style={[BG[2], { fontSize: 20, fontWeight: 'bold' }]}>0</Text>
                            <Text style={{ color: '#98A2B3', fontSize: 14, }}>Подписки</Text>
                        </View>
                    </View>
                </View>
                {/*===ИНФОРМАЦИОННАЯ_ЗОНА===*/}
                <View style={[styles.info_block_cl]}>
                    <View style={styles.info_login_block_cl}>
                        <View style={{ paddingRight: 8, borderRightWidth: 2, borderRightColor: '#98A2B3' }}><Text style={[BG[2], { fontSize: 20 }]}>{BG[4][1]}</Text></View>
                        <View style={{ paddingLeft: 8 }}><Text style={[BG[2], { fontSize: 20 }]}>{BG[4][23]}</Text></View>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={styles.info_description_block_cl}>{BG[4][24]}</Text>
                    </View>
                    <View style={{ height: 8 }}>{/*===БУФЕР===*/}</View>
                    <View style={styles.info_buttom_block_cl}>
                        <TouchableOpacity onPress={() => { open_menu_f() }}>
                            <View style={[styles.info_buttom_cl, { width: 151, }, BG[3]]}>
                                <Text style={[BG[2], { fontSize: 16, }]}>Изменить</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.info_buttom_cl, { width: 191, }, BG[3]]}>
                                <Text style={[BG[2], { fontSize: 16, }]}>Поделиться профилем</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '90%', height: 14, borderColor: '#D0D5DD', borderBottomWidth: 1 }}>{/*===БУФЕР===*/}</View>
                </View>
                {/*===СКРОЛЛ_ЗОНА===*/}
                <ScrollView style={{height: '45%'}}>
                    <View style={{marginHorizontal: '5%', marginVertical: 20}}>
                        <Text style={[BG[2], {fontSize: 20, fontWeight: 'bold'}]}>Сторицы</Text>
                    </View>
                    <FlatList style={styles.FlatList_1_cl} data={BG[16]} renderItem={({ item })=>(
                        <View style={styles.scrols_reels_cl}>
                            <TouchableOpacity>
                                <View style={styles.reels_block_cl}>
                                    <ImageBackground
                                        source={{ uri: item[0] }}
                                        resizeMode='cover'
                                        style={[styles.reels_img_cl]}>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <View style={{height: 86, display: 'flex', justifyContent: 'center'}}>
                                <View style={{width: '68%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={[BG[2], {fontSize: 20}]}>{item[1]}</Text>
                                    <Text style={[BG[2], {fontSize: 12, color: '#98A2B3'}]}>{item[3]} г.</Text>
                                </View>
                                <Text style={[BG[2], {fontSize: 16, color: '#98A2B3'}]}>{item[2]}</Text>
                            </View>
                        </View>
                    )}/>
                </ScrollView>


                {/*=============СКРЫТОЕ_МЕНЮ=============*/}
                <View style={[styles.open_menu_cl, open_menu, BG[0]]}>
                    <View style={styles.smartphone_camerabuffer}>{/*БУФЕР*/}</View>
                    {/*===ШАПКА===*/}
                    <View style={styles.text_1_block_two_cl}>
                        <TouchableOpacity onPress={() => { on_loading_f(), close_menu_f(); changing_user_data_f(); close_tel_wat_web_f() }}>
                            <ImageBackground
                                source={BG[8]}
                                resizeMode='cover'
                                style={[{ width: 24, height: 24 }]}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <Text style={[styles.text_1_cl, BG[2]]}>Редактировать профиль</Text>
                        <View>{/*БУФЕР*/}</View>
                    </View>
                    {/*===ТЕЛО===*/}
                    <View style={{ width: '100%', height: '50%'}}>
                        <ScrollView>
                            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/*===НАСТРОЙКА_АВАТАРА===*/}
                                <View style={styles.avatar_menu_cl}>
                                    <View style={{ width: 78, height: 78, borderRadius: 39, overflow: 'hidden', }}>
                                        <ImageBackground
                                            source={BG[6]}
                                            resizeMode='cover'
                                            style={[{ width: 78, height: 78, }]}>
                                        </ImageBackground>
                                    </View>
                                    <TouchableOpacity onPress={() => { image_profile_f() }}>
                                        <Text style={{ color: '#5925DC', fontSize: 14 }}>Изменить фото или аватар </Text>
                                    </TouchableOpacity>
                                </View>
                                {/*===О_ВАС===*/}
                                <View style={{ width: '90%' }}>
                                    <Text style={{ color: '#667085', fontSize: 14, marginTop: 20 }}>О вас</Text>
                                    <View style={[styles.reg_text_block_cl, frame_color[0]]}>
                                        <TextInput
                                            style={[styles.reg_text_cl, BG[2]]}
                                            placeholder='Имя'
                                            placeholderTextColor={'#667085'}
                                            value={name_main_reg_text}
                                            onChangeText={(text) => { set_name_main_reg_text(name_lastname_verification_f(text)), frame_color_f(0) }}
                                            maxLength={30}
                                        />
                                    </View>
                                    <View style={[styles.reg_text_block_cl, frame_color[1]]}>
                                        <TextInput
                                            style={[styles.reg_text_cl, BG[2]]}
                                            placeholder='Фамилия'
                                            placeholderTextColor={'#667085'}
                                            value={lastname_main_reg_text}
                                            onChangeText={(text) => { set_lastname_main_reg_text(name_lastname_verification_f(text)), frame_color_f(1) }}
                                            maxLength={30}
                                        />
                                    </View>
                                    <View style={[styles.reg_text_block_cl, frame_color[2]]}>
                                        <TextInput
                                            style={[styles.reg_text_cl, BG[2]]}
                                            placeholder='Дата рождения (дд.мм.гггг)'
                                            placeholderTextColor={'#667085'}
                                            value={date_birth_main_reg_text}
                                            editable={block_birth_main_reg_text}
                                            onChangeText={(text) => { block_birth_main_reg_text_f(text), frame_color_f(2) }}
                                            maxLength={10}
                                        />
                                    </View>
                                    <View style={[styles.reg_text_block_cl, frame_color[6]]}>
                                        <TextInput
                                            style={[styles.reg_text_cl, BG[2]]}
                                            placeholder='Пост'
                                            placeholderTextColor={'#667085'}
                                            value={post_reg_text}
                                            onChangeText={(text) => { set_post_reg_text(text), frame_color_f(6) }}
                                            maxLength={80}
                                        />
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                                        <Text style={[BG[2], { fontSize: 16 }]}>Описание</Text>
                                        <TouchableOpacity onPress={() => { open_desc_menu_f() }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                                <Text style={{ fontSize: 14, color: '#667085' }}>Добавить описание</Text>
                                                <ImageBackground
                                                    source={require('./main_consols/arrow_forward_ios.png')}
                                                    resizeMode='cover'
                                                    style={[{ width: 16, height: 16, }]}>
                                                </ImageBackground>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/*===ЛИЧНАЯ_ИНФОРМАЦИЯ===*/}
                                <View style={{ width: '100%', borderTopWidth: 2, borderColor: '#D0D5DD', }}>{/*ЛИНИЯ*/}</View>
                                <View style={{ width: '90%', paddingBottom: 20 }}>
                                    <Text style={{ color: '#667085', fontSize: 14, marginTop: 20 }}>Личная информация</Text>
                                    <View style={[styles.reg_text_block_cl, frame_color[4]]}>
                                        <TextInput
                                            style={[styles.reg_text_cl, BG[2]]}
                                            placeholder='Электронная почта'
                                            placeholderTextColor={'#667085'}
                                            value={mail_main_reg_text}
                                            onChangeText={(text) => { set_mail_main_reg_text(checking_correct_mail_f(text)), frame_color_f(4) }}
                                            maxLength={40}
                                        />
                                    </View>
                                    <View style={[styles.reg_text_block_cl, frame_color[5]]}>
                                        <TextInput
                                            style={[styles.reg_text_cl, BG[2]]}
                                            placeholder='Номер телефона'
                                            placeholderTextColor={'#667085'}
                                            value={phone_main_reg_text}
                                            onChangeText={(text) => { set_phone_main_reg_text(phone_number_verification_f(text)), frame_color_f(5) }}
                                            maxLength={20}
                                        />
                                    </View>
                                </View>
                                {/*===СОЦИАЛЬНЫЕ_ПРИЛОЖЕНИЯ===*/}
                                <View style={{ width: '100%', borderTopWidth: 2, borderColor: '#D0D5DD', }}>{/*ЛИНИЯ*/}</View>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ color: '#667085', fontSize: 14, marginTop: 20, marginBottom: 10 }}>Социальные приложения</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center' }}>
                                        <Text style={[BG[2], { fontSize: 16 }]}>Telegram</Text>
                                        <TouchableOpacity onPress={() => { telegramm_block_open_close_f() }}>
                                            <View style={[{ display: 'flex', flexDirection: 'row', gap: 5 }, telegramm_block[0]]}>
                                                <Text style={{ fontSize: 14, color: '#667085' }}>Добавить Telegram</Text>
                                                <ImageBackground
                                                    source={require('./main_consols/arrow_forward_ios.png')}
                                                    resizeMode='cover'
                                                    style={[{ width: 16, height: 16, }]}>
                                                </ImageBackground>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={[styles.reg_text_block_cl, frame_color[7], telegramm_block[1]]}>
                                            <TextInput
                                                style={[styles.reg_text_cl, BG[2]]}
                                                placeholder='ссылка на Telegram'
                                                placeholderTextColor={'#667085'}
                                                value={telegramm_main_reg_text}
                                                onChangeText={(text) => { set_telegramm_main_reg_text(text), frame_color_f(7) }}
                                                maxLength={160}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center' }}>
                                        <Text style={[BG[2], { fontSize: 16 }]}>WhatsApp</Text>
                                        <TouchableOpacity onPress={() => { whatsapp_block_open_close_f() }}>
                                            <View style={[{ display: 'flex', flexDirection: 'row', gap: 5 }, whatsapp_block[0]]}>
                                                <Text style={{ fontSize: 14, color: '#667085' }}>Добавить WhatsApp </Text>
                                                <ImageBackground
                                                    source={require('./main_consols/arrow_forward_ios.png')}
                                                    resizeMode='cover'
                                                    style={[{ width: 16, height: 16, }]}>
                                                </ImageBackground>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={[styles.reg_text_block_cl, frame_color[8], whatsapp_block[1]]}>
                                            <TextInput
                                                style={[styles.reg_text_cl, BG[2]]}
                                                placeholder='ссылка на WhatsApp'
                                                placeholderTextColor={'#667085'}
                                                value={whatsapp_main_reg_text}
                                                onChangeText={(text) => { set_whatsapp_main_reg_text(text), frame_color_f(8) }}
                                                maxLength={160}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginBottom: 100, alignItems: 'center' }}>
                                        <Text style={[BG[2], { fontSize: 16 }]}>Сайт</Text>
                                        <TouchableOpacity onPress={() => { web_block_open_close_f() }}>
                                            <View style={[{ display: 'flex', flexDirection: 'row', gap: 5 }, web_block[0]]}>
                                                <Text style={{ fontSize: 14, color: '#667085' }}>Добавить Сайт</Text>
                                                <ImageBackground
                                                    source={require('./main_consols/arrow_forward_ios.png')}
                                                    resizeMode='cover'
                                                    style={[{ width: 16, height: 16, }]}>
                                                </ImageBackground>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={[styles.reg_text_block_cl, frame_color[9], web_block[1]]}>
                                            <TextInput
                                                style={[styles.reg_text_cl, BG[2]]}
                                                placeholder='ссылка на WEB сайт'
                                                placeholderTextColor={'#667085'}
                                                value={web_main_reg_text}
                                                onChangeText={(text) => { set_web_main_reg_text(text), frame_color_f(9) }}
                                                maxLength={160}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

                {/*=============СКРЫТОЕ_МЕНЮ_ОПИСАНИЯ=============*/}
                <View style={[styles.open_menu_cl, open_description_menu, BG[0], { zIndex: 1001 }]}>
                    <View style={styles.smartphone_camerabuffer}>{/*БУФЕР*/}</View>
                    {/*===ШАПКА===*/}
                    <View style={styles.text_1_block_two_cl}>
                        <TouchableOpacity onPress={() => { close_desc_menu_f() }}>
                            <ImageBackground
                                source={BG[8]}
                                resizeMode='cover'
                                style={[{ width: 24, height: 24 }]}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <Text style={[styles.text_1_cl, BG[2], text_limit_close]}>Описание</Text>
                        <View style={[styles.text_limit_open_cl, text_limit_open]}><Text style={[styles.text_1_cl, BG[2], { fontSize: 14 }]}>Повышен лимит символов</Text></View>
                        <Text style={[{ color: '#98A2B3', fontSize: 14 }, redy_color_text]}>Готова</Text>
                    </View>
                    {/*===ТЕЛО===*/}
                    <View style={{ width: '90%', marginTop: 20 }}>
                        <View>
                            <TextInput
                                style={[styles.reg_text_cl, BG[2], { height: '45%', width: '90%', fontSize: 16 }]}
                                placeholder='Добавить описание'
                                placeholderTextColor={'#667085'}
                                multiline={true}
                                numberOfLines={8}
                                value={descr_text}
                                onChangeText={(text) => { description_controlls_f(text) }}
                                maxLength={300}
                            />
                        </View>
                        <View style={styles.disr_count_cl}>
                            <Text style={[{ fontSize: 16 }, redy_color_text_num]}>{descr_text_count}</Text>
                            <Text style={{ fontSize: 16, color: '#98A2B3' }}>/</Text>
                            <Text style={{ fontSize: 16, color: '#98A2B3' }}>80</Text>
                        </View>
                    </View>
                </View>

                {/*=============СКРЫТОЕ_МЕНЮ_ВЫБОРА_ИЗОБРАЖЕНИЯ=============*/}
                <View style={[styles.image_selection_cl, BG[0], selected_image]}>
                    <View>{/*БУФЕР*/}</View>
                    <View style={[styles.the_selected_image_cl]}>
                        <ImageBackground
                            source={img_url}
                            resizeMode='cover'
                            style={[{ width: '100%', height: '100%', borderRadius: 173, overflow: 'hidden', }]}>
                        </ImageBackground>
                    </View>
                    <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { set_selected_image_close_f() }}>
                            <View style={[styles.selected_image_button_cl, BG[9]]}>
                                <Text style={[{ fontSize: 12 }, BG[2]]}>Отмена</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { on_loading_f(), set_selected_image_close_f(); changing_user_profile_f(); changing_user_data_f() }}>
                            <View style={styles.text_main_button_block_cl}>
                                <Text style={{ color: '#FCFCFD', fontSize: 12 }}>Сохранить и опубликовать</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: '50%'}}>{/*БУФЕР*/}</View>
                </View>

                {/*=============СКРЫТОЕ_МЕНЮ_НАСТРОЙКИ/УСТАНОВКА_ФОНА/УДАЛЕНИЕ=============*/}
                <View style={[{ position: 'absolute', top: 0, left: 0, width: '100%', height: 5000, backgroundColor: 'black', opacity: 0.4, zIndex: 1001 }, fog_menu_selection]}>{/*БУФЕР*/}</View>
                <View style={[styles.menu_bg_del_cl, BG[3], menu, {width: '100%'}]}>
                    <TouchableOpacity onPress={() => { menu_selection_close_f() }}>
                        <View style={{ marginVertical: 15 }}>
                            <View style={[{ width: 50, height: 5, borderRadius: 2.5, backgroundColor: '#080808' }]}>
                                {/*НАКЛЕЙКА*/}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', paddingLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <ImageBackground
                            source={BG[14]}
                            resizeMode='cover'
                            style={{ width: 32, height: 32 }}>
                        </ImageBackground>
                        <TouchableOpacity style={{width: '75%'}} onPress={() => { setup_privacy_buttom_f() }}>
                            <View style={{ height: 60, width: '100%', borderBottomWidth: 1, borderBottomColor: '#667085', marginLeft: 20, display: 'flex', justifyContent: 'center' }}>
                                <Text style={[{ fontSize: 16, }, BG[2]]}>Настройки и конфиденциальность</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', paddingLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <ImageBackground
                            source={BG[15]}
                            resizeMode='cover'
                            style={{ width: 32, height: 32 }}>
                        </ImageBackground>
                        <TouchableOpacity style={{width: '75%'}} onPress={() => { bg_image_profile_f() }}>
                            <View style={{ height: 60, width: '100%', borderBottomWidth: 1, borderBottomColor: '#667085', marginLeft: 20, display: 'flex', justifyContent: 'center' }}>
                                <Text style={[{ fontSize: 16, }, BG[2]]}>Изменить обложку</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', paddingLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <ImageBackground
                            source={require('./main_consols/user_logout.png')}
                            resizeMode='cover'
                            style={{ width: 32, height: 32 }}>
                        </ImageBackground>
                        <TouchableOpacity style={{width: '75%'}} onPress={() => { user_logout_f(); menu_selection_close_f() }}>
                            <View style={{ height: 60, width: '100%', borderBottomWidth: 1, borderBottomColor: '#667085', marginLeft: 20, display: 'flex', justifyContent: 'center' }}>
                                <Text style={[{ fontSize: 16 }, BG[2]]}>Выйти с аккаунта</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', paddingLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <ImageBackground
                            source={require('./main_consols/delete.png')}
                            resizeMode='cover'
                            style={{ width: 32, height: 32 }}>
                        </ImageBackground>
                        <TouchableOpacity onPress={() => { del_creat_accaunt_f('удален') }}>
                            <View style={{ height: 60, width: '100%', marginLeft: 20, display: 'flex', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: '#D92D20' }}>Удалить аккаунт</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*=============СКРЫТОЕ_МЕНЮ_НАСТРОЙКИ=============*/}
                <View style={[styles.menu_selection_cl, BG[0], menu_selection]}>
                    <View style={styles.smartphone_camerabuffer}>{/*БУФЕР*/}</View>
                    {/*===ШАПКА===*/}
                    <View style={styles.text_1_block_two_cl}>
                        <TouchableOpacity onPress={() => { on_loading_f(), menu_selection_close_f(); storisa_menu_close_open_f(); changing_user_data_f() }}>
                            <ImageBackground
                                source={BG[8]}
                                resizeMode='cover'
                                style={[{ width: 24, height: 24 }]}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <Text style={[styles.text_1_cl, BG[2]]}>Настройки и конфиденциальность </Text>
                        <View>{/*БУФЕР*/}</View>
                    </View>
                    {/*===ТЕЛО===*/}
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/*Мои сторизы видят*/}
                        <View style={[{ width: '100%', borderBottomWidth: 1, borderColor: '#D0D5DD', display: 'flex', flexDirection: 'row', justifyContent: 'center' }, storisa_menu_close_open[0],]}>
                            <View style={{ width: '90%', height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[BG[2], { fontSize: 16 }]}>Мои сторизы видят</Text>
                                <TouchableOpacity onPress={() => { storisa_menu_close_open_f() }}>
                                    <View style={[BG[10], { width: 45, height: 25, borderRadius: 12.5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }]}>
                                        <View style={[BG[12], { width: 22, height: 22, borderRadius: 11, margin: 2 }]}>{/*ШАР*/}</View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{ width: '100%', borderBottomWidth: 1, borderColor: '#D0D5DD', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, storisa_menu_close_open[1],]}>
                            <Text style={{ width: '90%', fontSize: 14, color: '#667085', marginBottom: 10, marginTop: 20 }}>Мои сторисы видят</Text>
                            {/*Все*/}
                            <View style={{ width: '90%', height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 15 }}>
                                <TouchableOpacity onPress={() => { the_all_button_f() }}>
                                    <View style={[styles.reg_check_mark_cl, advertising_by_1[0]]}>
                                        <View style={advertising_by_1[1]}>
                                            <Text style={[BG[13]]}>&#10004;</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <Text style={[BG[2], { fontSize: 16 }]}>Все</Text>
                            </View>
                            {/*Только подписчики*/}
                            <View style={{ marginBottom: 10, width: '90%', height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 15 }}>
                                <TouchableOpacity onPress={() => { subscribers_only_button_f() }}>
                                    <View style={[styles.reg_check_mark_cl, advertising_by_2[0]]}>
                                        <View style={advertising_by_2[1]}>
                                            <Text style={[BG[13]]}>&#10004;</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <Text style={[BG[2], { fontSize: 16 }]}>Только подписчики</Text>
                            </View>
                        </View>
                        {/*Закрытый аккаунт*/}
                        <Text style={[{ width: '90%', fontSize: 14, color: '#667085', marginBottom: 0, marginTop: 15 }, advertising_by_3[0]]}>Конфиденциальность аккаунта</Text>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#D0D5DD', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ width: '90%', height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[BG[2], { fontSize: 16 }]}>Закрытый аккаунт</Text>
                                <TouchableOpacity onPress={() => { closed_account_buttom_f() }}>
                                    <View style={[{ width: 45, height: 25, borderRadius: 12.5, display: 'flex', flexDirection: 'row' }, advertising_by_3[1], advertising_by_3[2]]}>
                                        <View style={[BG[12], { width: 22, height: 22, borderRadius: 11, margin: 2 }]}>{/*ШАР*/}</View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*Темный/светлый режим*/}
                        <Text style={[{ width: '90%', fontSize: 14, color: '#667085', marginBottom: 0, marginTop: 15 }, advertising_by_4[0]]}>Темный режим</Text>
                        <Text style={[{ width: '90%', fontSize: 14, color: '#667085', marginBottom: 0, marginTop: 15 }, advertising_by_4[3]]}>Светлый режим</Text>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#D0D5DD', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ width: '90%', height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[BG[2], { fontSize: 16 }]}>Темный/светлый режим</Text>
                                <TouchableOpacity onPress={() => { dark_light_mode_buttom_f() }}>
                                    <View style={[{ width: 45, height: 25, borderRadius: 12.5, display: 'flex', flexDirection: 'row' }, advertising_by_4[1], advertising_by_4[2]]}>
                                        <View style={[BG[12], { width: 22, height: 22, borderRadius: 11, margin: 2 }]}>{/*ШАР*/}</View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/*=============ИЗМЕНЕНИЕ_ФОНА_(ПРЕДОСМОТР)=============*/}
                <View style={[styles.menu_selection_cl, BG[0], bg_selection_block, {top: '-60%'}]}>
                    <View style={styles.smartphone_camerabuffer}>{/*БУФЕР*/}</View>
                    {/*===ШАПКА===*/}
                    <View style={styles.text_1_block_three_cl}>
                    </View>
                    {/*===ТЕЛО===*/}
                    <View style={{ width: '100%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, justifyContent: 'space-around' }}>
                        <View>{/*БУФЕР*/}</View>
                        {/*===ФОНОВАЯ_ЗОНА===*/}
                        <View style={{ width: '100%', height: 218, }}>
                            <ImageBackground
                                source={bg_image_url}
                                style={[{ height: 218, resizeMode: 'cover', backgroundPosition: 'center -100px', }]} />
                            {/*===АВАТАРКА===*/}
                            <View style={styles.avatar_block_cl}>
                                <ImageBackground
                                    source={BG[6]}
                                    resizeMode='cover'
                                    style={[styles.avatar_img_cl, { width: '100%', height: '100%' },]}>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 15 }}>
                            <TouchableOpacity onPress={() => { changing_user_bg_log_f() }}>
                                <View style={[{ width: '90%', height: 39, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }, BG[1]]}>
                                    <Text style={[{ fontSize: 16 }, BG[13]]}>Установить обложку</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { bg_image_profile_f() }}>
                                <View style={[{ width: '90%', height: 39, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }, BG[1]]}>
                                    <Text style={[{ fontSize: 16 }, BG[13]]}>Выбрать другое изображение</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { bg_selection_block_close_f() }}>
                                <View style={[{ width: '90%', height: 39, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1D2939', borderRadius: 8 }, BG[3]]}>
                                    <Text style={[{ fontSize: 16 }, BG[2]]}>Отмена</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {/*УДАЛЕННЫЙ_ПРОФИЛЬ*/}
            <View style={[del_status[1]]}>
                {/*===ФОНОВАЯ_ЗОНА===*/}
                <View style={{ width: '100%', height: 218, }}>
                    <ImageBackground
                        source={require('./delete_profile.jpg')}
                        resizeMode='cover'
                        style={[{ width: '100%', height: '100%' }]}>
                    </ImageBackground>
                    {/*===КНОПКА_НАСТРОЙКИ===*/}
                    <TouchableOpacity onPress={() => { menu_selection_f() }}>
                        <View style={[BG[0], styles.menu_buttom_cl]}>
                            <View style={[{ width: 4, height: 4, borderRadius: 1, }, BG[1]]}>{/*точка*/}</View>
                            <View style={[{ width: 4, height: 4, borderRadius: 1, }, BG[1]]}>{/*точка*/}</View>
                            <View style={[{ width: 4, height: 4, borderRadius: 1, }, BG[1]]}>{/*точка*/}</View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*===КОНТАКТНАЯ_ЗОНА===*/}
                <View style={{ height: 50 }}>
                    {/*===АВАТАРКА===*/}
                    <View style={styles.avatar_block_cl}>
                        <ImageBackground
                            source={require('./delete_profile.jpg')}
                            resizeMode='cover'
                            style={[styles.avatar_img_cl, { width: '100%', height: '100%' },]}>
                        </ImageBackground>
                    </View>
                    {/*===ПОДПИСКИ===*/}
                    <View style={styles.subscriptions_block_cl}>
                        <Text style={[{fontSize: 18}, BG[2]]}>Аккаунт удален</Text>
                    </View>
                </View>
                {/*===ВОСТАНОВЛЕНИЕ===*/}
                <View style={[{ position: 'absolute', top: 0, left: 0, width: '100%', height: 5000, backgroundColor: 'black', opacity: 0.4, zIndex: 1001 }, fog_menu_selection]}>{/*БУФЕР*/}</View>
                <View style={[styles.menu_bg_del_cl, {height: '150%', top: '200%'}, BG[3], menu]}>
                    <TouchableOpacity onPress={() => { menu_selection_close_f() }}>
                        <View style={{ marginVertical: 15 }}>
                            <View style={[{ width: 50, height: 5, borderRadius: 2.5, backgroundColor: '#080808' }]}>
                                {/*НАКЛЕЙКА*/}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <TouchableOpacity onPress={() => { del_creat_accaunt_f('') }}>
                            <View style={{ height: 40, width: '100%', borderBottomWidth: 1, borderBottomColor: '#667085', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={[{ fontSize: 16, }, BG[2]]}>Восстановить акаунт</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menu_buttom_cl: {
        position: 'absolute',
        top: -180,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
    },
    avatar_block_cl: {
        position: 'relative',
        top: -30,
        left: 20,
        width: 102,
        height: 102,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#5925DC',
    },
    avatar_img_cl: {
        width: 100,
        height: 100,
        borderRadius: 51,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FCFCFD',
    },
    subscriptions_block_cl: {
        position: 'relative',
        top: -90,
        right: -130,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '65%',
    },
    info_block_cl: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
        gap: 5,
    },
    info_login_block_cl: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-start',
    },
    info_description_block_cl: {
        color: '#98A2B3',
        fontSize: 14,
    },
    info_buttom_block_cl: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info_buttom_cl: {
        height: 39,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1D2939',
    },
    text_1_block_two_cl: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#D0D5DD',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    x_cl: {
        fontSize: 36,
        fontWeight: '100',
    },
    text_1_cl: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    smartphone_camerabuffer: {
        height: 44,
    },
    open_menu_cl: {
        width: '100%',
        height: '200%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatar_menu_cl: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 20,
        paddingTop: 20,
        borderBottomWidth: 2,
        borderColor: '#D0D5DD',
    },
    reg_text_block_cl: {
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 4,
        padding: 6,
        paddingHorizontal: 12,
    },
    reg_text_cl: {
        fontSize: 14,
    },
    disr_count_cl: {
        borderTopWidth: 2,
        borderColor: '#D0D5DD',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 15,
    },
    text_limit_open_cl: {
        backgroundColor: '#1D2939',
        width: 198,
        height: 36,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image_selection_cl: {
        width: '100%',
        height: '200%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1002,
    },
    selected_image_button_cl: {
        width: 171,
        height: 38,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    the_selected_image_cl: {
        width: 346,
        height: 346,
    },
    text_main_button_block_cl: {
        width: 171,
        height: 38,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5925DC',
    },
    menu_selection_cl: {
        width: '100%',
        height: '200%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1002,
    },
    reg_check_mark_cl: {
        width: 24,
        height: 24,
        borderRadius: 2,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu_bg_del_cl: {
        borderRadius: 12,
        width: '100%',
        height: '70%',
        position: 'absolute',
        top: '65%',
        left: 0,
        zIndex: 1002,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text_1_block_three_cl: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fog_select_img: {
        width: '100%',
        position: 'relative',
        left: 0,
        backgroundColor: 'black',
        opacity: 0.6,
    },
    fog_viewing_img: {
        width: '102%',
        height: 196.2,
        position: 'relative',
        left: -4,
        borderStyle: 'dashed',
        borderWidth: 4,
        borderColor: 'white',
    },
    FlatList_1_cl: {
        width: '90%',
        marginHorizontal: '5%',
    },
    scrols_reels_cl: {
        width: '100%',
        height: 86,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    reels_block_cl: {
        width: 78,
        height: 78,
        borderRadius: 39,
        borderWidth: 4,
        borderColor: '#5925DC',
    },
    reels_img_cl: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FCFCFD',
    },
});