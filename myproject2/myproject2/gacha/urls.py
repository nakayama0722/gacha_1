# gacha/urls.py
from django.urls import path
from .views import index,gacha_draw

urlpatterns = [
    path("", index, name="index"),
    path("api/gacha/draw/", gacha_draw, name="gacha_draw"),
]
