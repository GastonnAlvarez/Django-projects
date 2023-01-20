from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('',PageMainView.as_view(),name="Empresas_Populares"),
    path('eliminarCompany/<int:id>',eliminar_company),
    path('agregarPaginaWeb/',registrar_company),
    path('editarCompany/<int:id>',editar_company),
    path('editarCompany/',editarCompany),
    path('companies/',ApiCompany.as_view(),name='Json_Company'),
    path('companies/<int:id>',ApiCompany.as_view(),name='Json_Company_id'),
]