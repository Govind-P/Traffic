from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Image
        fields = ['id','img']

    def get_image(self, obj):
        if obj.img:
            return self.context['request'].build_absolute_uri(obj.img.url)
        return None