from flask import Flask, render_template, request, jsonify, Response
import sqlite3 as SQL
from PaswordGen import pwdGenerator
import os
import shutil
from flask_cors import CORS
from datetime import datetime

# Функция запуска сайта
app = Flask(__name__)
CORS(app)
def create_app():
    return app

PATH_users_db = 'database/users_db.db' # База данных пользователей;
PATH_users_profile = 'static/users/' # папка с изображениями профиля пользователя;
PATH_global_reels_db = 'database/global_reels.db' #Глобальная база данных reels;

#===============================================================#
#                Работа_с_базой_данных_SQLite3                  #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

conn = SQL.connect(PATH_users_db)
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        login TEXT,
        password TEXT,
        phone TEXT,
        name TEXT,
        lastname TEXT,
        date_birth TEXT,
        mail TEXT,
        advertisement TEXT,
        email_confirmation TEXT,
        ban TEXT,
        ban_reason TEXT,
        exclusive TEXT,
        lile TEXT,
        dislike TEXT,
        subscriptions TEXT,
        subscription_request TEXT,
        subscription_invitation TEXT,
        subscriptions_group TEXT,
        subscription_request_group TEXT,
        subscription_invitation_group TEXT,
        q TEXT,
        w TEXT,
        e TEXT,
        r TEXT,
        t TEXT,
        y TEXT,
        u TEXT,
        i TEXT,
        o TEXT,
        p TEXT,
        z TEXT,
        x TEXT,
        c TEXT,
        v TEXT,
        b TEXT,
        n TEXT,
        m TEXT,
        a TEXT,
        s TEXT,
        d TEXT,
        f TEXT,
        g TEXT,
        h TEXT,
        j TEXT,
        k TEXT
)''')
conn.commit()
conn.close()

conn = SQL.connect(PATH_global_reels_db)
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS global_reels (
        id INTEGER PRIMARY KEY,
        q TEXT,
        w TEXT,
        e TEXT,
        r TEXT,
        t TEXT,
        y TEXT,
        u TEXT,
        i TEXT,
        o TEXT,
        p TEXT,
        a TEXT,
        s TEXT,
        d TEXT,
        f TEXT,
        g TEXT
)''')
conn.commit()
conn.close()

#===============================================================#
#                     Работа с запросами                        #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

# Запрос "POST";
@app.route('/post_request_1', methods=['POST'])
def post_request_1_f():
    post_request = request.get_json(force=True)
    post_request = [post_request['name_basket']]
    if request.method == 'GET':
        return None
    return post_request

# Запрос "GET";
@app.route('/get_request_1', methods=['GET'])
def get_request_1_f():
    data = 1
    search_object = ''
    if request.method == 'POST':
        return Response(search_object, content_type='application/octet-stream')
    
    return jsonify(data)


#===============================================================#
#                      Функции и классы                         #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

# GET запрос данных о пользователях;
@app.route('/get_users_data', methods=['GET'])
def get_users_data_f():
    global PATH_users_db
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    data = cursor.fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)

# GET запрос данных о логинах;
@app.route('/list_of_logins', methods=['GET'])
def list_of_logins_f():
    global PATH_users_db
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    cursor.execute("SELECT login FROM users")
    data = cursor.fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)

# регистрация пользователя;
@app.route('/user_registration', methods=['GET'])
def user_registration_f():
    global PATH_users_db
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    login = request.args.get('login')
    password = request.args.get('password')
    password = pwdGenerator(password, login, 30)
    phone = request.args.get('phone')
    name = request.args.get('name')
    lastname = request.args.get('lastname')
    date_birth = request.args.get('date_birth')
    mail = request.args.get('mail')
    advertisement = str(request.args.get('advertisement'))
    work_text = "INSERT INTO users (login, password, phone, name, lastname, date_birth, mail, advertisement, w, i, o, p) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(work_text, (login, password, phone, name, lastname, date_birth, mail, advertisement, 'open', 'все', 'нет', 'темный'))
    os.mkdir(f'static/users/{login}')
    shutil.copyfile('static/profile_photo.jpg', f'static/users/{login}/profile_photo.jpg')
    shutil.copyfile('static/bg_photo.jpg', f'static/users/{login}/bg_photo.jpg')
    os.mkdir(f'static/users/{login}/reels')
    conn.commit()
    conn.close()
    conn = SQL.connect(f'static/users/{login}/local_reels.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS local_reels (
            id INTEGER PRIMARY KEY,
            q TEXT,
            w TEXT,
            e TEXT,
            r TEXT,
            t TEXT,
            y TEXT,
            u TEXT,
            i TEXT,
            o TEXT,
            p TEXT,
            a TEXT,
            s TEXT,
            d TEXT,
            f TEXT,
            g TEXT
    )''')
    conn.commit()
    conn.close()
    return jsonify('Зарегистрирован')

# GET запрос на вход;
@app.route('/user_open', methods=['GET'])
def user_open_f():
    global PATH_users_db
    login = request.args.get('login')
    password = request.args.get('password')
    password = pwdGenerator(password, login, 30)
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    cursor.execute("SELECT login, password FROM users")
    data = cursor.fetchall()
    print(data)
    login_search = list((obj[0] for obj in data))
    print(login_search)
    password_search = list((obj[1] for obj in data))
    print(password_search)
    if login not in login_search:
        return jsonify('НП логин')
    if password not in password_search:
        return jsonify('НП пароль')
    cursor.execute("UPDATE users SET w = ? WHERE login = ?", ('open', login))
    conn.commit()
    conn.close()
    return jsonify('Вход')

# запрос всей информации об пользователе;
@app.route('/data_request_user', methods=['GET'])
def data_request_user_f():
    global PATH_users_db
    login = request.args.get('login')
    password = request.args.get('password')
    print(password)
    password = pwdGenerator(password, login, 30)
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    work_text = f"SELECT * FROM users WHERE login = ?"
    cursor.execute(work_text, (login,))
    rows = (cursor.fetchall())[0]
    conn.commit()
    conn.close()
    print(rows)
    if str(rows[2]) != str(password):
        print(rows[2])
        print(password)
        return False
    return jsonify(rows)

# запрос изменения данных пользователя;
@app.route('/changing_user_data', methods=['GET'])
def changing_user_data_f():
    global PATH_users_db
    login = request.args.get('login')
    print(login)
    password = request.args.get('password')
    print(password)
    password = pwdGenerator(password, login, 30)

    name = request.args.get('name')
    lastname = request.args.get('lastname')
    datebirth = request.args.get('datebirth')
    mail = request.args.get('mail')
    phone = request.args.get('phone')
    post = request.args.get('post')
    descr = request.args.get('descr')
    telegram = request.args.get('telegram')
    whatsapp = request.args.get('whatsapp')
    web = request.args.get('web')
    i_story = request.args.get('i_story')
    closed_account = request.args.get('closed_account')
    dark_light_mode = request.args.get('dark_light_mode')

    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    work_text = f"SELECT * FROM users WHERE login = ?"
    cursor.execute(work_text, (login,))
    rows = (cursor.fetchall())[0]

    if str(rows[2]) != str(password):
        conn.commit()
        conn.close()
        print('НЕ изменено')
        return jsonify('НЕ изменено')
    
    work_text = "UPDATE users SET phone = ?, name = ?, lastname = ?, date_birth = ?, mail = ?, e = ?, r = ?, t = ?, y = ?, u = ?, i = ?, o = ?, p = ? WHERE login = ?"
    cursor.execute(work_text, (phone, name, lastname, datebirth, mail, post, descr, telegram, whatsapp, web, i_story, closed_account, dark_light_mode, login))

    conn.commit()
    conn.close()

    print('данные изменены')
    return jsonify('данные изменены')

# Функция изменение фото профиля пользователя;
@app.route('/changing_user_profile', methods=['GET', 'POST'])
def changing_user_profile_f():
    global PATH_users_db
    global PATH_users_profile
    login = request.form.get('login')
    password = request.form.get('password')
    password = pwdGenerator(password, login, 30)
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    work_text = f"SELECT * FROM users WHERE login = ?"
    cursor.execute(work_text, (login,))
    rows = (cursor.fetchall())[0]
    if str(rows[2]) != str(password):
        conn.commit()
        conn.close()
        print('НЕ изменено')
        return jsonify('НЕ изменено')
    conn.commit()
    conn.close()
    file_path = f"{PATH_users_profile}{login}/profile_photo.jpg"
    try:
        os.remove(file_path)
        image = request.files['image']
        image.save(file_path) # сохранение нового фото профиля;
    except OSError as e:
        image = request.files['image']
        image.save(file_path) # сохранение нового фото профиля;
        print('Ощибка №2')

    print(login)
    print(password)
    return jsonify('Фото загружена')

# Функция изменение фона пользователя;
@app.route('/changing_user_bg', methods=['GET', 'POST'])
def changing_user_bg_f():
    global PATH_users_db
    global PATH_users_profile
    login = request.form.get('login')
    password = request.form.get('password')
    password = pwdGenerator(password, login, 30)
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    work_text = f"SELECT * FROM users WHERE login = ?"
    cursor.execute(work_text, (login,))
    rows = (cursor.fetchall())[0]
    if str(rows[2]) != str(password):
        conn.commit()
        conn.close()
        print('НЕ изменено')
        return jsonify('НЕ изменено')
    conn.commit()
    conn.close()
    file_path = f"{PATH_users_profile}{login}/bg_photo.jpg"
    try:
        os.remove(file_path)
        image = request.files['image']
        image.save(file_path) # сохранение нового фона;
    except OSError as e:
        image = request.files['image']
        image.save(file_path) # сохранение нового фона;
        print('Ощибка №2')

    print(login)
    print(password)
    return jsonify('Фото загружена')

# запрос на удаление или для востановления аккаунта;
@app.route('/delete_create_user', methods=['GET'])
def delete_create_user_f():
    global PATH_users_db
    login = request.args.get('login')
    print(login)
    password = request.args.get('password')
    print(password)
    password = pwdGenerator(password, login, 30)

    del_creat = request.args.get('del_creat')

    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    work_text = f"SELECT * FROM users WHERE login = ?"
    cursor.execute(work_text, (login,))
    rows = (cursor.fetchall())[0]

    if str(rows[2]) != str(password):
        conn.commit()
        conn.close()
        print('НЕ изменено')
        return jsonify('НЕ изменено')
    
    work_text = "UPDATE users SET q = ? WHERE login = ?"
    cursor.execute(work_text, (del_creat, login))

    conn.commit()
    conn.close()

    print('аккаунт удален')
    return jsonify('аккаунт удален')

# регистрация рилса;
@app.route('/register_reels_img', methods=['GET', 'POST'])
def register_reels_img_f():
    global PATH_users_db
    global PATH_global_reels_db

    # загрузка данных;
    login = request.form.get('login')
    password = request.form.get('password')
    print(password)
    password = pwdGenerator(password, login, 30)
    reels_object = request.files['reels_object']
    reels_heshteg = request.form.get('heshteg')
    reels_time = request.form.get('time')
    reels_type = request.form.get('type')
    reels_gap_time = request.form.get('gap_time')

    # проверка пароли;
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    work_text = f"SELECT * FROM users WHERE login = ?"
    cursor.execute(work_text, (login,))
    rows = (cursor.fetchall())[0]
    if str(rows[2]) != str(password):
        conn.commit()
        conn.close()
        print('рилс НЕ зарегистрирован')
        return jsonify('рилс НЕ зарегистрирован')
    conn.commit()
    conn.close()

    # генерация текушего времени;
    now = datetime.now()
    formatted_date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    print(formatted_date_time)

    # сохранение данных в локальную базу данных;
    conn = SQL.connect(f'static/users/{login}/local_reels.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO local_reels (q, w, e, r, t, y) VALUES (?, ?, ?, ?, ?, ?)", (reels_heshteg, reels_time, formatted_date_time, login, reels_type, reels_gap_time))
    conn.commit()
    cursor.execute("SELECT id FROM local_reels")
    rows = cursor.fetchall()
    work_num = rows[-1][0]
    print(work_num)
    print(type(work_num))
    conn.close()

    # сохранение данных в глобальную базу данных;
    conn = SQL.connect(PATH_global_reels_db)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO global_reels (q, w, e, r, t, y, u) VALUES (?, ?, ?, ?, ?, ?, ?)", (reels_heshteg, reels_time, formatted_date_time, login, f'{login}/reels/{work_num}_reels.jpg', f'{login}/reels/{work_num}_reels.mp4', f'{login}/reels/{work_num}_reels.db'))
    conn.commit()
    conn.close()

    # сохранение нового фона;
    file_path = f'static/users/{login}/reels/{work_num}_reels.jpg'
    reels_object.save(file_path)

    # сохранение базы данных для комментариев рилса;
    conn = SQL.connect(f'static/users/{login}/reels/{work_num}_reels.db')
    cursor = conn.cursor()
    cursor.execute(f'CREATE TABLE IF NOT EXISTS reels (id INTEGER PRIMARY KEY, q TEXT, w TEXT, e TEXT, r TEXT, t TEXT, y TEXT, u TEXT, i TEXT, o TEXT, p TEXT, a TEXT, s TEXT, d TEXT, f TEXT, g TEXT)')
    conn.commit()
    conn.close()

    # сохранение базы данных для описаний рилса рилса;
    conn = SQL.connect(f'static/users/{login}/reels/{work_num}_reels_description.db')
    cursor = conn.cursor()
    cursor.execute(f'CREATE TABLE IF NOT EXISTS reels_description (id INTEGER PRIMARY KEY, q TEXT, w TEXT, e TEXT, r TEXT, t TEXT, y TEXT, u TEXT, i TEXT, o TEXT, p TEXT, a TEXT, s TEXT, d TEXT, f TEXT, g TEXT)')
    conn.commit()
    conn.close()


    print('рилс зарегистрирован')
    return jsonify('рилс зарегистрирован')

# запрос всей информации об рилсах пользователя;
@app.route('/data_request_reels', methods=['GET'])
def data_request_reels_f():
    global PATH_users_db

    login = request.args.get('login')
    password = request.args.get('password')
    print(password)
    password = pwdGenerator(password, login, 30)
    conn = SQL.connect(f'static/users/{login}/local_reels.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM local_reels")
    rows = cursor.fetchall()
    print(rows)
    conn.commit()
    conn.close()

    # проверка пароли;
    conn = SQL.connect(PATH_users_db)
    cursor = conn.cursor()
    work_text = f"SELECT * FROM users WHERE login = ?"
    cursor.execute(work_text, (login,))
    try:
        rows_work = (cursor.fetchall())[0]
        if str(rows_work[2]) != str(password):
            conn.commit()
            conn.close()
            print('Пароль не верен')
            return jsonify('Пароль не верен')
    except:
        print('база данных пуст')
        return jsonify('база данных пуст')
    conn.commit()
    conn.close()

    return jsonify(rows)


#===============================================================#
#                    Работа со страницами                       #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

# Рендер тела сайта (запуск сайта);
@app.route('/')
@app.route('/main')
def main_f():
    render_template('main.html')
    return render_template('consol_1.html')

# Рендер страницы "consol_1";
@app.route("/consol_1")
def _consol_1_f():
    return render_template("consol_1.html")

# Рендер страницы "users_2";
@app.route("/users_2")
def _users_2_f():
    return render_template("users_2.html")

# Рендер страницы "message_3";
@app.route("/message_3")
def _message_3_f():
    return render_template("message_3.html")

# Рендер страницы "comment_4";
@app.route("/comment_4")
def _comment_4_f():
    return render_template("comment_4.html")

# Рендер страницы "img_5";
@app.route("/img_5")
def _img_5_f():
    return render_template("img_5.html")

# Рендер страницы "audio_6";
@app.route("/audio_6")
def _audio_6_f():
    return render_template("audio_6.html")

# Рендер страницы "video_7";
@app.route("/video_7")
def _video_7_f():
    return render_template("video_7.html")

# Рендер страницы "block_8";
@app.route("/block_8")
def _block_8_f():
    return render_template("block_8.html")

# Рендер страницы "block_9";
@app.route("/block_9")
def _block_9_f():
    return render_template("block_9.html")

# Рендер страницы "block_10";
@app.route("/block_10")
def _block_10_f():
    return render_template("block_10.html")
