from django.contrib import admin
from .models import *

@admin.register(Company)

class adminCompany(admin.ModelAdmin):
    list_display = ('id','name','website','foundation')
    search_fields = ('name','foundation')
    # list_editable = ('name',)
    list_display_links = ('name','website','foundation')
    # list_per_page = 3
    ordering = ('id',)
