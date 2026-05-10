import { create } from 'zustand';
import { SelectedJob } from '../types';

interface JobStoreState {
  selectedJob: SelectedJob | null;
  setSelectedJob: (job: SelectedJob | null) => void;
  clearSelectedJob: () => void;
}

export const useJobStore = create<JobStoreState>((set) => ({
  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
  clearSelectedJob: () => set({ selectedJob: null }),
}));
