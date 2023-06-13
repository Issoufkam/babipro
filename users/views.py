from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, get_user_model, logout
from .forms import RegisterForm
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer

User = get_user_model()

def home(request):
    return render(request, 'home.html')

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            password = form.cleaned_data.get('password1')
            user.set_password(password)
            user.save()
            login(request, user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})


def loginF(request):
    if request.method == 'POST':
        username = request.POST.get('username')  # Récupérer le nom d'utilisateur depuis le formulaire
        password = request.POST.get('password')  # Récupérer le mot de passe depuis le formulaire
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Connexion réussie.')
            return redirect('home')  # Rediriger vers la page d'accueil après la connexion
        else:
            messages.error(request, 'Nom d\'utilisateur ou mot de passe invalide.')
            return render(request, 'login.html')
    else:
        return render(request, 'login.html')

def logoutF(request):
    logout(request)
    messages.success(request, 'Déconnexion réussie.')
    return redirect('home')


class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
