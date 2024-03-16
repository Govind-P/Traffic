from django.urls import path 
from .views import ImageCreate,ImageFetch,ImageView

urlpatterns = [
    path('images',ImageCreate.as_view(),name='create-image'),
    path('ns<int:pk>/',ImageFetch.as_view(),name='image-details'),
    path('imageviews/', ImageView.as_view(), name='image-view'),
]
