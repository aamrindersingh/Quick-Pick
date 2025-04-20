# Quick Pick

## Description

Quick Pick is a modern, responsive e-commerce web application built with React and a clean, intuitive UI. It offers a seamless shopping experience, allowing customers to browse, search, and filter products, manage their cart, and complete purchases effortlessly. Administrators can easily manage the product inventory through a user-friendly interface.

## Features

### Product Management
- **Responsive Catalog**: Browse products in a responsive grid layout.
- **Add Products**: Create new products with name, price, and image.
- **Edit Products**: Update existing product details.
- **Delete Products**: Remove products from the inventory.
- **Search & Filter**: Quickly find products by name or category.

### Shopping Cart
- **Add to Cart**: Add products to your shopping cart.
- **Quantity Management**: Increase or decrease item quantities.
- **Remove Items**: Delete individual items from the cart.
- **Cart Summary**: View total price and item count.
- **Clear Cart**: Empty your entire cart with one click.

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile.
- **Multiple Themes**: Switch between light and dark modes dynamically.
- **Smooth Animations**: Leveraging Framer Motion for transitions.
- **Modern Components**: Built with DaisyUI and TailwindCSS.

### Image Search Integration
- **Unsplash API**: Search and select product images.
- **Category Selection**: Browse predefined image categories.
- **Image Preview**: Preview and choose the best image before adding.

## Tech Stack

### Frontend
- React
- Vite
- TailwindCSS & DaisyUI
- Framer Motion
- React Router
- Zustand
- Axios
- React Hot Toast
- Lucide React

### Backend
- Node.js & Express
- Sequelize ORM
- PostgreSQL
- CORS
- Dotenv

### Integrations
- Unsplash API for image search

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL installed and running
- Unsplash API key


## Frontend Setup

---

### 1. Clone the repository:

```bash
git clone <repository-url>
cd quick-pick
```

### 2. Navigate to the frontend directory:

```bash
cd frontend
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Start the frontend development server:
```bash
npm run dev
```

### Backend Setup
```bash
# Navigate to the backend directory
cd quick-pick/backend

# Install dependencies
npm install

# Create .env file and add your configuration:
# DATABASE_URL=postgres://user:password@localhost:5432/quick_pick

# Create the PostgreSQL database
createdb quick_pick

# Run migrations (if using Sequelize CLI)
npx sequelize db:migrate

# Start the server
npm run dev
```
The backend API will be available at http://localhost:3000.

## Screenshots

> **Note:** Add actual screenshots in the `screenshots/` directory and update paths accordingly.

| Screen                  | Preview                                |
| ----------------------- | -------------------------------------- |
| Home Page               | ![Home Page](./screenshots/home.png)   |
| Product Details / Edit  | ![Product Edit](./screenshots/edit.png)|
| Shopping Cart           | ![Cart](./screenshots/cart.png)        |
| Theme Selector          | ![Theme Selector](./screenshots/theme.png)|
| Image Search Modal      | ![Image Search](./screenshots/image_search.png)|

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Unsplash](https://unsplash.com/) for the image search API.
- [DaisyUI](https://daisyui.com/) for UI components.
- All open-source libraries and contributors that made this project possible.

