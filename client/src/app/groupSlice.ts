import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { SuspenseProps } from 'react';

interface SubscriptionGroup {
  name: string;
}

interface GroupState {
  selected?: SubscriptionGroup;
  groups: SubscriptionGroup[];
}

const initialState: GroupState = {
  selected: undefined,
  groups: [{
    name: 'all'
  }, {
    name: 'music'
  }, {
    name: 'science'
  }],
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    selectGroup: (state: GroupState, action: PayloadAction<SubscriptionGroup>) => {
      state.selected = action.payload;
    },
  },
});

export const { selectGroup } = groupSlice.actions;

// Selectors
export const getSelected = (state: RootState) => state.group.selected;
export const getGroups = (state: RootState) => state.group.groups;

export default groupSlice.reducer;
