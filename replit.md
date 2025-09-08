# Visionary AI Platform

## Overview

Visionary AI is a modern AI-powered creative tools platform built as a full-stack web application. The platform offers a comprehensive suite of AI tools including text-to-image generation, background removal, image upscaling, and image-to-sketch conversion. It features a dark-themed, modern UI with gradient accents and focuses on providing an intuitive user experience for creative professionals and enthusiasts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The client-side application is built with React and TypeScript, utilizing a modern component-based architecture:

- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API for authentication state, TanStack React Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming, dark mode support built-in
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a modular component structure with clear separation between UI components, pages, and business logic. Components are organized into reusable UI elements and feature-specific components.

### Backend Architecture

The server-side is built with Express.js and TypeScript:

- **Framework**: Express.js with TypeScript
- **Development**: Hot reloading with Vite middleware in development mode
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Error Handling**: Centralized error handling middleware with proper status codes
- **Logging**: Request/response logging with performance timing

The backend uses a storage interface pattern that allows for easy switching between different storage implementations (currently using in-memory storage with plans for database integration).

### Data Storage Solutions

The application is designed with a flexible storage abstraction:

- **Schema Definition**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Current Implementation**: In-memory storage for development and testing
- **Database Configuration**: PostgreSQL with Neon database service integration configured
- **Migration System**: Drizzle Kit for database schema migrations

The storage layer implements a repository pattern with clear interfaces for CRUD operations, making it easy to switch between different storage backends.

### Authentication and Authorization

Firebase Authentication integration with Google sign-in:

- **Provider**: Firebase Auth with Google OAuth provider
- **Flow**: Redirect-based authentication flow for better mobile compatibility
- **State Management**: React Context for auth state with automatic token refresh
- **Session Persistence**: Firebase handles session persistence and token management

### External Dependencies

**Core Framework Dependencies:**
- React ecosystem (React, React DOM, React Router via Wouter)
- Express.js for server framework
- TypeScript for type safety across the stack

**UI and Styling:**
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible component foundations
- shadcn/ui for pre-built component library
- Lucide React for consistent iconography
- Inter and Space Grotesk fonts from Google Fonts

**State Management and Data Fetching:**
- TanStack React Query for server state management
- React Hook Form with Zod validation for form handling

**Database and ORM:**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the target database
- Neon Database for cloud PostgreSQL hosting

**Authentication:**
- Firebase Authentication for user management
- Google OAuth for social login integration

**Development Tools:**
- Vite for build tooling and development server
- ESBuild for production bundling
- PostCSS with Autoprefixer for CSS processing

**Third-party Services:**
- Firebase for authentication infrastructure
- Neon Database for PostgreSQL hosting
- Social platform integrations (Telegram, Twitter, Instagram, Discord)

The architecture prioritizes type safety, developer experience, and scalability while maintaining a modern, responsive user interface optimized for creative workflows.