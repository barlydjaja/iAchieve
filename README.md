# iAchieve

## Task 
1. Create an application to record achievements
2. Each achievement should have the properties listed below
3. App should minimally cover *User Stories* listed below
4. Add environmental meta data to achievements - with GovData

Achievement
+ Date achieved
+ Title
+ Description
+ Time of achievement
+ Temperature and Humidity info

User Stories
1. As an achiever, I want to record my achievements so that I can review them later.
2. As an achiever, I want to edit or delete past achievements that I enter wrongly.
3. As an achiever, I want to sort and filter my achievements based on date and tags.
4. As an achiever, I want to search for a specific achievement.
5. As an achiever, I want to view my achievements with temperature and humidity to provide more context so that I can be reminded of the day.

### Checkout the Demo [here](https://master.d18ihb3cgjh6u6.amplifyapp.com)

## Philosophy of the logo
![hello](./public/iAchieve.png)

**The logo represents a man struggling to lift the weight, after some struggle, in the end he was able to lift it.**

*Just as the figure ultimately raises the barbell, iAchieve encourages us to celebrate every accomplishment—no matter how tough the journey—because every achievement, big or small, is worth recognizing.*

## 🚀 Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4, Shadcn UI components
- **State Management:** Redux Toolkit, redux-persist
- **UI Components:** Shadcn (Radix UI), Lucide Icons
- **Utilities:** dayjs, axios

## 📁 Project Structure
- `src/components/ui/*` – Reusable UI components (Button, Badge, Card, etc.)
- `src/components/*` – Shared components
- `src/constant/*` – Constant values and enums
- `src/hooks/*` - Custom hooks for weather api integration
- `src/lib/*` – Shared logic and utility functions
- `src/redux/*` – Redux store, slices, and middleware, persist localStorage
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

## 🛠️ Future Improvements
* Filter by specific date
* Inifity scroll achievements
* Add map of the location longitude & latitude
* Multipe chips selection
* Add party popper on creating the first achievements
* Add a walkthrough guide on first time user join
* Use axios interceptors to add baseUrl, request, & response