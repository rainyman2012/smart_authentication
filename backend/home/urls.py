from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = static(settings.MEDIA_URL,
                     document_root=settings.MEDIA_ROOT)
urlpatterns += [
    # path('api-auth/', include('rest_framework.urls')),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('exercise.urls', namespace='api')),
    path('auth/', include('accounts.urls', namespace='auth')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
