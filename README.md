# iAchieve

iAchieve is a an achievement tracker app. Connected to SG Weather API so that you can be reminded of the day of your achievements

## Philosophy of the logo
![hello](./public/iAchieve.png)

**The logo represents a man struggling to lifts weight, but in the end, he was able to lift it.**

*Just as the figure ultimately raises the barbell, iAchieve encourages us to celebrate every accomplishment—no matter how tough the journey—because every achievement, big or small, is worth recognizing.*

## 🚀 Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4, Shadcn UI components
- **Routing:** react-router
- **State Management:** Redux Toolkit, redux-persist
- **UI Components:** Shadcn (Radix UI), Lucide Icons
- **Utilities:** dayjs, axios

## 📁 Project Structure
- `src/assets/*` – Images and static assets
- `src/components/ui/*` – Reusable UI components (Button, Badge, Card, etc.)
- `src/components/*` – Shared components
- `src/constant/*` – Constant values and enums
- `src/libs/*` – Shared logic and utility functions
- `src/page/*` – Main page components and routing
- `src/page/components/*` – Page-specific components
- `src/redux/*` – Redux store, slices, and middleware
- `src/types/*` – Shared types or interfaces accross the app

## 🖥️ Features
- **Realtime Data Fetch:** Data Fetch to sg weather api
- **Responsive Design:** Optimized for all device sizes.
- **Dark & Light Mode:** Supports both themes (toggle by changing the HTML class).
- **State Persistence:** Redux state is persisted across sessions.
- **Modern UI:** Built with Shadcn and Radix UI for accessible, customizable components.

## 🛠️ Getting Started
1. **Install dependencies:**
   ```bash
   yarn
   ```
2. **Run the development server:**
   ```bash
   yarn dev
   ```
3. **Build for production:**
   ```bash
   yarn build
   ```

## 🌐 Environment Variables
Set the following in your `.env` file for social/contact links and any API keys:
