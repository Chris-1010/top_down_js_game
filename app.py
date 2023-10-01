from flask import Flask, render_template, session, redirect, url_for, g, request, make_response
from database import get_db, close_db
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from forms import RegistrationForm, LoginForm
from functools import wraps
from users import user
from sql_funcs import create_user, get_user_dict, get_leader_boards

app = Flask(__name__)
# For a session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# For forms
app.config["SECRET_KEY"] = "oalisudfhauwneiubaijsdblbvbliaus"
Session(app)
# For the database
app.teardown_appcontext(close_db)


@app.before_request
def logged_in_user():
    g.user = session.get("user_id", None)



def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view


# login reguired does not work
@app.route("/")
@login_required
def index():
    # if g.user is None:
    #     return redirect(url_for('login'))
    return render_template('index.html')

@app.route("/game")
@login_required
def game():
    # js need to know the data about the user7
    # I could write an extra request from js to the server to send over the user data
    return render_template('game.html')

@app.route("/leader_boards")
def leader_boards():
    players = get_leader_boards()
    return render_template('leader_boards.html', players=players)

#Ajax stuff
@app.route("/store_score", methods=['GET', 'POST'])
@login_required
def store_score():
    score = int(request.form['score'])
    user_obj = create_user(get_user_dict(g.user))
    if user_obj.max_score == None:
        user_obj.max_score = score
        user_obj.update_user()
    elif score < user_obj.max_score:
        user_obj.max_score = score
        user_obj.update_user()
    return str(user_obj.max_score)

@app.route("/get_character", methods=["GET", "POST"])
def get_character():
    if g.user is None:
        return 'lancelot'
    else:
        user_obj = create_user(get_user_dict(g.user))
        return str(user_obj.character)



@app.route("/info_site/<string:action>")
def info_site(action):
    message = ""
    if action == 'logged_out':
        if session.get("user_id", None) is None:
            message = "Logged out successfully"
        else:
            message = "There was a problem during logout."
    elif action == '404':
        message = 'Page not found.'
    elif action == '500':
        message = "Something went wrong."
    return render_template('info_site.html', message=message)

@app.route("/credits")
def credits():
    return render_template('credits.html')

########################################################################################################################
# User Related routes

@app.route("/register", methods=["POST", "GET"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user_dict = {
            'user_id': form.user_id.data,
            'max_score': None,
        }
        # User Data Validation
        possible_clashing_user_id = get_user_dict(user_dict['user_id'])
        if possible_clashing_user_id is not None:
            form.user_id.errors.append("Username already taken!")
        else:
            # getting the character id based on the character name
            user_dict['character'] = form.character.data
            # generating the password hash
            user_dict['password'] = generate_password_hash(
                form.password.data)
            # Adding the user to the database
            user_obj = create_user(user_dict)
            user_obj.add_user()
            return redirect(url_for("login"))
    return render_template("register_form.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        user = get_user_dict(user_id)
        # User Data Validation
        if user is None:
            form.user_id.errors.append("No such user!")
        elif not check_password_hash(user["password"], password):
            form.password.errors.append("Incorrect Password!")
        else:
            session.clear()
            # Updating the session
            session["user_id"] = user_id
            # Returning to the webpage we were on after log in
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("index")
            return redirect(next_page)
    return render_template("login_form.html", form=form)


@app.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect(url_for("info_site", action='logged_out'))

@app.route("/profile/<string:user_id>")
@login_required
def profile(user_id):
    user_info = get_user_dict(user_id)
    user_obj = create_user(user_info)
    return render_template('profile.html', profile_info=user_obj)
