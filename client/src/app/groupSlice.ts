import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import axios from 'axios';

export interface SubscriptionGroup {
  name: string;
  id: number;
}

export interface Video {
  id: string;
  pubDate: string; // Date
  title: string;
  link: string;
  author: string;
  thumbnailUrl: string;
}

interface GroupState {
  selected?: SubscriptionGroup;
  groups: SubscriptionGroup[];
  videos: Video[];
}

const initialState: GroupState = {
  selected: undefined,
  groups: [{
    name: 'all',
    id: 1,
  }, {
    name: 'music',
    id: 2,
  }, {
    name: 'science',
    id: 3,
  }],
  videos: [],
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    changeGroup: (state: GroupState, action: PayloadAction<SubscriptionGroup>) => {
      state.selected = action.payload;
    },
    addGroup: (state: GroupState, action: PayloadAction<SubscriptionGroup>) => {
      state.groups.push(action.payload);
    },
    setVideos: (state: GroupState, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    }
  },
});

export const { changeGroup, setVideos, addGroup } = groupSlice.actions;

// TODO: to remove
const mockVideos = (howMany: number = 10, groupName: any) => {
  const videos: Video[] = [];
  for(let i = 0; i < howMany ; i++) {
    videos.push({
      id: i.toString(),
      pubDate: new Date().toString(),
      title: `Video #${i} from group #${groupName}`,
      link: 'https://google.com',
      author: 'I am the author',
      thumbnailUrl: 'https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png',
    })
  }
  return videos;
}

export const fetchVideos = (groupId: number): AppThunk => async dispatch => {
  // const response = await axios.get(`/groups/${groupId}/videos`);
  const response = await new Promise<{ data: Video[]}>((resolve) => {
    resolve({
      data: mockVideos(55, groupId),
    })
  })
  dispatch(setVideos(response.data));
};

export const selectGroup = (group: SubscriptionGroup): AppThunk => dispatch => {
  dispatch(changeGroup(group));
  dispatch(fetchVideos(group.id));
};

export const createGroup = (name: string): AppThunk => dispatch => {
  // const response = await axios.post(`/groups`);
  const newGroup: SubscriptionGroup = {
    id: Math.floor(Math.random() * 100),
    name,
  }
  dispatch(addGroup(newGroup));
  dispatch(selectGroup(newGroup));
};

// Selectors
export const getSelected = (state: RootState) => state.group.selected;
export const getGroups = (state: RootState) => state.group.groups;
export const getVideos = (state: RootState) => state.group.videos;

export default groupSlice.reducer;
