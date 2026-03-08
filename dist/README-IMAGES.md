# 📸 Image Setup Guide for SERWA Professional

## Required Images for Bottle Animation

### 1. **Model with Bottle Image** (HERO SECTION)
**File:** `/public/model-with-bottle.jpg`

**Requirements:**
- Model holding the shampoo bottle in their **RIGHT HAND**
- Bottle should be positioned in the **upper-right area** of the image
- High resolution (at least 1200px wide)
- Portrait orientation (4:5 aspect ratio recommended)
- Professional lighting with clean background

**Why it's important:**
This image is used in the hero section. The floating bottle animation is designed to "pop out" from the model's hand position, creating a stunning scroll effect!

### 2. **Shampoo Bottle Only** (ANIMATION)
**File:** `/public/shampoo-bottle.jpg` ✅ (Already present!)

This is used for:
- The floating scroll animation
- Carousel first card
- Mobile fallback images

## 🎬 How the Animation Works

1. **Hero loads**: User sees model holding bottle
2. **User scrolls**: Separate bottle image "pops out" from model's hand
3. **Bottle flows**: Travels from right → left side with company content
4. **Transitions**: Moves left → right with product content
5. **Enters carousel**: Joins other products with bounce animation

## 📝 Adding Your Model Image

### Option 1: You Have the Image
```bash
# Just add your image to the public folder:
cp your-model-image.jpg /app/public/model-with-bottle.jpg
```

### Option 2: No Model Image Yet
The site will automatically fallback to showing just the bottle with a gradient background. The animation will still work beautifully!

## 🎨 Image Placement Tips

For best results:
- Position bottle in model's hand at approximately **60-70%** from top
- Model should be looking at or holding the bottle prominently
- Keep background simple (white, cream, or gradient)
- Make sure the bottle is clearly visible

## 📐 Recommended Dimensions

- **Model Image**: 1200x1500px (4:5 ratio)
- **Bottle Only**: 800x1200px (transparent background PNG is even better!)

---

**Current Status:**
- ✅ Bottle image: Present
- ⚠️ Model image: Needs to be added (optional, has fallback)

The animation is **fully functional** even without the model image! But adding it will make the "pop out" effect even more dramatic! 🎬✨
