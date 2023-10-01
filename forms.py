from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
# Since I had to install additional packages, I do not think that email validator will work on the server
from wtforms.validators import InputRequired, EqualTo, Email

########################################################################################################################
# User Related Forms

class RegistrationForm(FlaskForm):
    user_id = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    password2 = PasswordField("Repeat Password", validators=[
                              InputRequired(), EqualTo('password')])
    character = SelectField("Character", validators=[InputRequired()], choices=['lancelot', 'gawain', 'percival'])
    submit = SubmitField("Register")


class LoginForm(FlaskForm):
    user_id = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    submit = SubmitField("Login")

