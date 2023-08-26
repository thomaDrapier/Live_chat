from django.shortcuts import render

def home_chat_page(request):
    context ={'username': request.session["user_information"]["username"]}
    print("home_chat_page function is called")
    return render(request, 'home_chat_page.html', context)