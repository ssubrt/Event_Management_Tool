# EventEase 🎉

> **Professional Event Management Made Simple**

EventEase is a comprehensive, full-stack event management platform built with modern web technologies. It provides everything you need to create, manage, and track events from planning to execution with a beautiful, responsive interface.

![EventEase Banner](https://via.placeholder.com/800x200/3B82F6/FFFFFF?text=EventEase+-+Professional+Event+Management)

## ✨ Features

### 🎯 Core Features
- **Event Management**: Create, edit, delete, and manage events with comprehensive details
- **RSVP System**: Track attendees with real-time RSVP management
- **Dashboard Analytics**: Professional dashboard with event statistics and insights
- **Role-Based Access**: Multi-level user roles (Admin, Staff, Event Owner)
- **Public Event Pages**: Shareable public pages for event registration
- **Attendee Management**: Export attendee data and manage RSVPs

### 🔐 Authentication & Security
- **Secure Authentication**: JWT-based authentication system
- **Protected Routes**: Role-based route protection
- **Password Encryption**: bcrypt password hashing
- **Session Management**: Persistent login sessions

### 🎨 User Experience
- **Responsive Design**: Mobile-first, fully responsive interface
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Real-time Updates**: Instant notifications and state updates
- **Loading States**: Skeleton loading and smooth transitions
- **Error Handling**: Comprehensive error handling with user feedback

## 🏗️ Technology Stack

### Frontend
- **Framework**: [Next.js 13](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **API**: Next.js API Routes
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)
- **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)

### Development Tools
- **Type Checking**: TypeScript
- **Linting**: ESLint with Next.js config
- **Database Studio**: Prisma Studio
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn**
- **PostgreSQL** database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eventease.git
   cd eventease
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/eventease"
   
   # JWT Secret (use a strong, random string)
   JWT_SECRET="your-super-secret-jwt-key-here"
   
   # Better Auth Secret (use a strong, random string)
   BETTER_AUTH_SECRET="your-better-auth-secret-key-here"
   
   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Open Prisma Studio to view your database
   npm run db:studio
   ```

5. **Seed the database (Optional)**
   
   To populate your database with sample data for testing:
   ```bash
   npx prisma db seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔑 Testing Credentials

After running the database seed, you can use these test accounts to explore the application:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Admin** | `admin@eventease.com` | `password123` | Full system access, can manage all events and users |
| **Event Owner** | `john@example.com` | `password123` | Can create and manage own events |
| **Event Owner** | `jane@example.com` | `password123` | Can create and manage own events |
| **Staff** | `staff@eventease.com` | `password123` | Limited access, can assist with event management |

> 💡 **Note**: These are test credentials for development only. In production, ensure strong passwords and proper user registration.

## 📁 Project Structure

```
eventease/
├── app/                     # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── events/         # Event management endpoints
│   │   └── dashboard/      # Dashboard data endpoints
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard page
│   ├── events/             # Event management pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── events/            # Event-related components
│   ├── layout/            # Layout components
│   └── ui/                # UI primitives
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── store/             # Redux store configuration
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
├── prisma/                # Database schema and migrations
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |

## 📊 Database Schema

The application uses a PostgreSQL database with the following main entities:

### User
- **Fields**: id, email, name, password, role, timestamps
- **Roles**: ADMIN, STAFF, EVENT_OWNER
- **Relations**: One-to-many with Events

### Event
- **Fields**: id, title, description, location, dates, capacity, status, visibility
- **Status**: DRAFT, PUBLISHED, CANCELLED, COMPLETED
- **Relations**: Many-to-one with User, One-to-many with RSVP

### RSVP
- **Fields**: id, name, email, phone, message, status, timestamps
- **Status**: PENDING, CONFIRMED, DECLINED
- **Relations**: Many-to-one with Event

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - List events (with filters)
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get specific event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event
- `POST /api/events/[id]/rsvp` - RSVP to event
- `GET /api/events/[id]/attendees/export` - Export attendees

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🎨 UI Components

EventEase uses a comprehensive set of UI components built with Radix UI:

- **Forms**: Input, Textarea, Select, Checkbox, Radio
- **Navigation**: Navbar, Breadcrumbs, Tabs
- **Feedback**: Toast notifications, Loading skeletons, Error states
- **Overlays**: Modal dialogs, Alert dialogs, Popovers
- **Data Display**: Cards, Tables, Statistics

## 🔐 Authentication Flow

1. **Registration**: Users register with email, name, and password
2. **Login**: JWT token issued upon successful authentication
3. **Authorization**: Protected routes check for valid JWT
4. **Role-based Access**: Different features based on user role
5. **Session Persistence**: Token stored in localStorage

## 🌟 Key Features Walkthrough

### Event Creation
1. Navigate to `/events/create`
2. Fill in event details (title, description, location, dates)
3. Set capacity, visibility, and status
4. Submit to create event

### Event Management
1. View all events in `/events`
2. Filter by status and search by title
3. Edit or delete events with actions menu
4. View detailed analytics per event

### RSVP Management
1. Public users can RSVP via event page
2. Event creators can view all RSVPs
3. Export attendee data as CSV
4. Manage RSVP status (confirm/decline)

### Dashboard Analytics
1. View total events, RSVPs, and performance metrics
2. See recent events and activity
3. Quick actions for common tasks
4. Account information and settings

## 🚀 Deployment

### Environment Variables
Ensure these are set in your production environment:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
BETTER_AUTH_SECRET="your-production-auth-secret"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Build and Deploy

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - **Vercel**: Connect your GitHub repo
   - **Netlify**: Build command: `npm run build`
   - **Railway**: Automatic deployment from GitHub
   - **Docker**: Use the included Dockerfile

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure responsive design compatibility
- Test on multiple browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Contact the maintainers** at support@eventease.com

## 🏆 Acknowledgments

- [Next.js team](https://nextjs.org/) for the amazing framework
- [Prisma team](https://www.prisma.io/) for the excellent ORM
- [Radix UI team](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- All contributors and the open-source community



**Version**: 0.1.0  
**Last Updated**: June 2025  
**Maintainer**: EventEase Team

