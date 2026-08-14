import os
import numpy as np
from PIL import Image

src_path = r'C:\Users\ankit\.gemini\antigravity-ide\brain\b4c625c0-cf23-4013-ac0e-b38780481f75\media__1785869314180.jpg'
out_dir = r'c:\Users\ankit\OneDrive\Documents\Decenterlized MarketPlace\Cryvora\public\assets'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert('RGBA')

crops = {
    'hero_mascot.png': (290, 35, 540, 295),
    'claim_mascot.png': (415, 305, 650, 530),
    'eco_1_flying.png': (70, 540, 230, 650),
    'eco_2_sunglasses.png': (220, 540, 380, 650),
    'eco_3_laptop.png': (370, 540, 530, 650),
    'eco_4_gift.png': (520, 540, 675, 650),
    'roadmap_rocket.png': (485, 700, 680, 875),
    'cvr_coin.png': (280, 45, 335, 100),
    'cryvora_logo.png': (20, 10, 70, 48),
}

def make_transparent(crop_img, threshold=12, feather=15):
    # Convert image to numpy array
    data = np.array(crop_img, dtype=np.float32)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Calculate brightness / max intensity
    brightness = np.maximum(np.maximum(r, g), b)
    
    # Alpha mask based on dark background removal
    alpha = np.clip((brightness - threshold) / feather * 255.0, 0, 255)
    
    # Keep original alpha if it was already transparent
    data[:,:,3] = np.minimum(a, alpha)
    
    return Image.fromarray(data.astype(np.uint8))

for fname, box in crops.items():
    cropped = img.crop(box)
    cropped.save(os.path.join(out_dir, f'orig_{fname}'))
    transparent = make_transparent(cropped, threshold=10, feather=25)
    transparent.save(os.path.join(out_dir, fname))
    print(f"Saved {fname} (Size: {transparent.size})")

print("All mascot assets extracted successfully!")
