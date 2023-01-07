from PIL import Image
import glob
import os

size = 256, 256

for filename in glob.glob('*.png', root_dir='../static/data/images'):
    with Image.open(os.path.join('../static/data/images', filename)) as im:
        im.thumbnail(size, resample=Image.LANCZOS)
        im.save(os.path.join('../static/data/images/thumbnails', filename), 'PNG')
        print(f'Saved {filename}')
