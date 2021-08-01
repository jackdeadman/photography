# Script to add dimension meta too all yaml files. Should now be done automatically when creating post
import glob
import yaml
from PIL import Image
import requests
from tqdm import tqdm

def get_dims(src):
    im = Image.open(requests.get(src, stream=True).raw)
    width, height = im.size
    return {
        'width': width,
        'height': height
    }

for file in tqdm(glob.glob('data/**/*.yaml')):
    with open(file) as f:
        data = yaml.load(f)
        if 'dims' in data:
            continue
        data['dims'] = {}
        for version, src in data['versions'].items():
            data['dims'][version] = get_dims(src)
        
    with open(file, 'w') as output:
        yaml.dump(data, output)