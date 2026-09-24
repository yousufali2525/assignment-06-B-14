import React, {createContext,useContext,useEffect,useState,useMemo,useCallback,} 
from 'react';
import type { Workout,PlanItem,SavedItem } from '../types/workout';
const API_URL = 'https://api.abcz.workers.dev/api/fitlog';
export const UNIFIED_WORKOUT_IMAGE = '';
export interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}
interface WorkoutContextType {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  plan: PlanItem[];
  saved: SavedItem[];
  activeToast: ToastInfo | null;
  showToast: (
    message: string,
    type?: 'success' | 'warning' | 'info'
  ) => void;
  hideToast: () => void;
  addToPlan: (
    workout: Workout
  ) => { success: boolean; message: string };
  removeFromPlan: (id: number) => void;
  togglePlanDone: (id: number) => void;
  addToSaved: (
    workout: Workout
  ) => { success: boolean; message: string };
  removeFromSaved: (id: number) => void;
  isPlanned: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  getWorkoutById: (
    id: number
  ) => Promise<Workout | null>;
  planMetrics: {
    exercises: number;
    minutes: number;
    calories: number;
  };
}
const WorkoutContext =createContext<WorkoutContextType | undefined>(undefined);
const PLAN_STORAGE_KEY = 'fitlog_today_plan';
const SAVED_STORAGE_KEY = 'fitlog_saved_workouts';
const MAX_PLAN_LIFTS = 5;
export const WorkoutProvider: React.FC<{children: React.ReactNode;}> = ({ children }) => {
const [workouts, setWorkouts] = useState<Workout[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [plan, setPlan] = useState<PlanItem[]>(() => {
  try {
      const stored = localStorage.getItem(PLAN_STORAGE_KEY);
      if (!stored) {
        return [];
      }
      const parsed: PlanItem[] = JSON.parse(stored);
      return parsed.map((item) => ({...item,image: item.image || UNIFIED_WORKOUT_IMAGE,}));} 
catch {
      return [];
    }
  });
const [saved, setSaved] = useState<SavedItem[]>(() => {
  try {
const stored = localStorage.getItem(SAVED_STORAGE_KEY);
  if (!stored) {
      return [];
    }
const parsed: SavedItem[] = JSON.parse(stored);
      return parsed.map((item) => ({...item,image: item.image || UNIFIED_WORKOUT_IMAGE,}));} 
catch {
      return [];
    }
  });
const [activeToast, setActiveToast] =useState<ToastInfo | null>(null);
  useEffect(() => {
    try {localStorage.setItem(PLAN_STORAGE_KEY,JSON.stringify(plan));} 
catch {
    }
  }, [plan]);
  useEffect(() => {
    try {localStorage.setItem(SAVED_STORAGE_KEY,JSON.stringify(saved) );} 
catch {
    }
  }, [saved]);
const showToast = useCallback((message: string,type: 'success' | 'warning' | 'info' = 'success') => {setActiveToast({id: Date.now().toString(),message,type,});
},
    []
  );
const hideToast = useCallback(() => {setActiveToast(null);
  }, []);
  useEffect(() => {
    if (!activeToast) {
      return;
    }
const timer = setTimeout(() => {
    setActiveToast(null);
    }, 3500);
   return () => {
      clearTimeout(timer);
    };
  }, [activeToast]);
  useEffect(() => {
let isMounted = true;
const loadWorkouts = async () => {
     setLoading(true);
     setError(null);
   try {
const response = await fetch(API_URL);
    if (!response.ok) {
          throw new Error(`Failed to fetch workouts: HTTP ${response.status}`);
        }
const data: Workout[] = await response.json();
    if (!isMounted) {
      return;
        }
const formattedWorkouts = data.map((item) => ({...item,image: item.image || UNIFIED_WORKOUT_IMAGE,}));
      setWorkouts(formattedWorkouts);
      } catch (err: unknown) {
        if (!isMounted) {
          return;
        }
const message =err instanceof Error? err.message: 'Failed to fetch workouts';
        setError(message);
      } finally {
        if (isMounted) {setLoading(false);
        }
      }
    };
    loadWorkouts();
    return () => {isMounted = false;
    };
  }, []);
const isPlanned = useCallback((id: number) => {
      return plan.some((item) => item.id === id);
    },
    [plan]
  );
const isSaved = useCallback((id: number) => {
      return saved.some((item) => item.id === id);
    },
    [saved]
  );
const addToPlan = useCallback((workout: Workout) => {if (plan.length >= MAX_PLAN_LIFTS) 
    {
const message =`Plan capped at ${MAX_PLAN_LIFTS} lifts for today. Complete some first!`;
      showToast(message, 'warning');
        return {success: false,message,};
      }
    if (plan.some((item) => item.id === workout.id)) {const message =`"${workout.name}" is already in today's plan.`;
        showToast(message, 'info');
        return {success: false,message,};
      }
const newItem: PlanItem = {...workout,completed: false,addedAt: Date.now(),image: workout.image || UNIFIED_WORKOUT_IMAGE,};
      setPlan((prev) => [...prev, newItem]);
const message =`Added "${workout.name}" to today's plan`;
      showToast(message, 'success');
      return {success: true,message,};
    },
    [plan, showToast]
  );
const removeFromPlan = useCallback((id: number) => {const item = plan.find((workout) => workout.id === id);
      setPlan((prev) =>prev.filter((workout) => workout.id !== id));
      if (item) {showToast(`Removed "${item.name}" from today's plan`,'info');
    }
    },
    [plan, showToast]
  );
const togglePlanDone = useCallback((id: number) => {setPlan((prev) =>prev.map((item) => {if (item.id !== id) {return item;}
const completed = !item.completed;
          showToast(completed? `Completed "${item.name}"! Great work.`: `Marked "${item.name}" as pending`,'success');
          return {...item,completed,};
        })
      );
    },
    [showToast]
  );
const addToSaved = useCallback((workout: Workout) => {if (saved.some((item) => item.id === workout.id)) {
const message =`"${workout.name}" is already in your saved lifts.`;
        showToast(message, 'info');
        return {success: false,message,};
      }
const newItem: SavedItem = {...workout,savedAt: Date.now(),image: workout.image || UNIFIED_WORKOUT_IMAGE,};
      setSaved((prev) => [newItem, ...prev]);
const message =`Saved "${workout.name}" for later`;
      showToast(message, 'success');
      return {success: true,message,};
    },
    [saved, showToast]
  );
const removeFromSaved = useCallback((id: number) => {const item = saved.find((workout) => workout.id === id);
    setSaved((prev) =>prev.filter((workout) => workout.id !== id));
      if (item) {
        showToast(`Removed "${item.name}" from saved lifts`,'info');
      }
    },
    [saved, showToast]
  );
const getWorkoutById = useCallback(async (id: number): Promise<Workout | null> => {const localWorkout = workouts.find((workout) => workout.id === id);
      if (localWorkout) {
        return {...localWorkout,image:localWorkout.image || UNIFIED_WORKOUT_IMAGE,};
      }
    try {
const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          return null;
        }
const data: Workout = await response.json();
        return {...data,image: data.image || UNIFIED_WORKOUT_IMAGE,};
      } catch {
        return null;
      }
    },
    [workouts]
  );
const planMetrics = useMemo(() => {const exercises = plan.length;
const minutes = plan.reduce((total, item) =>total + (item.duration || 0),0);
const calories = plan.reduce((total, item) =>total + (item.caloriesBurned || 0),0);
    return {exercises,minutes,calories,};
  }, 
  [plan]);
const value: WorkoutContextType = {workouts,loading,error,plan,saved,activeToast,showToast,hideToast,addToPlan,removeFromPlan,togglePlanDone,addToSaved,removeFromSaved,isPlanned,isSaved,getWorkoutById,planMetrics,};
  return (<WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>);
};
export const useWorkout = () => {const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};