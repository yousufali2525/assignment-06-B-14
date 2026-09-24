export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'Beginner'|'Intermediate'|'Advanced'|string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}
export interface PlanItem extends Workout {
  completed?: boolean;
  addedAt: number;
}
export interface SavedItem extends Workout {
  savedAt: number;
}
export type SortOption = 'duration' | 'calories' | 'rating';
export type SortField = SortOption;
