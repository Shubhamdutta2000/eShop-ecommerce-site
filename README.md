# eShop

eShop official website where you can buy various products at very less price.

> eCommerce website made with MERN stack with redux as state management system with pwa functionality

![screenshot](https://github.com/Shubhamdutta2000/eShop/blob/main/frontend/public/assets/images/screenshots/carousalAdmin2.PNG)

## Features

### v1:

- Full featured shopping cart
- Payment Integration:
  - Stripe
  - Paypal
- List down all Products by category
- Product details
- Product Rating and Review System
- Profile Page with update functionality
- List Down User's Orders
- Authentication in every step
- Product Pagination
- Product Search Functionality
- Top Carousal
- Checkout Process:
  - Shipping Screen
  - PaymentMethod Screen
  - PlaceOrder Screen
- Breadcrumb

### v2:

- Sticky Navbar
- Custom title in each screen (in meta tag)
- Logout on JWT expire
- Descent Search Screen look
- Add upload image functionality (locally) (by accessing backend url)
- Admin Panel:
  - UserList
  - UserEdit
  - Product List
  - Product Edit
  - Product Create
  - OrderList
  - Order Edit (marked As Delivered)

### v3:

- Add Upload functionality ( stored in firebase cloud storage ) in product admin section
- Add PWA functionality to web app for highr engagement which prompt user to add to their mobile home screen

## Usage

### Install Dependencies

```
npm i
cd frontend
npm i
```

### Run Locally

```
cd ..
# Run both frontend (3000) and backend (5000) simultaneously
npm run dev
```

## Build & Deploy (frontend)

```
# Create frontend prod build
cd frontend
npm run build
```

## DEMO

- See this app live:- https://eshop-shubham.netlify.app/
