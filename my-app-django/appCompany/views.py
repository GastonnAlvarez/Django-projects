from django.shortcuts import render,redirect
from django.views.generic import ListView
from .models import *
from django.http.response import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

class PageMainView(ListView):
    model = Company
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['titulo'] = 'Gestion de Empresas'
        return context

def eliminar_company(requets,id):
    company = Company.objects.get(id=id)
    company.delete()

    return redirect ('/')


def registrar_company(request):
    name = request.POST['txtName']
    website = request.POST['txtWeb']
    foundation = request.POST['txtFoundation']
    company = Company.objects.create(name=name,website=website,foundation=foundation)
    return redirect('/')

def editar_company(requets,id):
    company = Company.objects.get(id=id)
    company = {
        "titulo":"Edicion de Company",
        "company":company
    }

    return render(requets,'edicionCurso.html',company)

def editarCompany(request):
    id = request.POST['id']
    name = request.POST['txtName']
    website = request.POST['txtWeb']
    foundation = request.POST['txtFoundation']
    company = Company.objects.get(id=id)

    company.name = name
    company.website = website
    company.foundation = foundation

    company.save()

    # company = Company.objects.create(name=name,website=website,foundation=foundation)
    return redirect('/')

    # API

class ApiCompany(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def get(self,request,id=0):
        if id>0:
            companies = list(Company.objects.filter(id=id).values())
            # print(companies)
            if len(companies)>0:
                company = companies[0]
                # print(company)
                datos = {"Message":"Success","company":company}
            else:
                datos = {"Message":"Error"}
            return JsonResponse(datos)
        else:
            companies = list(Company.objects.values())
            if len(companies)>0:
                datos = {"Message":"Success","company":companies}
            else:
                datos = {"Message":"Error"}
            return JsonResponse(datos)
    
    def post(self,request):
        # print(request.body)
        jd = json.loads(request.body)
        # print(jd)
        Company.objects.create(name=jd['name'],website=jd['website'],foundation=jd['foundation'])
        datos = {"Message":"Success"}

        return JsonResponse(datos)

    def put(self,request,id):
        jd = json.loads(request.body)
        companies = list(Company.objects.filter(id=id).values())
        if len(companies)>0:
            company = Company.objects.get(id=id)
            company.name = jd['name']
            company.website = jd['website']
            company.foundation = jd['foundation']
            company.save()
            datos = {"Message":"Success"}
        else:
            datos={"Message":"Error"}

        return JsonResponse(datos)
    
    def delete(self,request,id):
        companies = list(Company.objects.filter(id=id).values())
        if len(companies)>0:
            company = Company.objects.filter(id=id).delete()
            datos = {"Message":"Se elimino correctamente"}
        else:
            datos = {"Message":"No se encontro el id ingresado"}
        return JsonResponse(datos)
