import urllib.request
import re

try:
    html = urllib.request.urlopen('https://portech.in').read().decode('utf-8', errors='ignore')
    images = set(re.findall(r'assets/img/portech[^\"\'\>]+', html, re.IGNORECASE))
    for img in images:
        print(img)
except Exception as e:
    print('Error:', e)
