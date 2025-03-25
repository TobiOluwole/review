# **📸 Image Processing API - Docker Overview**  

## **📝 About**  
The **Image Processing API** is a flexible and powerful **Nest.js-based** API for **real-time image transformations**.  
It supports operations like **resizing, cropping, filtering, watermarking, and format conversion**, with the ability to **chain multiple transformations** in one request!  

---

## **🚀 Running with Docker**  

### **1️⃣ Pull the Docker Image**  
```sh
docker pull tobioluwole/re-view:1.0.0
```

### **2️⃣ Run the Container**  
```sh
docker run -d -p 3000:3000 tobioluwole/re-view
```
Now access the API at:  
```
http://localhost:3000
```

---

## **🚀 Running on System**  

### **1️⃣ Pull the Git Repo**  
```sh
git pull [https://github.com/TobiOluwole/review](https://github.com/TobiOluwole/review)
```

### **2️⃣ Install all Node Modules**  
```sh
npm install
```
Now access the API at:  
```
http://localhost:3000
```

---

# **📌 API Usage**  

## **🔗 Base URL**  
```
/images
```

## **🔹 Available Endpoints**  

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/images/:operation?src=<image_url>` | Apply transformations via URL |
| **POST** | `/images/:operation` (upload file) | Process uploaded image |
| **POST** | `/images/save` (upload file) | Save an image for reuse |
| **POST** | `/images/delete?name=<image_path/image_url>` | Delete saved images |

---

# **🛠️ Supported Image Operations**  

## **📏 Sizing Operations**  
| Operation | Usage | Example |
|------------|-----------|-----------|
| **Width** | `width(px)` | `width(300)` → Resize to 300px wide |
| **Height** | `height(px)` | `height(200)` → Resize to 200px tall |
| **Resize** | `resize(widthxheight)` | `resize(300x200)` |
| **Fit** | `fit(mode)` | `fit(cover)`, `fit(contain)`, `fit(fill)`, `fit(scale-down)` |
| **Positioning** | `position(type)` | `position(center)`, `position(top)`, `position(left)`, `position(right)`, `position(bottom)`, `position(left-top)`, `position(left-bottom)`, `position(right-top)`, `position(right-bottom)`, `position(center-left)`, `position(center-right)`, `position(top-left)`, `position(top-right)`, `position(bottom-left)`, `position(bottom-right)`, `position(entropy)`, `position(attention)` |

---

## **🎨 Color Operations**  
| Operation | Usage | Example |
|------------|-----------|-----------|
| **Black & White** | `blackandwhite(threshold)` | `blackandwhite(128)` (Threshold: 0-255) |
| **Grayscale** | `gray()` | `gray()` (Convert to grayscale) |
| **Negative** | `negative()` | `negative()` (Invert colors) |
| **Normalize** | `normalise(low, high)` | `normalise(5, 95)` (Enhance contrast) |
| **Tint** | `tint(r,g,b,alpha)` | `tint(255,0,0,0.5)` (Red tint 50% opacity) |
| **Adjust** | `adjust(brightness,contrast,hue,saturation)` | `adjust(1.2,1.5,0,0)` |

---

## **🖼️ Image Enhancement**  
| Operation | Usage | Example |
|------------|-----------|-----------|
| **Trim** | `trim(color,tolerance)` | `trim(black,10)` |
| **Enhance** | `enhance(radius,strength,threshold)` | `enhance(10,20,3)` |
| **Sharpen** | `sharpen(amount)` | `sharpen(5)` (Higher = sharper) |
| **Blur** | `blur(radius)` | `blur(10)` (Higher = stronger blur) |
| **Smooth** | `smooth(radius)` | `smooth(10)` (Reduces noise) |
| **Detail** | `detail(level)` | `detail(3)` (Enhance image details) |

---

## **🔄 Transformation Operations**  
| Operation | Usage | Example |
|------------|-----------|-----------|
| **Rotate** | `rotate(degrees)` | `rotate(90)`, `rotate(-45)` |
| **Flip** | `flip(axis)` | `flip(x)`, `flip(y)`, `flip(xy)` |
| **Crop** | `crop(x,y,width,height)` | `crop(0,0,300,300)` |
| **Circle** | `circle(radius in percent)` | `circle(100)` (Crop into a full circle) |

---

## **🎭 Masking & Background**  
| Operation | Usage | Example |
|------------|-----------|-----------|
| **Background** | `background(color)` | `background(white)`, `background(#ff0000)` |
| **Gamma** | `gamma(level)` | `gamma(2.2)` (Adjust gamma) |
| **Watermark** | `watermark(text,color,size,preset type)` | `watermark(MyBrand,white,30,(1 or 2))` |

---

## **📄 Format Conversion**  
| Operation | Usage | Example |
|------------|-----------|-----------|
| **Format** | `extension(format)` | `extension(jpg)`, `extension(png)`, `extension(webp)` |

---

## **📌 Chaining Multiple Operations**  
You can **combine multiple transformations** in one request!  

```http
GET /images/resize(300x300);circle(100);gray()?src=https://example.com/sample.jpg
GET /images/resize(300x300);circle(100);gray()?src=sample.jpg
GET /images/resize(300x300);circle(100);gray()?src=profile-photos/user1.jpg
```

---

# **🔗 Example API Requests**  

## **1️⃣ Resize Image and Convert to Grayscale**  
```http
GET /images/resize(400x400);gray()?src=https://example.com/sample.jpg
```

## **2️⃣ Crop and Apply Watermark**  
```http
GET /images/crop(0,0,300,300);watermark(Logo,white,30,1)?src=https://example.com/sample.jpg
```

---

# **📌 Managing the Docker Container**  

### **🛑 Stopping the Container**  
```sh
docker ps  # List running containers  
docker stop <container_id>  # Stop the container  
docker rm <container_id>  # Remove the container  
```

---

# **⚡ Why Use This API?**  

✔️ **Flexible** - Supports multiple image operations  
✔️ **Fast** - Optimized for performance  
✔️ **Chaining Support** - Apply multiple effects at once  
✔️ **Multiple Formats** - Supports JPG, PNG, WebP, GIF, and more  
✔️ **Self-Hosted** - Deploy it anywhere with Docker  

---

# **🤝 Contributing**  
Feel free to **contribute**, open an **issue**, or suggest features on GitHub!  