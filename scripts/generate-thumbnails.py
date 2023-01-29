from PIL import Image
import glob
import os

size = 256, 256

for filename in glob.glob('*.png', root_dir='../data/images'):
    with Image.open(os.path.join('../data/images', filename)) as im:
        im.thumbnail(size, resample=Image.LANCZOS)
        im.save(os.path.join('../data/images/thumbnails', filename), 'PNG')
        print(f'Saved {filename}')
