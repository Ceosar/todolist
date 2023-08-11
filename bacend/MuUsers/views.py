from django.http import JsonResponse

from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
import phonenumbers

from .models import *
import json
import jwt
from datetime import datetime, timedelta
from MainBackend.settings import SECRET_KEY


# ------------ Helpers Functions ------------ #

def generate_jwt_token(user_id : int) -> str:
    """Generate a jwt token

    Args:
        user_id (int): айди пользователя

    Returns:
        jwt.JWT: JWT token
    """
    
    payload = {
        'user_id': user_id,
        'valid_date': (datetime.utcnow() + timedelta(days=60)).isoformat()
    }

    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')


def verify_jwt_token(token: str) -> bool:
    """Verify and decode a JWT token

    Args:
        token (str): JWT token

    Returns:
        bool: status , userId || False false
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

        if datetime.utcnow() <= datetime.fromisoformat(payload['valid_date']):
            return True , payload['user_id']
        else:
            return False ,False
    except (jwt.ExpiredSignatureError, jwt.DecodeError):
        return False , False


# ------------------------------------------- #


def hellouUsers(request):

    return JsonResponse({"hello": "Users"})


def addUser(request):
    if request.method == "POST":

        dataRequest = request.POST

        if 'email' not in dataRequest:
            return JsonResponse({"status": "error", "message": "Укажите Email"})

        if 'password' not in dataRequest:
            return JsonResponse({"status": "error", "message": "Укажите Password"})

        try:
            EmailValidator()(dataRequest['email'])
        except ValidationError as e:
            return JsonResponse({"status": "error", "message": "Проверте правильность почты"})

        try:
            
            if  MuUsers.objects.filter(email=dataRequest['email']).exists():
                 return JsonResponse({"status": "error", "message": "Данная почта уже занята"})

            newUser = MuUsers.objects.create(
                email=dataRequest['email'],
                password=dataRequest['password'],
                phone=None,
                name=None,
                soName=None,
            )
    
            return JsonResponse({"status": "OK", "jwt": generate_jwt_token(newUser.id) , "userId" : newUser.id})
        except Exception as e:
            return JsonResponse({"status": "error", "message": "Непредвиденная ошибка попробуете позже"})
    else:
        return JsonResponse({"status": "error", "message":"Непредвиденный метот запроса"})
    

def logginUser(request):
    if request.method == "POST":

        dataRequest = request.POST

        if 'email' not in dataRequest:
            return JsonResponse({"status": "error", "message": "Укажите Email"})

        if 'password' not in dataRequest:
            return JsonResponse({"status": "error", "message": "Укажите Password"})

        try:
            EmailValidator()(dataRequest['email'])
        except ValidationError as e:
            return JsonResponse({"status": "error", "message": "Проверте правильность почты"})

        try:
            if not MuUsers.objects.filter(email=dataRequest['email']).exists():
                return JsonResponse({"status": "error", "message":"Пользователь не обнаружен"})
            
            user = MuUsers.objects.get(email=dataRequest['email'])

            if user.check_password(dataRequest['password']):\
                return JsonResponse({"status": "OK" , "jwt": generate_jwt_token(user.id) , "userId" : user.id  })
            else:
                return JsonResponse({"status": "error", "message " : "Неверный парроль"})

           
        except ValidationError as e:
            return JsonResponse({"status": "error", "message": e.messages[0]})
    else:
        return JsonResponse({"status": "error", "message":"Непредвиденный метот запроса"})

def chekJWT(request):
    if request.method == "POST":

        dataRequest = request.POST

        if 'jwt' not in dataRequest:
            return JsonResponse({"status":False , "userId":False})
        
        status , userId  = verify_jwt_token(dataRequest['jwt'])
        return JsonResponse({"status":status , "userId":userId})

    else:
        return JsonResponse({"status":False , "userId":False})

# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ2YWxpZF9kYXRlIjoiMjAyMy0wOS0xMFQyMToyOTo1MC4yNjU2MzUifQ.sLcwMJ91vQM_MDvoyaaWGc5OfDaflYPsYc2c3-gv-3Q