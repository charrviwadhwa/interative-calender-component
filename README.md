## Interactive Wall Calendar Component

**Live Demo Link**: https://interative-calender-component.vercel.app/

**Video Demonstation** : https://www.loom.com/share/1ec8823e15654c409bc5c743f897b870

### Project Overview
This project is a high-fidelity, interactive React component designed to emulate the aesthetic and functionality of a physical wall calendar. It was built using Vite, React, Tailwind CSS, and Framer Motion. The component balances a creative design anchor with robust utility, featuring month-based date range selection and persistent, date-specific note-taking.

### Core Features
* **Physical Calendar Aesthetic:** Includes a 3D-styled spiral binding, a hero image section with geometric SVG overlays, and a lined-paper memo area.
* **Native Date Logic:** Implemented entirely using the native JavaScript Date object and Intl.DateTimeFormat API, ensuring zero reliance on external date libraries like date-fns or moment.
* **Interactive Range Selector:** Users can select a start and end date. The UI dynamically highlights the selected range with theme-specific accents.
* **Date-Specific Memos:** A persistent notes section that saves content to LocalStorage. Notes are uniquely keyed to specific date ranges, allowing users to keep different memos for different periods.
* **Dynamic Theming:** Features a theme-switching engine that extraction-extracts accent colors and adjusts the entire UI (backgrounds, text colors, and hero images) accordingly.
* **Indian National Holidays:** Integrated markers for major Indian holidays (e.g., Republic Day, Independence Day) with hover-activated tooltips.
* **Responsive Architecture:** A mobile-first layout that collapses into a vertical stack on smaller screens while maintaining a fixed-height container to prevent layout shifting during transitions.

### Technical Stack
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS (Utility-first CSS)
* **Animations:** Framer Motion (Month transitions and entry effects)
* **Icons:** Lucide React
* **State Management:** React Hooks (useState, useEffect)
* **Persistence:** Browser LocalStorage API

### Installation and Setup
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone [repository-link]
   ```

2. Navigate to the project directory:
   ```bash
   cd [project-folder-name]
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Implementation Details
* **Grid Consistency:** The calendar grid is hard-coded to render 42 days (6 rows). This ensures that the component height remains identical regardless of the month length or starting day, providing a stable user experience.
* **Accessibility:** Buttons and interactive elements include hover states and focus rings. Muted colors are used for days belonging to the previous or next month to provide clear visual hierarchy.
* **Performance:** By using native Date math instead of heavy libraries, the component maintains a smaller bundle size and faster execution time.
