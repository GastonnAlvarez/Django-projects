from django.urls import path
from .views import * 

urlpatterns = [
    path('',MySite),
    path('about/',About),
    path('index/',Index),
    path('home/',Home),
    path('projects/',Project),
    path('task/',Tasks),

]
