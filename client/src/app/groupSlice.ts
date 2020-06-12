import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import axios from 'axios';

interface SubscriptionGroup {
  name: string;
  id: number;
}

export interface Video {
  id: string;
  pubDate: Date;
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
    setVideos: (state: GroupState, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    }
  },
});

export const { changeGroup, setVideos } = groupSlice.actions;

// TODO: to remove
const mockVideos = (howMany: number = 10, groupName: any) => {
  const videos: Video[] = [];
  for(let i = 0; i < howMany ; i++) {
    videos.push({
      id: i.toString(),
      pubDate: new Date(),
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
      data: mockVideos(15, groupId),
    })
  })
  dispatch(setVideos(response.data));
};

export const selectGroup = (group: SubscriptionGroup): AppThunk => dispatch => {
  dispatch(changeGroup(group));
  dispatch(fetchVideos(group.id));
};

// Selectors
export const getSelected = (state: RootState) => state.group.selected;
export const getGroups = (state: RootState) => state.group.groups;
export const getVideos = (state: RootState) => state.group.videos;

export default groupSlice.reducer;
