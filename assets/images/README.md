# Image Assets

## Background Image for Sign Up Page

### File Location
Place your food background image here: `assets/images/food-background.jpg`

### Recommended Specifications

**Dimensions:**
- **Width:** 1920px (minimum) or 2560px (recommended for high-DPI displays)
- **Height:** 1080px (minimum) or 1440px (recommended)
- **Aspect Ratio:** 16:9 (landscape) or 9:16 (portrait) - both work with `resizeMode="cover"`

**File Format:**
- **JPG** (recommended) - smaller file size, good for photos
- **PNG** - better quality but larger file size

**File Size:**
- Try to keep under 2MB for better performance
- Optimize the image before uploading

**Image Requirements:**
- Should include food elements (cooking ingredients, prepared dishes, etc.)
- Should include greenery (herbs, vegetables, fresh produce, etc.)
- Good contrast for text readability (the dark overlay will help)
- High quality and sharp

### How to Add Your Image

1. **Prepare your image:**
   - Use an image editor to resize to recommended dimensions
   - Optimize the file size
   - Ensure it includes food and greenery elements

2. **Upload the image:**
   - Place the file in this directory: `assets/images/`
   - Name it exactly: `food-background.jpg` (or `.png` if using PNG format)
   - If using PNG, update the import in `app/auth.tsx` to use `.png` extension

3. **Update the code:**
   - Open `app/auth.tsx`
   - Find the section around line 47-59 with the image configuration
   - Comment out the URL line (line 59):
     ```typescript
     // const COOKING_BACKGROUND_IMAGE = { uri: "https://..." };
     ```
   - Uncomment the local image line (line 55):
     ```typescript
     const COOKING_BACKGROUND_IMAGE = require("@/assets/images/food-background.jpg");
     ```
   - If you use a different name or format (e.g., `.png`), update the path accordingly
   - Save the file and restart your development server

### Testing

After adding your image:
1. Restart your Expo development server
2. The image should appear on the sign-up/sign-in screen
3. The dark overlay (70% opacity) will ensure text remains readable

### Alternative: Using Online Image

If you prefer to use an online image URL instead, you can change the code in `app/auth.tsx`:
```typescript
const COOKING_BACKGROUND_IMAGE = { uri: "https://your-image-url.com/image.jpg" };
```

