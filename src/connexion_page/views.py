from django.shortcuts import render, redirect
from .models import User, Active_user
import json
from django.http import HttpResponse, HttpResponseRedirect
import logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

def check_username_password(username : str, password : str):
    """
    Recherche dans la base de donnée le mot de passe associé au nom d'utilisateur envoyé, et le compare au mot de passe fourni

    USERNAME : le username envoyé par l'utilisateur
    PASSWORD : le mdp envoyé par l'utilisateur 

    Return True si les 2 mots de passe correspondent
    Return False si non
    """
    try:
        user_information = User.objects.filter(username__exact=username).first()
        print(type(user_information))
        # values + list -> transforme le QuerySet en liste de dictionnaire 
        user_password = user_information.password
        if user_password == password :
            return True
        else :
            logging.info(f"{username} tried to login but no match between password and user")
            return False

    
    except:
        return False

def user_informations(username):
    data = User.objects.get(username__exact = username)
    user_information = {
        'first_name' : data.first_name,
        'name' : data.name,
        'email' : data.email,
        'username' : data.username,
        'password' : data.password,
    }
    return user_information

#--------------------------------VIEWS------------------------------------

#--------index---------
def index(request):
    print(request.session)
    return render(request, 'index.html')
#----------------------:

#--------inscription---------
def inscription(request):
    if request.method == "POST":
        data = json.loads(request.body)
        
        #Add a new user in the User databse
        new_user = User(first_name = data["first_name"], name = data["name"], email = data["email"], username = data["username"], password = data["password"])
        new_user.save()

        #Add user_information to the session
        request.session["user_information"] = {'first_name' : data["first_name"], 'name' : data["name"], 'email' : data["email"], 'username' : data["username"], 'password' : data["password"]}
        
        logging.info(f"A new person has registered {data['username']}")
        return redirect("connexion_page")
    else :
        return render(request, 'inscription.html')
#---------------------------

#--------connexion----------
def connexion(request):
    if request.method == "POST":  
        data = json.loads(request.body)
        password = data["password"]
        username = data["username"]
        if check_username_password(username, password):
            redirection = redirect("home_chat_page")

            #Add a new active user in the Active_user database
            new_active_user = Active_user(username = username)
            new_active_user.save()

            #Add all user information in the session
            user_information = user_informations(username)
            request.session['user_information'] = user_information

            logging.info(f"A user is connected : username = {username} ")
            return redirection
        else :
            return HttpResponse("not accepted", status = 401)
    else :
        return render(request, 'connexion.html')
#---------------------------






