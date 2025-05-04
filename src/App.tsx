import React, { useRef, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import StartPage from './components/layouts/Startpage';
import ExamplePage from './components/layouts/ExamplePage';
import AnimationWrapper from './components/wrappers/AnimationWrapper';

const getPathDepth = (pathname: string): number => {
  return pathname.split('/').filter(Boolean).length;
};

const AppLayout: React.FC = () => {
  return (
      <div className="h-[100svh] w-screen flex flex-col overflow-x-hidden">
          <main className="flex w-full flex-col flex-grow mx-0 relative">
              <Outlet />
          </main>
      </div>
  );
};

const NotFoundPage: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-xl text-gray-700">
        404 - Siden finnes ikke
    </div>
);

function App() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  let prevDepth = getPathDepth(prevPathRef.current);
  let currentDepth = getPathDepth(location.pathname);

  let direction = 1; 
  if (currentDepth == prevDepth) {
    prevDepth = 1;
  }

  if (currentDepth < prevDepth) {
      direction = -1;
  }

  useEffect(() => {
      if (currentDepth !== prevDepth) {
            prevPathRef.current = location.pathname;
      }
  }, [location.pathname]); 

  return (
      <AnimatePresence
          initial={false}
          mode="wait"
      >
          <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AppLayout />}>
                  <Route
                      index
                      element={
                          <AnimationWrapper direction={direction}>
                              <StartPage />
                          </AnimationWrapper>
                      }
                  />
                  <Route
                      path="example"
                      element={
                          <AnimationWrapper direction={direction}>
                              <ExamplePage />
                          </AnimationWrapper>
                      }
                  />
                  <Route
                      path="*"
                      element={
                        <NotFoundPage />
                      }
                  />
              </Route>
          </Routes>
      </AnimatePresence>
  );
}

export default App;
