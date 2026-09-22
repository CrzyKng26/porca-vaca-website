from PIL import Image, ImageEnhance
import sys

img_paths = [
    r"C:\Users\kanna\.gemini\antigravity\brain\006eba70-5cf0-4b61-ad4d-810450d9b022\.user_uploaded\media_1789572847793.png",
    r"C:\Users\kanna\.gemini\antigravity\brain\006eba70-5cf0-4b61-ad4d-810450d9b022\.user_uploaded\media_1789572859479.png",
    r"C:\Users\kanna\.gemini\antigravity\brain\006eba70-5cf0-4b61-ad4d-810450d9b022\.user_uploaded\media_1789572869320.png"
]

images = []
for p in img_paths:
    img = Image.open(p).convert('RGB')
    # Enhance slightly as requested
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.1)
    sharpener = ImageEnhance.Sharpness(img)
    img = sharpener.enhance(1.2)
    images.append(img)

out_path = r"d:\Websites\Porca Varca\v4\public\PorcaVaca_Menu.pdf"

if images:
    images[0].save(out_path, save_all=True, append_images=images[1:])
    print("PDF saved to", out_path)
