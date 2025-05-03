import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import StartPage from './components/layouts/Startpage';
import PoseContent from './components/layouts/PoseInnhold'; // Using PoseContent based on previous context
import ItemPreview from './components/layouts/ItemPreview'; // Component for the preview page
import SelectDashboard from './components/layouts/SelectDashboard';
import CodePage from './components/layouts/CodePage'; // Import the new CodePage component
import AnimatedPage from './components/wrappers/AnimatedPage'; // Animation wrapper
import ViewPoseInnhold from './components/layouts/ViewPoseInnhold';
import ViewItemPreview from './components/layouts/ViewItemPreview'

const AppLayout: React.FC = () => {
  return (
    <div className="h-[100svh] w-screen flex flex-col text-[#FDFDFD] overflow-x-hidden bg-white"> {/* Added bg-white for default background */}
      <main className="flex w-full flex-col flex-grow mx-0 relative">
        <Outlet />
      </main>
    </div>
  );
};

const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-xl text-gray-700"> {/* Adjusted text color */}
    404 - Siden finnes ikke
  </div>
);

function App() {
  const location = useLocation();

  return (
    <AnimatePresence
        initial={false}
        mode="wait"
        // Removed custom prop as AnimatedPage might handle direction internally
        // custom={navigationType === 'PUSH' ? 1 : -1}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <AnimatedPage>
                <StartPage />
              </AnimatedPage>
            }
          />
          {/* Optional: Route for viewing a pose by ID (if implemented later) */}
          <Route
            path="pose"
            element={
              <AnimatedPage>
                <PoseContent /> // Or a different component for viewing saved poses
              </AnimatedPage>
            }
          />
          <Route
            path="pose/:poseCode"
            element={
              <AnimatedPage>
                <ViewPoseInnhold/>
              </AnimatedPage>
            }
          />
          <Route
            path="pose/:poseCode/:candyId"
            element={
              <AnimatedPage>
                <ViewItemPreview/>
              </AnimatedPage>
            }
          />
          <Route
            path="selection"
            element={
              <AnimatedPage>
                <SelectDashboard />
              </AnimatedPage>
            }
          />
          {/* Updated route for the CodePage */}
          <Route
            path="code/:generatedCode" // Expects a code parameter in the URL
            element={
              <AnimatedPage>
                <CodePage /> {/* Use the CodePage component */}
              </AnimatedPage>
            }
          />
          <Route
            path="preview/:itemId" // Dynamic route for item preview
            element={
              <AnimatedPage>
                <ItemPreview />
              </AnimatedPage>
            }
          />
          <Route
            path="*"
            element={
              <AnimatedPage>
                <NotFoundPage />
              </AnimatedPage>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
