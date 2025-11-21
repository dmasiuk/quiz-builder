# Quiz Builder - Interactive Quiz Creation Tool

## Project Description

Quiz Builder is a modern, responsive web application built with Next.js that allows users to create, edit, and publish interactive quizzes using a drag-and-drop interface. The application features a intuitive block-based editor where users can assemble quizzes from various components like headings, questions, buttons, and footers.

### Key Features:

- 🎯 **Drag & Drop Interface** - Easily arrange quiz elements with intuitive dragging
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 💾 **Local Storage** - All data persists locally in your browser
- 🎨 **Visual Editor** - Real-time preview of your quiz while editing
- 📤 **Publishing System** - Publish quizzes for sharing and viewing
- ⚡ **Fast Performance** - Built with Next.js for optimal speed

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quiz-builder
   ```

2. **Install dependencies**
   
   npm install
   or
   yarn install
   or
   pnpm install
   or
   bun install

4. **Run the development server**
   
   npm run dev
   or
   yarn dev
   or
   pnpm dev
   or
   bun dev

6. **Open your browser**
   Navigate to http://localhost:3000 to view the application.

7. **Start building quizzes!**

   Click "Create Quiz" to start a new project

   Drag blocks from the left sidebar to the canvas

   Customize each block's properties

   Save and publish your quiz

## First-Time Setup Notes

   The application will automatically initialize with example quizzes

   All data is stored in your browser's local storage

   No additional configuration or environment variables required

## Available Scripts

   The following npm scripts are available for development and production:

   **npm run dev** - Starts the development server with hot reload
   **npm run build** - Creates an optimized production build
   **npm run start** - Starts the production server (run after build)
   **npm run lint** - Runs ESLint to check code quality and find issues

## Tech Stack

### Core Technologies

- **Next.js 16.0.3** - React framework with App Router for server-side rendering and routing
- **React 19.2.0** - Latest React version with React Compiler for optimized performance
- **TypeScript 5** - Type-safe JavaScript for better development experience
- **Tailwind CSS 4** - Latest utility-first CSS framework with PostCSS, chosen due fast convenient way for styling, CSS optimization and minification
- **React DnD 16** - Drag and drop library for interactive block rearrangement, chosen for its simple architecture and built-in customizable features

### Development Tools

- **ESLint 9** - Modern code linting for maintaining code quality
- **React Compiler (Babel)** - Automatic React performance optimizations
- **PostCSS** - CSS processing tool for Tailwind CSS

### Utilities

- **UUID** - Generate unique identifiers for quiz blocks and elements

### Storage

- **LocalStorage** - Client-side data persistence (Frontend-Only variant)

### Architecture Alternatives

This project demonstrates a **Frontend-Only** implementation as specified in the requirements. Alternative approaches could include:

- **React + Vite** - For a pure client-side SPA without SSR
- **Next.js + Backend** - Full-stack version with database persistence
- **Other UI Libraries** - Vue.js, Svelte, or Angular
- **Styling approaches** - CSS, SASS/SCSS, SCSS modules, Styled Components

## Project Structure

### Current Architecture

This project follows Next.js App Router conventions with a component-based architecture:

- **`app/`** - Next.js App Router pages and layouts
  - Uses file-based routing for automatic route generation
- **`components/`** - Reusable UI components organized by feature
  - `ui/` - Base UI components (Button, Input, Modal, etc.)
  - `quiz/` - Quiz-specific components (Editor, Renderer, etc.)
  - `blocks/` - Individual block components (Heading, Question, etc.)
- **`lib/`** - Utility functions and shared logic
  - `storage.ts` - LocalStorage abstraction layer
  - `types.ts` - TypeScript type definitions
- **`contexts/`** - Contexts (since using a state manager is not justified here)

### Architecture Alternatives Considered

- **Pages Router** - Traditional Next.js approach with `pages/` directory
- **Feature-based Organization** - Grouping by feature rather than file type
- **Atomic Design** - Organizing components as atoms, molecules, organisms
- **Domain-Driven Design** - Structuring around business domains and contexts

### Design Decisions

- **App Router** chosen for modern React features and better performance
- **Component Co-location** - Related components stay together for maintainability
- **TypeScript First** - Full type safety throughout the application
- **Frontend-Only Focus** - Simplified architecture as per project requirements

## Potential Improvements

### UI/UX Improvements

- **Table Sorting** - Add sorting functionality to the quizzes table (by title, status, date)
- **Pagination** - Implement pagination for better performance with large numbers of quizzes
- **Enhanced Styling** - Integrate `clsx` or `classnames` library for more dynamic and conditional CSS classes

### Quiz Functionality

- **Multi-step Quizzes** - Add navigation between questions with Next/Previous buttons
- **Question Progression** - Implement proper quiz flow with question sequencing
- **Answer Validation** - Add client-side validation for required questions
- **Quiz Results** - Create a results page showing user scores and correct answers

### Advanced Features

- **Quiz Templates** - Pre-built quiz templates for common use cases
- **Export Functionality** - Export quizzes as JSON or shareable links
- **Undo/Redo** - Implement undo/redo functionality in the editor
- **Keyboard Shortcuts** - Hotkeys for common editor actions

### Technical Enhancements

- **Backend Integration** - Migrate from localStorage to a proper database
- **Real-time Collaboration** - Multiple users editing the same quiz simultaneously
- **Accessibility** - Improve screen reader support and keyboard navigation
- **State manager** - Improve global state management
