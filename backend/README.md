# Image Processing API Documentation

## Base URL
`/images`

## Endpoints
### GET `/images/:operation?src=<image_path/image_url>`
### POST `/images/:operation` (with file upload)

## Detailed Operations Guide

### Sizing Operations

#### Width (`width` or `w`)
```
width(value)
```
Options:
- Pixels: `width(300)` - Sets width to 300px
- Percentage: `width(50)` - Sets width to 50% of original

#### Height (`height` or `h`)
```
height(value)
```
Options:
- Pixels: `height(300)` - Sets height to 300px
- Percentage: `height(50)` - Sets height to 50% of original

#### Resize
```
resize(dimensions)
```
Options:
- Pixels: `resize(300x200)` - Width 300px, height 200px
- Percentage: `resize(50)` - 50% of original size
- Maintain aspect ratio:  use either `h(...) or w(...)`

#### Fit
```
fit(dimensions)
```
Options:
- `cover, contain, fill, inside, outside`
- `fit(contain)` - Contains whole image (either height or width might be ignored so whole image can return)
- `fit(cover)` - Preserving aspect ratio, attempt to ensure the image covers both provided dimensions by cropping/clipping to fit
- `fit(fill) ` - Ignore aspect ratio, squeeze or stretch image to fit set width or/ and height
- `fit(inside) ` - Preserving aspect ratio, resize the image to be as large as possible, using set height or/and width as maximum possible values
- `fit(outside) ` - Preserving aspect ratio, resize the image to be as small as possible, using set height or/and width as minimum possible values

```
position(preset)
```
Options:
- `'center','top','right-top','right','right-bottom','bottom','left-bottom','left','left-top','entropy','attention'`
- Sample `position(contain)` - CHoose where to focus on while clipping the rest of the image (from your crop)

### Color Operations

#### Black and White (`blackandwhite`, `baw`, or `bw`)
```
blackandwhite(threshold?)
```
Options:
- Simple: `blackandwhite()` - Default conversion
- Threshold: `blackandwhite(128)` - Custom threshold (0-255)

#### Grayscale (`gray` or `grey`)
```
gray()
```
Options:
- `gray()` - Standard grayscale

#### Negative (`negative`)
```
negative()
```
Options:
- `negative()` - applies a negative filter

#### Grayscale (`normalise` or `normalize`)
```
normalise(top, bottom)
```
Options:
- `normalise([1-100], [1-100])` - Enhance output image contrast by stretching its luminance to cover a full dynamic range.

#### Tint
```
tint(r,g,b,a?)
```
Options:
- RGB: `tint(255,0,0)` - Red tint
- RGBA: `tint(255,0,0,0.5)` - Semi-transparent red
- Hex: `tint(FF0000)` - Red using hex (hex will be added in code.. do not add in  url)
- Named: `tint(red)` - Using color name

#### Adjust
```
adjust(brightness, saturation, hue, lightness)
```
Options:
- `adjust(1.2;1.5,0,0)`

#### Trim
Description:
Removes "empty" space around an image by trimming pixels matching the image background color.

Options:
- Simple: `trim()` - Automatically detects and removes background
- Threshold: `trim(10)` - Tolerance threshold for background color matching (1-99)
  - Lower values = more precise matching
  - Higher values = more aggressive trimming
- Background: `trim(10,white)` - Specify background color to trim
  - Can use named colors: `white`, `black`, etc.
  - Hex colors: `#FFFFFF`
  - RGB: `rgb(255,255,255)`

Examples:
```http
GET /images/trim()?src=image-with-whitespace.png
GET /images/trim(black)?src=image-with-borders.jpg
GET /images/trim(black, 5)?src=image-with-black-borders.png
```

Best used for:
- Removing unwanted borders
- Cleaning up scanned images
- Optimizing image space
- Removing excess transparent areas in PNG files

Note: The operation is particularly useful for:
- Product photos with solid backgrounds
- Scanned documents
- Screenshots with excess space
- PNG images with transparent edges

### Enhancement Operations
#### Enhance
```
enhance(width, height, maxSlope)
```
Options:
- `enhance(10,20, [default- 3])` - Perform contrast limiting adaptive histogram equalization (CLAHE)

#### Sharpen
```
sharpen(preset: [1-10])
```
Options:
- `sharpen(1)` - sharpen with 10 preset intensities..

#### Blur
```
blur(percent: [1-100])
```
Options:
- `blur(5)` - Blur intensity

#### Smooth
```
smooth(percent: [1-100])
```
Options:
- `smooth(10)` - i like to call smooth smudge

#### Detail
```
detail(preset[1,2,3,4,5])
```
Options:
- `detail(1)` - the higher the number,the better but also uses more processing and time

### Transformation Operations

#### Rotate
```
rotate(degrees)
```
Options:
- Degrees: `rotate(90)` - 90° clockwise

#### Flip
```
flip(axis)
```
Options:
- Horizontal: `flip(x)`
- Vertical: `flip(y)`

#### Crop
```
crop(x,y,width,height)
```
Options:
- Pixels: `crop(0,0,300,300)` - From top-left

#### Circle
```
circle(radius in percentage)
```
Options:
- Radius: `circle(100)` - Specific radius in percent.. 100 = full circle

### Other Operations

#### Background (`background` or `bg`)
```
background(color)
```
Options:
- Color: `background(white)` - Named color
- Hex: `background(#FF0000)` - Hex color
- RGB: `background(255,0,0)` - With RGB

#### Gamma
```
gamma(value)
```
Options:
- Range: `gamma(2.2)` - 1.0 to 3.0

#### Watermark
```
watermark(text, color, fontSize, preset type)
```
Options:
- Usage: `watermark(Copyright,white/rgb/hex,40,1)`

#### Extension
```
extension(format,options?)
```
Options:
- Format: `extension(png)` - Change to PNG
- Quality: `extension(jpeg)` - JPEG with quality
- Supported formats: jpg, jpeg, png, webp, gif, avif, and tiff

## Chaining Examples

```http
GET /images/resize(300x300);circle(100)?src=example.jpg
```

## Notes
- All operations are processed in order
- Invalid parameters will fall back to defaults
- Some operations may affect performance with large images
- All percentage values should NOT include the % symbol