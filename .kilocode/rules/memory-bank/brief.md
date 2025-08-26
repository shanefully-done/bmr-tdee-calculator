# PRD: BMR & TDEE Calculator Web App

## Overview

A responsive web app built with **Next.js 15** and **shadcn/ui** to calculate **Basal Metabolic Rate (BMR)** and **Total Daily Energy Expenditure (TDEE)**. It prioritizes simplicity, speed, and usability.

---

## Goals

- Provide users with an accurate BMR and TDEE calculator.
- Default to **BMR calculation** for first-time use.
- Allow expansion to TDEE calculation after user input on activity level.
- Support light/dark mode with **system preference auto-detection**.
- Default to **metric system (kg, cm, years)**.

---

## Core Features

### 1. Theme

- **Light/Dark mode** using shadcn/ui theme toggler.
- Auto-detect system preference (`prefers-color-scheme`).
- Manual override (toggle switch).

### 2. Equations

- **Mifflin-St Jeor Equation** (metric default):

  - Male: `BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age_years) + 5`
  - Female: `BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age_years) - 161`

### 3. Default Flow

1. User enters:

   - Gender (male/female)
   - Age (years)
   - Height (cm)
   - Weight (kg)

2. On **submit**, app calculates and displays **BMR**.

### 4. Extended Flow (TDEE)

- After BMR is displayed, prompt user to select **activity level**.
- Activity levels:

  - Sedentary (×1.2)
  - Lightly active (×1.375)
  - Moderately active (×1.55)
  - Very active (×1.725)
  - Extra active (×1.9)

- On selection, calculate and display **TDEE = BMR × activity factor**.

---

## UI/UX Requirements

- **Input Form (BMR)**:

  - Gender: radio buttons (default: male).
  - Age: number input.
  - Height: number input (cm).
  - Weight: number input (kg).
  - CTA: “Calculate BMR”.

- **Result Display**:

  - Card UI showing BMR result.
  - Below result: CTA → “Calculate TDEE”.

- **Activity Level Selection (TDEE)**:

  - Dropdown or segmented button group.
  - On selection → display TDEE immediately.

- **Styling**:

  - Use shadcn/ui components (Card, Input, Button, Toggle, Select).
  - Responsive layout (mobile-first, desktop scaling).

---

## Non-Functional Requirements

- **Performance**: instant calculation (no API calls).
- **Accessibility**: follow WCAG 2.1 AA.
- **Localization-ready** (support future units/languages).
- **Code quality**: TypeScript strict mode enabled.
