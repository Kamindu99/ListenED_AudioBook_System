from rest_framework import serializers
from usermanagement.models import UserManagementModel

class UserManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserManagementModel
        fields = ('userid', 'name', 'mobile', 'email','password', 'age','studyarea','usehistory','colorslist','overlay')
