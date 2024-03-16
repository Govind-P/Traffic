from django.shortcuts import render
from rest_framework import generics
from .models import Image 
from .serializer import ImageSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
import random


class ImageCreate(generics.ListCreateAPIView):
    queryset=Image.objects.all()
    serializer_class=ImageSerializer

class ImageFetch(generics.RetrieveUpdateDestroyAPIView):
    queryset=Image.objects.all()
    serializer_class=ImageSerializer


class ImageView(APIView):
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.all()

    def get(self, request, format=None):
        queryset = self.get_queryset()
        random_images = random.sample(list(queryset), 4)
        serializer = ImageSerializer(random_images, many=True)
        return Response(serializer.data)