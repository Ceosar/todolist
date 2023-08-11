from django.urls import path
from .views import *

urlpatterns = [
    path('', hellouUsers),
    path('/addUser',addUser),
    path("/logginUser",logginUser),
    path('/chekJWT',chekJWT)
]
