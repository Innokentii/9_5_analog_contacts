import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableWithoutFeedback } from 'react-native';

export default function App() {
  let [bg_main, set_bg_main] = useState({backgroundColor: '#080808'}); // Основной цвет фона ("тёмный" или "светлый");
  let [color_text, set_color_text] = useState({color: '#FCFCFD'}); // Основной цвет текста ("тёмный" или "светлый");
  let [reg_button_ad_controll, set_reg_button_ad_controll] = useState({backgroundColor: '#FCFCFD'}); // Основной цвет фона кнопки ("Принять и продолжить");
  let [reg_text_ad_controll, set_reg_text_ad_controll] = useState({color: '#080808'}); // Основной цвет текста кнопки ("Принять и продолжить");
  
  let [display_mains_blocks, set_display_mains_blocks] = useState([
    {display: 'flex'}, /* Блок регистрации или входа; */ {display: 'none'}, /* Блок регистрации;*/ {display: 'none'}, /* Блок входа; */
    {display: 'none'}, /* Главный рабочий блок; */ {display: 'none'}, /* Блок профиля; */ {display: 'none'}, /* Блок чужого профиля; */
    {display: 'none'}, /* Блок сообщений; */ {display: 'none'}, /* Блок аудио связи; */ {display: 'none'}, /* Блок видео связи; */
    {display: 'none'}, /* #9; */ {display: 'none'}, /* #10; */ {display: 'none'}, /* #11; */
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

  function none_block_3_f() {
    // Функция возврата в блок "Главный рабочий блок";
    set_display_mains_blocks((prev) => [...prev.slice(0, 3), { display: 'flex' }, ...prev.slice(4)]);
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

  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <View style={[styles.container, bg_main]}>
      {/*===Буфер_камеры_смартфона==*/}
      <View style={styles.smartphone_camerabuffer}></View>
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
          <TouchableWithoutFeedback onPress={()=>{none_main_block_f(); none_block_1_f()}}>
            <View style={styles.text_main_button_block_cl}>
              <Text style={[styles.text_main_button_cl]}>Регистрация</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { none_main_block_f(); none_block_2_f() }}>
            <View style={[styles.text_to_come_in_block_cl]}>
              <Text style={[styles.text_to_come_in_cl, color_text]}>Войти</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {/*===БЛОК_РЕГИСТРАЦИИ===*/}
      <View style={display_mains_blocks[1]}>
        {/*===ПОДБЛОК_РЕГИСТРАЦИИ_(СТАРТ)===*/}
        <View style={display_register_blocks[0]}>
          <View style={styles.text_1_block_two_cl}>
            <TouchableWithoutFeedback onPress={() => { none_main_block_f(); back_1_block_f() }}>
              <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
            </TouchableWithoutFeedback>
            <Text style={[styles.text_1_cl, color_text]}>Зарегистрируйтесь</Text>
          </View>
          <View style={styles.registration_block_cl}>
            <View style={styles.reg_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Номер телефона'
                placeholderTextColor={'#667085'}
              />
            </View>
            <View style={styles.reg_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Придумайте логин'
                placeholderTextColor={'#667085'}
              />
            </View>
            <View style={styles.reg_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Придумайте пароль'
                placeholderTextColor={'#667085'}
              />
            </View>
            <Text style={[styles.reg_text_description_cl, color_text]}>
              Мы позвоним вам или отправим SMS, чтобы подвердить
              номер телефона. Применяются стандартные условия вашего тарифа на прием сообщений и передачу данных
            </Text>
            <TouchableWithoutFeedback onPress={() => { none_reg_block_f(), back_reg_2_block_f() }}>
              <View style={styles.text_main_button_block_cl}>
                <Text style={[styles.text_main_button_cl]}>Продолжить</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/*===ПОДБЛОК_РЕГИСТРАЦИИ_(Потдверждение_номера)===*/}
        <View style={display_register_blocks[1]}>
          <View style={styles.text_1_block_two_cl}>
            <TouchableWithoutFeedback onPress={() => { none_reg_block_f(), back_reg_1_block_f() }}>
              <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
            </TouchableWithoutFeedback>
            <Text style={[styles.text_1_cl, color_text]}>Подтвердить номер</Text>
          </View>
          <View style={styles.registration_block_cl}>
            <Text style={[styles.reg_text_description_cl, color_text]}>Введите код, отправленный на 7 914 414-64-14</Text>
            <View style={styles.reg_2_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Введите код'
                placeholderTextColor={'#667085'}
              />
            </View>
            <View style={styles.reg_block_sms_text_cl}>
              <Text style={[styles.reg_text_description_cl, color_text]}>SMS не пришло?</Text>
              <TouchableWithoutFeedback onPress={() => { none_reg_block_f(), back_reg_3_block_f() }}>
                <Text style={[styles.reg_text_description_cl, color_text, {textDecorationLine: 'underline'}]}>Отправить еще раз</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        {/*===ПОДБЛОК_РЕГИСТРАЦИИ_(Ввод_данных)===*/}
        <View style={display_register_blocks[2]}>
          <View style={styles.text_1_block_two_cl}>
            <TouchableWithoutFeedback onPress={() => { none_reg_block_f(), back_reg_2_block_f() }}>
              <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
            </TouchableWithoutFeedback>
            <Text style={[styles.text_1_cl, color_text]}>Завершение регистрации</Text>
          </View>
          <View style={styles.registration_block_cl}>
            <View style={{height: 15}}>{/*===БУФЕР===*/}</View>
            <View style={styles.reg_2_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Имя'
                placeholderTextColor={'#667085'}
              />
            </View>
            <View style={styles.reg_2_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Фамилия'
                placeholderTextColor={'#667085'}
              />
            </View>
            <Text style={styles.reg_mini_deg_text_cl}>Имя должны совпадать с данными в удостоверении личности.</Text>
            <View style={styles.reg_2_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Дата рождения (дд.мм.гггг)'
                placeholderTextColor={'#667085'}
              />
            </View>
            <Text style={styles.reg_mini_deg_text_cl}>Минимальный возраст для регистрации: 18. Другие пользователи Domiki Ykt не увидят дату вашего рождения.</Text>
            <View style={styles.reg_2_text_block_cl}>
              <TextInput
                style={[styles.reg_text_cl, color_text]}
                placeholder='Электронная почта'
                placeholderTextColor={'#667085'}
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
            <TouchableWithoutFeedback onPress={() => { none_reg_block_f(), back_reg_4_block_f() }}>
              <View style={[styles.reg_button_adoption_cl, reg_button_ad_controll]}>
                <Text style={[styles.reg_text_ad_controll_cl, reg_text_ad_controll]}>Принять и пролдолжить</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={[styles.text_to_come_in_mini_cl, color_text]}>
              Domiki Ykt будет отправлять вам эксклюзивные предложения, идеи, рекламные письма и push-оповещения.
              Вы можете отказаться от них в настройках аккаунта в маркетинговом уведомлении.
            </Text>
            <View style={[styles.block_reg_check_mark_cl]}>
              <View style={[styles.reg_check_mark_cl, reg_button_ad_controll]}>
                <Text style={[reg_text_ad_controll]}>&#10004;</Text>
              </View>
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
            <TouchableWithoutFeedback onPress={()=>{none_reg_block_f(), none_block_3_f()}}>
              <View style={styles.text_main_button_block_cl}>
                <Text style={[styles.text_main_button_cl]}>Согласится и продолжить</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{none_reg_block_f(), back_reg_3_block_f()}}>
              <View style={[styles.reg_button_adoption_cl, reg_button_ad_controll]}>
                <Text style={[styles.reg_text_ad_controll_cl, reg_text_ad_controll]}>Отклонить</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      {/*===БЛОК_ВХОДА===*/}
      <View style={display_mains_blocks[2]}>
        <View style={styles.text_1_block_two_cl}>
          <TouchableWithoutFeedback onPress={()=>{none_main_block_f(); back_1_block_f()}}>
            <Text style={[styles.x_cl, color_text]}>&#215;     </Text>
          </TouchableWithoutFeedback>
          <Text style={[styles.text_1_cl, color_text]}>Войти в аккунт</Text>
        </View>
        <View style={styles.registration_block_cl}>
          <View style={styles.reg_text_block_cl}>
            <TextInput
              style={[styles.reg_text_cl, color_text]}
              placeholder='Ваш логин'
              placeholderTextColor={'#667085'}
            />
          </View>
          <View style={styles.reg_text_block_cl}>
            <TextInput
              style={[styles.reg_text_cl, color_text]}
              placeholder='Введите пароль'
              placeholderTextColor={'#667085'}
            />
          </View>
          <View style={[styles.text_main_button_block_cl, {marginTop: 40}]}>
            <Text style={[styles.text_main_button_cl]}>Продолжить</Text>
          </View>
        </View>
      </View>
      {/*===РАБОЧАЯ_ЗОНА===*/}
      <View style={display_mains_blocks[3]}>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: '#D0D5DD',
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
});
