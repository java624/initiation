// Common shared types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at?: string;
}

export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};
