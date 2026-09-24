# FitLog — Workout Library & Training Tracker

> **Train with intent. Log every set.**  
> FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.



##  Overview

**FitLog** is an athlete-focused workout library and training companion designed with an electric dark gym aesthetic. It integrates with the Fitlog REST API to provide instant access to curated compound and isolation exercises, live session metrics, and a daily 5-lift workout planner.

**API Endpoint (All Data):** `https://api.abcz.workers.dev/api/fitlog`
**API Endpoint (Single Lift):** `https://api.abcz.workers.dev/api/fitlog/:id`



## Key Features

1. **The Library & Responsive Grid**
   12 foundational lifts covering every major muscle group (Chest, Back, Legs, Arms, Core, Shoulders).
   Responsive 3x4 grid on large viewports collapsing smoothly to tablet and mobile screens.
   Each card displays high-resolution exercise imagery, category tags, equipment requirements, duration, calorie burn, and community ratings.

2. **Top Navigation with Dynamic Counters**
   Left brand lockup with custom icon and typography.
   Centered primary navigation between **Workout** and **My Plan** with highlighted active state.
   Right-side status badges:
   **Plan badge:** Filled `#ccff00` accent pill displaying real-time count of lifts in today's plan.
   **Saved badge:** Outlined pill displaying total bookmarked exercises.
   Both badges navigate directly to the training log.

3. **Two-Column Workout Details View**
   High-fidelity visual presentation on the left with image fallbacks.
   Right column details including comprehensive specifications table:
   **Equipment**, **Difficulty**, **Sets**, **Reps**, **Duration**, **Calories**, and **Rating**.
   Step-by-step ordered execution instructions.
   Action triggers for *"Add to today's plan"* and *"Save for later"* with instant feedback toasts.

4. **Interactive Daily Training Log (My Plan)**
   Enforces a strict **5-lift daily cap** to encourage focused, high-intensity training sessions.
   Real-time **Metrics Summary Cards**:
   **Exercises:** Total active exercises in session queue with visual capacity bar.
   **Estimated Time:** Aggregated workout minutes.
   **Target Burn:** Calculated total calorie expenditure.
   Dual-tab interface switching between **Today's Plan** and **Saved** lifts.

5. **Workout Completion & Management Workflow**
   **Mark as Done:** Toggle completed status on exercises with visual confirmation badges and checkmarks.
   **Remove (Trash):** Instantly remove lifts from the plan or saved list with toast confirmations.
   **Direct Transfer:** Promote saved lifts into today's active plan with a single click.

6. **Multi-Criteria Sorting & Live Search**
   Sort dropdown supporting **Duration**, **Calories Burned**, and **Rating**.
   Direction toggle for High-to-Low or Low-to-High ordering.
   Real-time search by workout name, equipment, or muscle group, plus quick filter pills.

7. **Resilient LocalStorage Persistence**
   Automatically synchronizes both Today's Plan and Saved exercises to browser `localStorage`.
   Preserves user selections, progress, and completion states across page reloads and browser sessions.

8. **404 Handling & Seamless SPA Deep Linking**
   Dedicated 404 Lost Set page for unrecognized routes with instant recovery actions.
   HTML5 History API routing supporting direct URLs (`/`, `/my-plan`, `/workout/:id`) and browser back/forward buttons.



## Technologies Used

| Technology          | Purpose                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------- |
| **React 19**        | Used to build reusable components and manage application state with Hooks and Context API |
| **TypeScript**      | Provides type safety for workout data, metrics, and training plans                        |
| **Vite 8**          | Provides a fast development environment and optimized project build process               |
| **Tailwind CSS v4** | Used for responsive styling, dark gym-themed UI, volt accents, and custom typography      |
| **Lucide React**    | Provides clean and lightweight icons throughout the application                           |
| **Fetch API**       | Used to retrieve data from remote APIs and handle loading, errors, and fallback states    |



##  Getting Started

### Prerequisites
Node.js (v18 or higher recommended)
npm or bun

### Installation
```bash
# Clone or navigate to the repository
git clone <repo-url>
cd fitlog

# Install project dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:3000` to interact with FitLog.

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

##  License & Copyright

© 2026 FitLog — Workout Library. Train hard, log honest.
