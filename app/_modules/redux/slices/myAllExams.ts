import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetMyExamsPayload } from '../../../customTypes';
import { MockExam } from '../../../types';

export interface MyAllExamsState {
  myExams: MockExam[];
  originalMyExams: MockExam[];
  myBookmarkedExams: MockExam[];
  originalMyBookmarkedExams: MockExam[];
}

const myAllExamsState: MyAllExamsState = {
  myExams: [],
  originalMyExams: [],
  myBookmarkedExams: [],
  originalMyBookmarkedExams: [],
};

const myAllExamsSlice = createSlice({
  name: 'myAllExams',
  initialState: myAllExamsState,
  reducers: {
    setMyExams: (state, action: PayloadAction<SetMyExamsPayload>) => {
      const { myExams, shouldUpdateOriginal = true } = action.payload;
      state.myExams = myExams;
      if (shouldUpdateOriginal) state.originalMyExams = myExams;
    },
    setMyBookmarkedExams: (state, action: PayloadAction<SetMyExamsPayload>) => {
      const { myExams, shouldUpdateOriginal = true } = action.payload;
      state.myBookmarkedExams = myExams;
      if (shouldUpdateOriginal) state.originalMyBookmarkedExams = myExams;
    },
  },
});

export const myAllExamsActions = myAllExamsSlice.actions;

export default myAllExamsSlice;
