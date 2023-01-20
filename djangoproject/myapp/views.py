from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import Projects,Task

def Home(request):
    title = "Pagina Renderizada"
    return render(request,'index.html',{
        'title':title
    })

def Tasks(request):
    title = 'Tareas'
    task = Task.objects.all()
    return render(request,'task.html',{
        'title':title,
        'task':task
    })

def Project(request):
    title = 'Proyectos'
    project = Projects.objects.all()
    return render(request,'projects.html',{
        'title':title,
        'project':project
    })

def Index(request,id):
    return HttpResponse("<h1>Hola %s</h1>"% id)

def MySite(request):
    return HttpResponse("<h1>Hola desde Django</h1>")

def About(request):
    return render(request,'about.html',{})