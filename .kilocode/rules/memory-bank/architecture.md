# Architecture

## 1. Overview

This project is a **Next.js 15** application using the **App Router**. The architecture is based on a standard Next.js project structure, with a clear separation of concerns between UI components, application logic, and styling.

## 2. Key Directories

- **`app/`**: Contains the core application routing and pages.
  - **`app/page.tsx`**: The main entry point and primary page for the BMR and TDEE calculator.
  - **`app/layout.tsx`**: The root layout for the application, defining the HTML structure and including global styles.
  - **`app/globals.css`**: Global CSS styles for the application.
- **`components/`**: Contains reusable React components.
  - **`components/ui/`**: Houses the `shadcn/ui` components that form the building blocks of the user interface.
- **`lib/`**: Contains utility functions and shared logic.
  - **`lib/utils.ts`**: A utility file provided by `shadcn/ui` for merging Tailwind CSS classes.
- **`hooks/`**: Contains custom React hooks.
- **`public/`**: Stores static assets like images and fonts.

## 3. Core Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI**: React, shadcn/ui
- **Styling**: Tailwind CSS

## 4. Data Flow

- All calculations (BMR and TDEE) are performed on the client-side.
- User input is managed using React state.
- The application does not currently have a backend or database.

## 5. Key Technical Decisions

- **App Router**: The project uses the Next.js App Router for routing and layouts, enabling features like server components and layouts.
- **shadcn/ui**: The use of `shadcn/ui` provides a set of accessible and customizable components, accelerating UI development.
- **TypeScript**: Enforces type safety and improves code quality.
