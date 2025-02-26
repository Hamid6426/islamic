# Islamic Media Posting Website

This platform allows users to share, download, and embed Islamic images/posters in SVG format. Content can be easily shared on WhatsApp and used in websites or apps by other user after downloading

## Features

### 1. Islamic Media Library
- Collection of Islamic Posters, Quotes, Duas, Reminders, images of Famous Mosques
- Formats: SVG only

### 2. Easy Sharing & Downloading
- WhatsApp Sharing: One-click status & contact sharing
- Direct Download: Save images for personal or web use
- Embed Feature: Generate shareable HTML links for websites/apps

### 3. User Experience & Interface
- Simple, Islamic-themed UI (Clean, minimal, and easy to use)
- Search & Filters: Find images by categories, trending, new uploads
- Fast-loading images (Optimized for quick performance)

### 4. Allah’s Names Section (No need for backend)
- Interactive 99 Names of Allah (With meanings & explanations)
- Audio Recitations (Play and listen to the names)

---

## Tech Stack
- Frontend: React.js with Vite
- Backend: Laravel
- Database: MySQL

## FRONTEND PAGES

### Home Page (Landing Page)
- Show featured images
- Simple Islamic-themed UI
```
Route: /
```

### Image Detail Page
- Shows the full image preview
- WhatsApp Share Button (One-click sharing)
- Download Button (Save image to device)
- Embed Code (For websites/apps)
- Related images (suggest similar Islamic content)
```
Route: /images/{slug} (e.g., /image/beautiful-islamic-quote)
```

### Allah’s Names Page
- Interactive 99 Names of Allah
- Audio Play Button for pronunciation
- Meanings & Explanations
```
Route: /allah-names
```

### About Us Page
- Short introduction to the website’s purpose
- Contact & feedback form
```
Route: /about
```

### Admin Panel (Only for Admins)
- Upload New Images
- View Download & Share Stats
```
Route: /admin (Protected)
```

## TABLES

### Admin Table
```
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Images Table
```
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,  -- Unique slug for SEO-friendly URLs
    description TEXT NULL,
    svg_content TEXT NOT NULL,  -- Storing SVG as a string
    admin_id INT NOT NULL, -- To track which admin uploaded the image
    views INT DEFAULT 0,
    downloads INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);
```

### Shares Table
```
CREATE TABLE shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_id INT NOT NULL,
    share_count INT DEFAULT 0,
    last_shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,
    INDEX (image_id)  -- - Optimizes queries when tracking shares
);
```

## API ROUTES

### Admin Routes
| Method | Route                 | Description                    | Required Parameters       |
|--------|----------------------|--------------------------------|---------------------------|
| POST   | /api/admin/login     | Admin login                   | email, password          |
| POST   | /api/admin/logout    | Admin logout                  | None                      |
| POST   | /api/admin/register  | Register new admin (Optional) | name, email, password    |

### Image Routes
| Method | Route                  | Description                              | Required Parameters                    |
|--------|------------------------|------------------------------------------|----------------------------------------|
| GET    | /api/images            | Get all images                          | None                                  |
| GET    | /api/images/{slug}     | Get a single image by slug              | None                                  |
| POST   | /api/images            | Upload a new SVG image (Admin only)     | title, description, svg_content, admin_id |
| PUT    | /api/images/{slug}     | Update image details (Admin only)       | title, description, svg_content (optional) |
| DELETE | /api/images/{slug}     | Delete an image (Admin only)            | None                                  |

### Sharing & Tracking Routes
| Method | Route                       | Description                     | Required Parameters |
|--------|-----------------------------|---------------------------------|---------------------|
| POST   | /api/images/{id}/share      | Increase share count (WhatsApp tracking) | id (Image ID) |
| POST   | /api/images/{id}/download   | Increase download count         | id (Image ID) |
| POST   | /api/images/{id}/view       | Increase view count             | id (Image ID) |

## Directory
```
/project-root
│── /backend (Laravel Backend)
│   ├── /app
│   │   ├── /Console
│   │   ├── /Exceptions
│   │   ├── /Http
│   │   │   ├── /Controllers
│   │   │   │   ├── ApiController.php
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── ImageController.php
│   │   │   │   ├── AdminController.php
│   │   │   ├── /Middleware
│   │   │   │   ├── Authenticate.php
│   │   │   │   ├── Cors.php
│   │   ├── /Models
│   │   │   ├── User.php
│   │   │   ├── Image.php
│   │   │   ├── Admin.php
│   │   ├── /Providers
│   ├── /bootstrap
│   ├── /config
│   ├── /database
│   │   ├── /factories
│   │   ├── /migrations
│   │   │   ├── 2024_xx_xx_create_users_table.php
│   │   │   ├── 2024_xx_xx_create_images_table.php
│   ├── /public
│   │   ├── index.php
│   ├── /resources
│   │   ├── /views (For Blade templates, if needed)
│   ├── /routes
│   │   ├── api.php  (API Routes)
│   │   ├── web.php  (Web Routes)
│   ├── /storage
│   ├── /tests
│   ├── .env
│   ├── composer.json
│   ├── package.json
│   ├── artisan
│
│── /frontend (Vite React Frontend)
│   ├── /public
│   │   ├── 
│   ├── /src
│   │   ├── /assets
│   │   │   ├── logo.png
│   │   ├── /components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LogoutButton.jsx
│   │   │   ├── DeleteImageButton.jsx
│   │   │   ├── ShareImageButtons.jsx
│   │   │   ├── DownloadImageButtons.jsx
│   │   ├── /pages
│   │   │   ├── /admin
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── UploadImage.jsx
│   │   │   │   ├── UpdateImage.jsx
│   │   │   │   ├── ListAllImages.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   ├── AdminRegister.jsx (Registeration require OKAY from the super Admin e.g. Shamoon)
│   │   │   │   ├── AdminLogin.jsx (Registeration require OKAY from the super Admin e.g. Shamoon)
│   │   │   ├── /public
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Images.jsx
│   │   │   │   ├── {Image}.jsx
│   │   │   │   ├── AllahNames.jsx
│   │   │   │   ├── About.jsx
│   │   ├── /context
│   │   │   ├── AuthContext.jsx
│   │   ├── App.jsx (use react-router-dom and define routes here)
│   │   ├── main.jsx
│   ├── index.html
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md
│
│── .gitignore
│── README.md
```


## api.php

api.php file will look like this:

```
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ShareController;
use Illuminate\Support\Facades\Route;

// Admin Authentication
Route::post('/admin/login', [AdminController::class, 'login']);
Route::post('/admin/logout', [AdminController::class, 'logout']);
Route::post('/admin/register', [AdminController::class, 'register']); // Optional

// Image Routes
Route::get('/images', [ImageController::class, 'index']);
Route::post('/images', [ImageController::class, 'store'])->middleware('auth:admin');
Route::get('/images/{slug}', [ImageController::class, 'show']);
Route::put('/images/{slug}', [ImageController::class, 'update'])->middleware('auth:admin');
Route::delete('/images/{slug}', [ImageController::class, 'destroy'])->middleware('auth:admin');

// Sharing & Tracking
Route::post('/images/{slug}/share', [ShareController::class, 'share']);
Route::post('/images/{slug}/download', [ShareController::class, 'download']);
Route::post('/images/{slug}/view', [ShareController::class, 'view']);
```
