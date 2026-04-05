# 🌟 Authentica

**Verified Human Reviews for Local Businesses**

A modern, mobile-first review platform powered by World ID verification, ensuring every review comes from a real human. Discover trusted local businesses in Lafayette & West Lafayette with authentic, bot-free reviews.

## ✨ Features

### 🛡️ **Human-Verified Reviews**
- **World ID Integration**: Every review is verified through Worldcoin's World ID system
- **Zero Bot Reviews**: Cryptographic proof ensures only real humans can leave reviews
- **Multiple Reviews**: Users can update their opinions with additional reviews over time

### 🏪 **Local Business Directory**
- **68+ Local Businesses**: Comprehensive database of Lafayette & West Lafayette establishments
- **Smart Categories**: Organized by Food & Drink, Retail, Services, Health, Fitness, Beauty, and Professional
- **Auto-Generated Images**: Businesses automatically get high-quality images from Unsplash API

### 📱 **Mobile-First Design**
- **World App Mini App**: Fully integrated mobile experience
- **Responsive UI**: Optimized for mobile devices with iOS Safari compatibility
- **Animated Landing Page**: Eye-catching entrance with gradient animations and effects

### 🔍 **Discovery & Search**
- **Real-time Search**: Find businesses by name, category, subcategory, or address
- **Category Filtering**: Browse by business type
- **Featured Businesses**: Curated top-rated local spots (excluding hospitals)
- **Intelligent Sorting**: Highest-rated businesses prioritized

## 🚀 Tech Stack

### **Frontend**
- **Next.js 16.2.2** - React framework with App Router
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **styled-jsx** - Component-scoped CSS

### **Backend & Database**
- **SQLite** - Lightweight, serverless database
- **Prisma** - Type-safe ORM and query builder
- **Next.js API Routes** - Serverless API endpoints

### **Authentication & Identity**
- **World ID** - Human verification by Worldcoin
- **MiniKit** - World App integration
- **Cryptographic Nullifiers** - Privacy-preserving identity

### **External Services**
- **Unsplash API** - Automatic business imagery
- **World ID Developer Portal** - Identity verification

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 18+ and npm
- **World ID App Credentials** (for production)
- **Unsplash API Key** (optional, for image fetching)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/authentica.git
cd authentica
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="file:./dev.db"

# World ID Configuration
NEXT_PUBLIC_WLD_APP_ID="your_world_app_id"
NEXT_PUBLIC_WLD_ACTION="your_action_name"

# Unsplash API (Optional)
UNSPLASH_ACCESS_KEY="your_unsplash_access_key"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Initialize database
npx prisma db push

# Seed with sample businesses
npx tsx prisma/seed.ts
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 📁 Project Structure

```
authentica/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API endpoints
│   │   │   ├── businesses/    # Business-related APIs
│   │   │   ├── reviews/       # Review creation API
│   │   │   ├── sign/          # World ID signing
│   │   │   └── verify/        # World ID verification
│   │   ├── browse/            # Business browse page
│   │   ├── businesses/[id]/   # Business detail pages
│   │   ├── my-reviews/        # User profile & reviews
│   │   └── page.tsx           # Animated landing page
│   ├── components/            # React components
│   │   ├── BusinessCard.tsx   # Business listing card
│   │   ├── Header.tsx         # Navigation header (with animations)
│   │   ├── ReviewForm.tsx     # World ID review form
│   │   └── StarRating.tsx     # Rating component
│   ├── data/                  # Static data
│   │   └── businesses.ts      # Business listings & categories
│   └── lib/                   # Utilities
│       └── prisma.ts          # Database client
├── prisma/                    # Database schema & migrations
│   ├── schema.prisma          # Database models
│   └── seed.ts               # Sample data (68 businesses)
└── public/                   # Static assets
```

## 🎯 Usage

### For Users
1. **Land**: Experience the animated landing page
2. **Discover**: Browse local businesses by category or search
3. **Verify**: Connect with World ID for human verification
4. **Review**: Leave authentic reviews with ratings and text
5. **Track**: View your review history in your profile

### For Developers
1. **Add Businesses**: Update `src/data/businesses.ts` with new listings
2. **Customize Categories**: Modify business categories and subcategories
3. **Extend API**: Add new endpoints in `src/app/api/`
4. **Style Changes**: Update Tailwind classes for custom designs

## 🔧 Key Features

### **Landing Page**
- Animated gradient background with floating orbs
- Mouse-following spotlight effect
- Shimming text animation on "Authentica" title
- Minimal design with just title and "ENTER" button

### **Business Browse**
- Featured businesses section (excludes hospitals)
- Real-time search with debouncing
- Category filtering pills
- Responsive business cards with auto-generated images

### **Business Details**
- Consistent card styling matching dashboard
- Category • Subcategory • Neighborhood format
- Review submission with World ID verification
- No "already reviewed" restrictions

### **User Profile**
- Review history and statistics
- Account settings and preferences
- Saved businesses and drafts sections

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production
- `NEXT_PUBLIC_WLD_APP_ID`: World ID app identifier
- `NEXT_PUBLIC_WLD_ACTION`: World ID action name
- `DATABASE_URL`: Production database connection
- `UNSPLASH_ACCESS_KEY`: Image API access

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure mobile responsiveness
- Test World ID integration
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

### Get Help
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/authentica/issues)
- 📧 **Email**: support@authentica.app
- 💬 **Discord**: Join our community

### Documentation
- 🌐 **World ID Docs**: [docs.worldcoin.org](https://docs.worldcoin.org)
- ⚛️ **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- 🗃️ **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)

## 🌟 Acknowledgments

- **Worldcoin** - For providing human-proof identity verification
- **Unsplash** - For high-quality business imagery
- **Purdue University** - Local business community inspiration
- **Open Source Community** - For the amazing tools and libraries

---

**Built with ❤️ for authentic local discovery**
