# Context

## Current Focus

The current focus is to implement the core BMR calculation logic. This involves updating the main page to automatically calculate and display the BMR as soon as the user provides valid input for age, height, and weight, removing the need for a "Calculate BMR" button.

## Recent Changes

- The memory bank has been initialized with the following files:
  - `product.md`: Defines the product vision and features.
  - `architecture.md`: Outlines the application's structure.
  - `tech.md`: Lists the technologies and tools used.
  - `context.md`: This file, tracking the project's state.
- Implemented persistence of user inputs (age, height, weight, gender) to `localStorage` in `app/page.tsx`.
- Updated `app/layout.tsx` to use `public/preview.png` for Open Graph and Twitter image generation.

## Next Steps

The next step is to modify `app/page.tsx` to implement the real-time BMR calculation. This will involve:

- Using React hooks to track form input state.
- Triggering the calculation whenever the input values change.
- Validating the inputs to ensure they are complete and valid before calculating.
- Displaying the BMR result dynamically.
