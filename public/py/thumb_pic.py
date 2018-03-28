from PIL import Image
import glob
import os
import sys

try:
    im = Image.open(sys.argv[1])
    o_width = im.size[0]
    o_height = im.size[1]
    thumb_width = 400
    size = (thumb_width, o_height * thumb_width / o_width)
    im.thumbnail(size)
    im.save(sys.argv[2],im.format)
    print(sys.argv[2])
except IOError:
     print("cannot create thumbnail for", sys.argv[1])