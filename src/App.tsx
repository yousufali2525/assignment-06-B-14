/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useCallback } from 'react';
import { WorkoutProvider, useWorkout } from './context/WorkoutContext';
import { Navbar } from './assets/components/Navbar';
import { HeroSection } from './assets/components/HeroSection';
import { LibrarySection } from './assets/components/LibrarySection';
import { WorkoutDetailPage } from './assets/components/WorkoutDetailPage';
import { MyPlanPage } from './assets/components/MyPlanPage';
import { NotFoundPage } from './assets/components/NotFoundPage';
import { Footer } from './assets/components/Footer';
import { Toast } from './assets/components/Toast';
const AppContent: React.FC = () => {
  const { workouts, loading, error } = useWorkout();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchParams, setSearchParams] = useState<string>(() => {
    return window.location.search || '';
  });
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(window.location.search || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  const navigate = useCallback((pathWithQuery: string) => {
    const [path, query] = pathWithQuery.split('?');
    const newQuery = query ? `?${query}` : '';
    if (
      window.location.pathname !== path||window.location.search !== newQuery
    ) {
      window.history.pushState({}, '', pathWithQuery);
    }
    setCurrentPath(path);
    setSearchParams(newQuery);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const renderRoute = () => {
    if (currentPath === ''||currentPath === '/') {
      return (
        <main>
          <HeroSection />
          <LibrarySection
            workouts={workouts}
            loading={loading}
            error={error}
            onSelectWorkout={(id) => navigate(`/workout/${id}`)}/>
        </main>
      );
    }
    if (currentPath.startsWith('/workout/')) {
      const idStr = currentPath.replace('/workout/', '');
      const workoutId = parseInt(idStr, 10);
      if (isNaN(workoutId)) {
        return (
          <NotFoundPage
            onNavigateHome={() => navigate('/')}/>
        );
      }
      return (
        <main>
          <WorkoutDetailPage
            workoutId={workoutId}
            onBack={() => navigate('/')}
            onNavigateToPlan={() => navigate('/my-plan')}/>
        </main>
      );
    }
    if (currentPath === '/my-plan') {
      const urlParams = new URLSearchParams(searchParams);
      const tabParam =urlParams.get('tab') === 'saved'? 'saved': 'plan';
      return (
        <main>
          <MyPlanPage
            initialTab={tabParam}
            onNavigateHome={() => navigate('/')}
            onSelectWorkout={(id) => navigate(`/workout/${id}`)}/>
        </main>
      );
    }
    return (
      <main>
        <NotFoundPage
          onNavigateHome={() => navigate('/')}/>
      </main>
    );
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d0e] text-[#f2f4f5]">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}/>
      <div className="flex-1">
        {renderRoute()}
      </div>
      <Footer/>
      <Toast/>
    </div>
  );
};
export default function App() {
  return (
    <WorkoutProvider>
      <AppContent />
    </WorkoutProvider>
  );
}