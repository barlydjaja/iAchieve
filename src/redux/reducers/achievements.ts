import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: number;
  tags?: string[];
}

interface AchievementsState {
  achievements: Achievement[];
  searchQuery: string;
  sortOrder: 'newest' | 'oldest';
  selectedTag: string | null;
  allTags: string[];
}

const initialState: AchievementsState = {
  achievements: [],
  searchQuery: '',
  sortOrder: 'newest',
  selectedTag: null,
  allTags: [],
};

export const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    addAchievement: (state, action) => {
      state.achievements.push(action.payload);
    },
    deleteAchievement: (state, action) => {
      state.achievements = state.achievements.filter((achievement) => achievement.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
    setAllTags: (state, action) => {
      state.allTags = action.payload;
    },
  },
});

export const selectAchievements = (state: RootState) => state.achievements.achievements;
export const selectSearchQuery = (state: RootState) => state.achievements.searchQuery;
export const selectSortOrder = (state: RootState) => state.achievements.sortOrder;
export const selectSelectedTag = (state: RootState) => state.achievements.selectedTag;
export const selectAllTags = (state: RootState) => state.achievements.allTags;

export const { addAchievement, deleteAchievement, setSearchQuery, setSortOrder, setSelectedTag, setAllTags } = achievementsSlice.actions;

export default achievementsSlice.reducer;
