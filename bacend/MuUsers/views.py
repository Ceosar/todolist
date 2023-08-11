from django.http import JsonResponse

# Create your views here.

def hellouUsers(request):

    return JsonResponse({"hello": "Users"})
