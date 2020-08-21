from . common import *


INSTALLED_APPS += [
    "debug_toolbar",
]
 
 #이렇게하면 middleware 맨 위에 작성한 것과 같게됨
MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
] + MIDDLEWARE


INTERNAL_IPS = ['127.0.0.1',]