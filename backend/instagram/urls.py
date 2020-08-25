from rest_framework.routers import DefaultRouter
from django.urls import re_path, path, include
from . import views

router = DefaultRouter()
# posts 가 해당 viewset에 대한 naming

router.register("posts", views.PostViewSet)
router.register(r"posts/(?P<post_pk>\d+)/comments", views.CommentViewSet)

urlpatterns = [path("api/", include(router.urls))]
