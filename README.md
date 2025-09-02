# 🏠 Sakenny (سكنّي) – Frontend  

<img width="1920" height="767" alt="screencapture-localhost-4200-rent-2025-08-19-20_37_29" src="https://github.com/user-attachments/assets/c3b8283e-584e-40b9-9c03-5b3f5d4db873" />  

<h2 align="center">  
  <b>A Full-Stack Property Rental Platform built with .NET & Angular</b><br>  
  Graduation Project – ITI Alexandria | Full Stack Development Track  
</h2>  

<p align="center">  
  <img src="https://img.shields.io/badge/Angular-20-DD0031?logo=angular&logoColor=white" width="120"/>  
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" width="150"/>  
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss&logoColor=white" width="170"/>  
  <img src="https://img.shields.io/badge/PrimeNG-Components-0E7FC0?logo=prime&logoColor=white" width="200"/>  
  <img src="https://img.shields.io/badge/Stripe-Payments-626CD9?logo=stripe&logoColor=white" width="180"/>  
  <img src="https://img.shields.io/badge/Google%20Maps-Integration-4285F4?logo=googlemaps&logoColor=white" width="240"/>  
</p>  

---  

## 📖 Overview  

**Sakenny (سكنّي)**, meaning *"House me"* in Arabic, is a property rental platform inspired by **Airbnb**.  
This repository contains the **Frontend**, built with **Angular, Tailwind CSS, and PrimeNG** to provide a **responsive, interactive, and role-based user experience**.  

The frontend enables:  
- 👤 **Customer** – Browse and rent properties, manage booking history, make secure payments via Stripe, and view locations on Google Maps.  
- 🏡 **Host** – Submit properties for rent (with Google Maps location), manage listings, track income, and access a personalized dashboard.  
- 🛡️ **Admin** – Review and approve property requests, manage users & data, and access an advanced analytics dashboard.  

### 🔑 Key Highlights  
- 🎨 **Modern UI** powered by **Tailwind CSS** and **PrimeNG**  
- 🔐 Authentication & Authorization with JWT + Google Login  
- 💳 Secure payment processing via **Stripe**  
- 📍 Location services powered by **Google Maps API**  
- 📊 Role-based dashboards (Customer, Host, Admin)  
- 📅 Real-time booking validation (dates locked on checkout & backend validation)

---  

## 🎥 Demo  

Check out the demo of **Sakenny** here:  
👉 [Watch on Google Drive](https://drive.google.com/file/d/11fuxYuJosbBAPWGHLppTfDMLN1UKH55X/view?usp=sharing)  

---

## ✨ Features  

The **Sakenny Frontend** delivers a modern, interactive, and responsive interface for all types of users.  
It is built with **Angular, Tailwind CSS, and PrimeNG**, and integrates seamlessly with the backend API.  

### 🔑 Authentication & Authorization  
- Role-based guards for **Customer**, **Host**, and **Admin**.  
- JWT-based login flow.  
- Signup & login with **Google OAuth**.  

### 🏡 Property Management  
- Dynamic property listing with advanced **filters** (price, type, location, amenities).  
- Property detail pages with images, amenities, reviews, and location map.  
- Hosts can submit new properties using a **Google Maps location picker**.  

### 📍 Location Services  
- **Google Maps API** integration for:  
  - Selecting property location during submission.  
  - Viewing property locations on detail pages.  
  - Suggesting **nearby properties** to customers.  

### 💳 Payment Integration  
- Stripe-powered **checkout pages**.  
- **Payment success** & **cancel pages** for clear transaction flow.  
- Integration with backend to store booking & payment history.  

### 📅 Booking System  
- Date-range picker with real-time availability validation.  
- Booked dates automatically disabled in the UI.  
- Rental history displayed in **Customer Dashboard**.  

### 📊 Dashboards  
- **Customer Dashboard** – Manage bookings & profile.  
- **Host Dashboard** – Track properties, income, and requests.  
- **Admin Dashboard** – Manage users, approvals, and system analytics.  

### 🎨 Reusable Components  
- **Navbar, Footer, Property Card, Date Picker** (shared across pages).  
- Built with **Tailwind CSS** + **PrimeNG** for a clean, responsive UI.  

### 📱 Responsive Design  
- Fully optimized for **desktop, tablet, and mobile**.  
- Tailwind utilities ensure consistent layouts across screen sizes.  

---  

## 🛠️ Tech Stack  

The **Sakenny Frontend** is built with modern technologies to ensure scalability, responsiveness, and a smooth user experience.  

<p align="center">  
  <img src="https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>  
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>  
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>  
  <img src="https://img.shields.io/badge/PrimeNG-UI%20Components-0E7FC0?style=for-the-badge"/>  
  <img src="https://img.shields.io/badge/Stripe-Checkout-626CD9?style=for-the-badge&logo=stripe&logoColor=white"/>  
  <img src="https://img.shields.io/badge/Google%20Maps-API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white"/>  
</p>  

### 📦 Frontend Technologies  
- **Angular 20** – Core frontend framework.  
- **TypeScript** – Strongly-typed language for scalable code.  
- **Tailwind CSS** – Utility-first CSS framework for responsive design.  
- **PrimeNG** – Rich UI component library for Angular.  
- **Stripe Checkout** – Secure online payments integration.  
- **Google Maps API** – Location services and map integration.  

### 🎨 Styling  
- **Tailwind CSS** used for global styles, layouts, and responsiveness.  
- **PrimeNG** used for advanced UI components (e.g., date pickers, dialogs, forms).  

---

## 📂 Folder Structure  

The frontend project follows a **modular structure** for scalability and maintainability.  
The `app/` folder contains three main directories: **components**, **core**, and **shared**.  

```plaintext
Sakenny.Frontend/
└── src/app/
    ├── components/            # Main pages & their child components
    │   ├── home/              # Homepage with featured properties & filters
    │   ├── property-listing/  # Property search & filtering
    │   ├── property-details/  # Property info, images, amenities, reviews
    │   ├── checkout/          # Booking & Stripe payment
    │   ├── dashboard/         # Role-based dashboards (Customer, Host, Admin)
    │   ├── auth/              # Login, Signup, Google OAuth
    │   ├── add-property/      # Host property submission with Google Maps
    │   └── ...                # Other feature modules
    │
    ├── core/                  # Core application logic
    │   ├── guards/            # Route guards (auth, role-based access)
    │   ├── interceptors/      # HTTP interceptors (JWT token handling)
    │   ├── services/          # API communication & state management
    │   └── interfaces/        # TypeScript interfaces for data models
    │
    └── shared/                # Reusable UI components
        ├── navbar/            # Navigation bar
        ├── footer/            # Footer
        ├── property-card/     # Property preview card
        ├── date-range-picker/ # Calendar for booking dates
        └── ...                # Other shared components
```
---

## 📄 Pages

The **Sakenny** frontend includes a variety of pages designed for different user roles (guest, user, host, admin):

- **🏠 Home Page**  
  - About the website  
  - Top properties  
  - Initial search and filter  

- **📋 Property Listing**  
  - Complete list of properties with pagination  
  - Advanced filters:  
    - Hierarchical locations (Country → City → District)  
    - Property type, amenities, price, size, number of people  
  - Interactive search  

- **🏡 Property Details**  
  - Image carousel of the property  
  - Description, amenities, and reviews  
  - Location displayed on a map  
  - Host profile of the property owner  

- **💳 Checkout (Authenticated only)**  
  - Date selection  
  - Stripe payment integration  
  - Redirects to payment success / cancel pages  

- **🔑 Authentication**  
  - Login and signup  
  - Google login option  

- **👤 Profile**  
  - View and edit profile details  
  - Update password  
  - For users: shows active and past rentals  
  - For hosts: shows properties, reservations, and earnings  

- **➕ Add Property (Hosts only)**  
  - Form to add a property with full details  
  - Map integration for selecting pin location (longitude, latitude, address, etc.)  

- **🛠️ Admin Dashboard**  
  - Analytics and insights for the entire platform  
  - Review and approve host requests  
  - Review and approve new property submissions
 
---

## 🎨 Design Principles

The design of **Sakenny** follows modern UI/UX practices to ensure a clean, accessible, and user-friendly experience:

- **Simplicity & Clarity**  
  Minimalist design with a focus on usability and easy navigation.  

- **Responsiveness**  
  Fully responsive layouts built with **TailwindCSS**, ensuring smooth experience across desktops, tablets, and mobiles.  

- **Consistency**  
  Unified color theme and component styling to maintain a coherent look and feel.  

- **Reusability**  
  Modular components (e.g., property cards, filters, carousels) designed for reusability across multiple pages.  

- **Accessibility**  
  Semantic HTML and ARIA attributes where needed to improve accessibility.  

- **Performance**  
  Optimized loading with lazy loading for images and efficient API integration.  

- **Modern UI Libraries**  
  Leveraging **PrimeNG** selectively for advanced components while keeping Tailwind as the core styling system.
  
---

## 🛠️ Backend Repository  

The **Sakenny Backend** is developed with **.NET 8.0**, following **N-Tier Architecture** and **Clean Code principles**.  
It provides all the core functionalities of the platform including **authentication & authorization**, **payment integration with Stripe**, **image storage via Azure Blob (Azurite)**, **Google Maps integration**, and a robust **booking system**.  

👉 Check it out here: [Sakenny Backend Repository](https://github.com/CozyQuest/sakenny.git)

---

## 📜 License  

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this software, provided that proper attribution is given.  

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 👨‍💻 Team  

Meet the people behind this project:  

| Avatar | Name | GitHub |
|--------|------|--------|
| <img src="https://avatars.githubusercontent.com/u/39447236?v=4" width="50" height="50" style="border-radius:50%"/> | **Mohab Wafaie** | [@MohabWafaie](https://github.com/MohabWafaie) |
| <img src="https://avatars.githubusercontent.com/u/75574826?v=4" width="50" height="50" style="border-radius:50%"/> | **Ahmed Waleed** | [@Ahmedabdeen15](https://github.com/Ahmedabdeen15) |
| <img src="https://avatars.githubusercontent.com/u/103130605?v=4" width="50" height="50" style="border-radius:50%"/> | **Nancy EL Sherbiny** | [@NancELSherbiny](https://github.com/NancELSherbiny) |
| <img src="https://avatars.githubusercontent.com/u/105066899?v=4" width="50" height="50" style="border-radius:50%"/> | **Marwan Fawzy Shahat Mahmoud** | [@ArabianHindi](https://github.com/ArabianHindi) |
| <img src="https://avatars.githubusercontent.com/u/152093660?v=4" width="50" height="50" style="border-radius:50%"/> | **Rodina Elfeky** | [@RodinaElfeky](https://github.com/RodinaElfeky) |
| <img src="https://avatars.githubusercontent.com/u/95757948?v=4" width="50" height="50" style="border-radius:50%"/> | **Ahmed Aseel** | [@Ahmed-Aseel](https://github.com/Ahmed-Aseel) |

---

## 💖 Made with Love
Built with passion and dedication by the ITI Alexandria graduates.  
We hope you enjoy exploring **Sakenny** as much as we enjoyed building it!
