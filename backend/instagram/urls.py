from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
# posts 가 해당 viewset에 대한 naming

router.register("posts", views.PostViewSet)

urlpatterns = [path("api/", include(router.urls))]
