# 📚 Bookstore Frontend

A beautiful, modern React frontend for the Bookstore API built with Vite, React, and Tailwind CSS.

## ✨ Features

- **Modern UI Design**: Clean, responsive interface with smooth animations
- **Book Catalog**: Grid view of all books with genre-based color coding
- **Shopping Cart**: Add books, manage quantities, and checkout
- **Admin Panel**: Simple form to add new books to the inventory
- **Toast Notifications**: User-friendly feedback for all actions
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- **Loading States**: Smooth loading spinners while fetching data
- **Error Handling**: Graceful error messages with retry options

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:3000`

### Installation

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

## 🎨 Pages

### Home Page
- Displays all books in a responsive grid
- Book cards with genre-colored covers
- Genre badges with color coding
- "Add to Cart" buttons
- Stock availability indicators

### Cart Page
- View all cart items
- Quantity controls (+/- buttons)
- Remove items
- Total price calculation
- Checkout button
- Empty state with illustration

### Admin Page
- Form to add new books
- Fields: Title, Author, Genre, Price, Stock
- Input validation
- Success/error notifications

## 🎨 Genre Colors

The app uses color-coded badges and book covers based on genre:

- **Fiction**: Purple
- **Science Fiction**: Green
- **Fantasy**: Pink
- **Technology**: Blue
- **Mystery**: Yellow
- **Romance**: Red
- **Thriller**: Gray
- **Biography**: Indigo
- **History**: Orange

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the client folder:

```env
VITE_API_URL=http://localhost:3000
```

For production, update to your deployed API URL:

```env
VITE_API_URL=https://your-api-url.railway.app
```

## 📦 Building for Production

```bash
# Build the app
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist` folder.

## 🚀 Deployment

### Deploy to Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy using Netlify UI**:
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Base directory**: `client`
     - **Build command**: `npm run build`
     - **Publish directory**: `client/dist`
   - Add environment variable: `VITE_API_URL` with your API URL
   - Click "Deploy"

3. **Deploy using Netlify CLI**:
   ```bash
   # Login to Netlify
   netlify login

   # Initialize site
   netlify init

   # Deploy
   netlify deploy --prod
   ```

### Deploy to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy using Vercel UI**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variable: `VITE_API_URL`
   - Click "Deploy"

3. **Deploy using Vercel CLI**:
   ```bash
   vercel
   ```

### Other Hosting Options

The app can be deployed to any static hosting service:

- **GitHub Pages**: Use `gh-pages` npm package
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3 + CloudFront**: Upload `dist` folder
- **Cloudflare Pages**: Connect GitHub repository

## 🛠️ Tech Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **React Hot Toast**: Toast notifications
- **LocalStorage**: Cart persistence

## 📁 Project Structure

```
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Loading.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── Cart.jsx
│   │   └── Home.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 🌐 API Integration

The frontend connects to the backend API at:
- **Development**: `http://localhost:3000`
- **Production**: Set via `VITE_API_URL` environment variable

### API Endpoints Used

- `GET /books` - Fetch all books
- `GET /books/:id` - Fetch single book
- `POST /books` - Create new book (Admin)
- `PUT /books/:id` - Update book (Admin)
- `DELETE /books/:id` - Delete book (Admin)

## 🎯 Features Roadmap

- [ ] User authentication
- [ ] Order history
- [ ] Book search and filters
- [ ] Book ratings and reviews
- [ ] Wishlist functionality
- [ ] Dark mode toggle
- [ ] Multi-language support

## 🐛 Troubleshooting

### API Connection Issues

If you see "Failed to fetch books":

1. Ensure backend is running on `http://localhost:3000`
2. Check CORS is enabled on backend
3. Verify `VITE_API_URL` in `.env` is correct

### Build Errors

If build fails:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version (should be 18+)

### Hot Reload Not Working

1. Restart the dev server
2. Clear browser cache
3. Check for console errors

## 📄 License

MIT

## 🤝 Contributing

This is a training project for CloudBees Unify Week 2.

---

**Built with ❤️ using React + Vite + Tailwind CSS**
