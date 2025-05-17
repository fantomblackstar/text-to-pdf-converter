# Text to PDF Converter

A modern web application that converts text to PDF documents. Built with React, TypeScript, and Vite, following the Feature-Sliced Design (FSD) architecture.

## Features

- Convert text to PDF with a simple interface
- Preview generated PDFs directly in the browser
- View conversion history
- Preview previously converted documents

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/text-to-pdf-converter.git
   cd text-to-pdf-converter
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory based on `.env.example`
   - Add the required API credentials

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

### Running Tests

```bash
npm test
# or
yarn test
```

## Project Architecture

This project follows the Feature-Sliced Design (FSD) methodology, which is a structural methodology for frontend applications. The codebase is organized into layers:

```
src/
├── app/          # Application initialization, global styles, providers
├── pages/        # Compositional layer for routing and layout
├── widgets/      # Complex composite components (features composition)
├── features/     # User interactions, business logic
├── entities/     # Business entities
├── shared/       # Reusable infrastructure code (UI, libs, API)
```

### Key Components

- **Text Converter**: Main widget for converting text to PDF
- **History Table**: Widget for displaying conversion history
- **PDF Preview**: Feature for previewing generated PDFs

## Technologies

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Query
- Jest & React Testing Library

## License

MIT
