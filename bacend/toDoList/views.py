from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.


def helloToDo(request):
    return JsonResponse({"hello": "toDo"})