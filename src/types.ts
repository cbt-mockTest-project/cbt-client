export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ChangePasswordAfterVerifyingInput = {
  code: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePasswordAfterVerifyingOutput = {
  __typename?: 'ChangePasswordAfterVerifyingOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CheckPasswordInput = {
  password: Scalars['String'];
};

export type CheckPasswordOutput = {
  __typename?: 'CheckPasswordOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CoreOutput = {
  __typename?: 'CoreOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateFeedbackInput = {
  content: Scalars['String'];
};

export type CreateFeedbackOutput = {
  __typename?: 'CreateFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamCategoryInput = {
  name: Scalars['String'];
};

export type CreateMockExamCategoryOutput = {
  __typename?: 'CreateMockExamCategoryOutput';
  category?: Maybe<MockExamCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamHistoryInput = {
  examId: Scalars['Float'];
};

export type CreateMockExamHistoryOutput = {
  __typename?: 'CreateMockExamHistoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamInput = {
  categoryName: Scalars['String'];
  title: Scalars['String'];
};

export type CreateMockExamOutput = {
  __typename?: 'CreateMockExamOutput';
  error?: Maybe<Scalars['String']>;
  mockExam?: Maybe<MockExam>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamQuestionCommentInput = {
  content: Scalars['String'];
  questionId: Scalars['Float'];
};

export type CreateMockExamQuestionCommentOutput = {
  __typename?: 'CreateMockExamQuestionCommentOutput';
  comment: MockExamQuestionComment;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamQuestionFeedbackInput = {
  content: Scalars['String'];
  questionId: Scalars['Float'];
  type?: InputMaybe<QuestionFeedbackType>;
};

export type CreateMockExamQuestionFeedbackOutput = {
  __typename?: 'CreateMockExamQuestionFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  feedback?: Maybe<MockExamQuestionFeedback>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamQuestionInput = {
  mockExamId: Scalars['Float'];
  number: Scalars['Float'];
  question: Scalars['String'];
  question_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  solution?: InputMaybe<Scalars['String']>;
  solution_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
};

export type CreateMockExamQuestionMultipleChoiceInput = {
  answer: Scalars['Float'];
  options: Array<MockExamQuestionMultipleChoiceOption>;
  questionId: Scalars['Float'];
};

export type CreateMockExamQuestionMultipleChoiceOutput = {
  __typename?: 'CreateMockExamQuestionMultipleChoiceOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamQuestionOutput = {
  __typename?: 'CreateMockExamQuestionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questionId?: Maybe<Scalars['Float']>;
};

export type CreateNoticeInput = {
  content: Scalars['String'];
  link?: InputMaybe<Scalars['String']>;
  reservationTime?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['Float'];
};

export type CreateNoticeOutput = {
  __typename?: 'CreateNoticeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrUpdateMockExamQuestionStateInput = {
  questionId: Scalars['Float'];
  state: QuestionState;
};

export type CreateOrUpdateMockExamQuestionStateOutput = {
  __typename?: 'CreateOrUpdateMockExamQuestionStateOutput';
  currentState?: Maybe<QuestionState>;
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePostCommentInput = {
  content: Scalars['String'];
  postId: Scalars['Float'];
};

export type CreatePostCommentOutput = {
  __typename?: 'CreatePostCommentOutput';
  comment: PostComment;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePostInput = {
  category?: InputMaybe<PostCategory>;
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CreatePostOutput = {
  __typename?: 'CreatePostOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateQuestionCardCategoryInput = {
  name: Scalars['String'];
};

export type CreateQuestionCardCategoryOutput = {
  __typename?: 'CreateQuestionCardCategoryOutput';
  category?: Maybe<QuestionCardCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateQuestionCardInput = {
  categoryId: Scalars['Float'];
  question: Scalars['String'];
  solution: Scalars['String'];
};

export type CreateQuestionCardOutput = {
  __typename?: 'CreateQuestionCardOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questionCard?: Maybe<QuestionCard>;
};

export type CreateVisitHistoryOutput = {
  __typename?: 'CreateVisitHistoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  todayViewCount?: Maybe<Scalars['Float']>;
  totalViewCount?: Maybe<Scalars['Float']>;
};

export type DeleteMockExamCategoryInput = {
  id: Scalars['Float'];
};

export type DeleteMockExamCategoryOutput = {
  __typename?: 'DeleteMockExamCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteMockExamInput = {
  id: Scalars['Float'];
};

export type DeleteMockExamOutput = {
  __typename?: 'DeleteMockExamOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteMockExamQuestionCommentInput = {
  id: Scalars['Float'];
};

export type DeleteMockExamQuestionCommentOutput = {
  __typename?: 'DeleteMockExamQuestionCommentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteMockExamQuestionFeedbackInput = {
  id: Scalars['Float'];
};

export type DeleteMockExamQuestionFeedbackOutput = {
  __typename?: 'DeleteMockExamQuestionFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteMockExamQuestionInput = {
  id: Scalars['Float'];
};

export type DeleteMockExamQuestionOutput = {
  __typename?: 'DeleteMockExamQuestionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteNoticeInput = {
  noticeId: Scalars['Float'];
};

export type DeleteNoticeOutput = {
  __typename?: 'DeleteNoticeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeletePostCommentInput = {
  id: Scalars['Float'];
};

export type DeletePostCommentOutput = {
  __typename?: 'DeletePostCommentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeletePostInput = {
  id: Scalars['Float'];
};

export type DeletePostOutput = {
  __typename?: 'DeletePostOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteQuestionCardCategoryInput = {
  id: Scalars['Float'];
};

export type DeleteQuestionCardCategoryOutput = {
  __typename?: 'DeleteQuestionCardCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteQuestionCardsInput = {
  ids: Array<Scalars['Float']>;
};

export type DeleteQuestionCardsOutput = {
  __typename?: 'DeleteQuestionCardsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMockExamCategoryInput = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type EditMockExamInput = {
  id: Scalars['Float'];
  status?: InputMaybe<ExamStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditMockExamOutput = {
  __typename?: 'EditMockExamOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMockExamQuestionBookmarkInput = {
  questionId: Scalars['Float'];
};

export type EditMockExamQuestionBookmarkOutput = {
  __typename?: 'EditMockExamQuestionBookmarkOutput';
  currentState: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMockExamQuestionCommentInput = {
  content: Scalars['String'];
  id: Scalars['Float'];
};

export type EditMockExamQuestionCommentLikeInput = {
  commentId: Scalars['Float'];
};

export type EditMockExamQuestionCommentLikeOutput = {
  __typename?: 'EditMockExamQuestionCommentLikeOutput';
  currentState: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMockExamQuestionCommentOutput = {
  __typename?: 'EditMockExamQuestionCommentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMockExamQuestionFeedbackInput = {
  content: Scalars['String'];
  id: Scalars['Float'];
};

export type EditMockExamQuestionFeedbackOutput = {
  __typename?: 'EditMockExamQuestionFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMockExamQuestionInput = {
  id: Scalars['Float'];
  question?: InputMaybe<Scalars['String']>;
  question_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  solution?: InputMaybe<Scalars['String']>;
  solution_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
};

export type EditMockExamQuestionOutput = {
  __typename?: 'EditMockExamQuestionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditNoticeInput = {
  confirm?: InputMaybe<Scalars['Boolean']>;
  content?: InputMaybe<Scalars['String']>;
  noticeId: Scalars['Float'];
  reservationTime?: InputMaybe<Scalars['DateTime']>;
};

export type EditNoticeOutput = {
  __typename?: 'EditNoticeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPostCommentInput = {
  content: Scalars['String'];
  id: Scalars['Float'];
};

export type EditPostCommentLikeInput = {
  commentId: Scalars['Float'];
};

export type EditPostCommentLikeOutput = {
  __typename?: 'EditPostCommentLikeOutput';
  currentState: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPostCommentOutput = {
  __typename?: 'EditPostCommentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPostInput = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};

export type EditPostLikeInput = {
  postId: Scalars['Float'];
};

export type EditPostLikeOutput = {
  __typename?: 'EditPostLikeOutput';
  currentState: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPostOutput = {
  __typename?: 'EditPostOutput';
  content?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
};

export type EditProfileInput = {
  nickname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type EditProfileOutput = {
  __typename?: 'EditProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EmailVerificationInput = {
  code: Scalars['String'];
};

export type EmailVerificationOutput = {
  __typename?: 'EmailVerificationOutput';
  email: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ExamCoAuthor = {
  __typename?: 'ExamCoAuthor';
  created_at: Scalars['DateTime'];
  exam: MockExam;
  examCategory: MockExamCategory;
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export enum ExamStatus {
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Request = 'REQUEST',
  Unset = 'UNSET'
}

export type ExamTitleAndId = {
  __typename?: 'ExamTitleAndId';
  id: Scalars['Float'];
  role: UserRole;
  slug?: Maybe<Scalars['String']>;
  status: ExamStatus;
  title: Scalars['String'];
};

export type ExamTitleAndIdByQuestionComment = {
  __typename?: 'ExamTitleAndIdByQuestionComment';
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type Feedback = {
  __typename?: 'Feedback';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type FindMyExamHistoryInput = {
  categoryIds: Array<Scalars['Float']>;
};

export type FindMyExamHistoryOutput = {
  __typename?: 'FindMyExamHistoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  titleAndId?: Maybe<Array<TitleAndId>>;
};

export type GetExamTitleWithFeedbackOutput = {
  __typename?: 'GetExamTitleWithFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  titles: Array<GetExamTitleWithFeedbackTitle>;
};

export type GetExamTitleWithFeedbackTitle = {
  __typename?: 'GetExamTitleWithFeedbackTitle';
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type GetFeedbacksByRecommendationCountInput = {
  count: Scalars['Float'];
};

export type GetFeedbacksByRecommendationCountOutput = {
  __typename?: 'GetFeedbacksByRecommendationCountOutput';
  error?: Maybe<Scalars['String']>;
  feedbacks?: Maybe<Array<MockExamQuestionFeedback>>;
  ok: Scalars['Boolean'];
};

export type GetFeedbacksWithFilterInput = {
  badCount: Scalars['Float'];
  examId: Scalars['Float'];
  goodCount: Scalars['Float'];
  types: Array<QuestionFeedbackType>;
};

export type GetFeedbacksWithFilterOutput = {
  __typename?: 'GetFeedbacksWithFilterOutput';
  error?: Maybe<Scalars['String']>;
  feedbacks: Array<MockExamQuestionFeedback>;
  ok: Scalars['Boolean'];
};

export type KakaoLoginInput = {
  code: Scalars['String'];
};

export type KakaoLoginOutput = {
  __typename?: 'KakaoLoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export enum LoginType {
  Email = 'EMAIL',
  Google = 'GOOGLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER'
}

export type MeOutput = {
  __typename?: 'MeOutput';
  error?: Maybe<Scalars['String']>;
  notices?: Maybe<Array<Notice>>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type MockExam = {
  __typename?: 'MockExam';
  approved: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  examCoAuthor?: Maybe<Array<ExamCoAuthor>>;
  history: Array<MockExamHistory>;
  id: Scalars['Float'];
  mockExamCategory: MockExamCategory;
  mockExamQuestion: Array<MockExamQuestion>;
  mockExamQuestionState: Array<MockExamQuestion>;
  slug?: Maybe<Scalars['String']>;
  status: ExamStatus;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamCategory = {
  __typename?: 'MockExamCategory';
  approved: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  examCoAuthor?: Maybe<Array<ExamCoAuthor>>;
  id: Scalars['Float'];
  mockExam: Array<MockExam>;
  name: Scalars['String'];
  type: MockExamCategoryTypes;
  updated_at: Scalars['DateTime'];
  user: User;
};

export enum MockExamCategoryTypes {
  Practical = 'practical',
  Written = 'written'
}

export type MockExamHistory = {
  __typename?: 'MockExamHistory';
  created_at: Scalars['DateTime'];
  exam: MockExam;
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamImageType = {
  __typename?: 'MockExamImageType';
  name: Scalars['String'];
  uid: Scalars['String'];
  url: Scalars['String'];
};

export type MockExamMultipleChoiceOption = {
  __typename?: 'MockExamMultipleChoiceOption';
  content: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  number: Scalars['Float'];
};

export type MockExamQuestion = {
  __typename?: 'MockExamQuestion';
  approved: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mockExam?: Maybe<MockExam>;
  mockExamQuestionBookmark: Array<MockExamQuestionBookmark>;
  mockExamQuestionComment: Array<MockExamQuestionComment>;
  mockExamQuestionFeedback: Array<MockExamQuestionFeedback>;
  multipleChoice: Array<MockExamQuestionMultipleChoice>;
  number: Scalars['Float'];
  question: Scalars['String'];
  question_img?: Maybe<Array<MockExamImageType>>;
  solution?: Maybe<Scalars['String']>;
  solution_img?: Maybe<Array<MockExamImageType>>;
  state: Array<MockExamQuestionState>;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamQuestionBookmark = {
  __typename?: 'MockExamQuestionBookmark';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  question: MockExamQuestion;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamQuestionComment = {
  __typename?: 'MockExamQuestionComment';
  commentLike: Array<MockExamQuestionCommentLike>;
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  likeState: Scalars['Boolean'];
  likesCount: Scalars['Float'];
  question: MockExamQuestion;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamQuestionCommentLike = {
  __typename?: 'MockExamQuestionCommentLike';
  comment: MockExamQuestionComment;
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamQuestionFeedback = {
  __typename?: 'MockExamQuestionFeedback';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mockExamQuestion: MockExamQuestion;
  myRecommedationStatus: MyRecommedationStatus;
  recommendation: Array<MockExamQuestionFeedbackRecommendation>;
  recommendationCount: RecommendationCount;
  type: QuestionFeedbackType;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamQuestionFeedbackRecommendation = {
  __typename?: 'MockExamQuestionFeedbackRecommendation';
  created_at: Scalars['DateTime'];
  feedback: MockExamQuestionFeedback;
  id: Scalars['Float'];
  type: QuestionFeedbackRecommendationType;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamQuestionImageInputType = {
  name: Scalars['String'];
  uid: Scalars['String'];
  url: Scalars['String'];
};

export type MockExamQuestionMultipleChoice = {
  __typename?: 'MockExamQuestionMultipleChoice';
  answer: Scalars['Float'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  options: Array<MockExamMultipleChoiceOption>;
  question: MockExamQuestion;
  updated_at: Scalars['DateTime'];
};

export type MockExamQuestionMultipleChoiceOption = {
  content: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  number: Scalars['Float'];
};

export type MockExamQuestionState = {
  __typename?: 'MockExamQuestionState';
  answer: Scalars['String'];
  created_at: Scalars['DateTime'];
  exam: MockExam;
  id: Scalars['Float'];
  question: MockExamQuestion;
  state: QuestionState;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePasswordAfterVerifying: ChangePasswordAfterVerifyingOutput;
  checkPassword: CheckPasswordOutput;
  createFeedback: CreateFeedbackOutput;
  createMockExam: CreateMockExamOutput;
  createMockExamCategory: CreateMockExamCategoryOutput;
  createMockExamHistory: CreateMockExamHistoryOutput;
  createMockExamQuestion: CreateMockExamQuestionOutput;
  createMockExamQuestionComment: CreateMockExamQuestionCommentOutput;
  createMockExamQuestionFeedback: CreateMockExamQuestionFeedbackOutput;
  createMutipleChoice: CreateMockExamQuestionMultipleChoiceOutput;
  createNotice: CreateNoticeOutput;
  createOrUpdateMockExamQuestionState: CreateOrUpdateMockExamQuestionStateOutput;
  createPost: CreatePostOutput;
  createPostComment: CreatePostCommentOutput;
  createQuestionCard: CreateQuestionCardOutput;
  createQuestionCardCategory: CreateQuestionCardCategoryOutput;
  createVisit: CoreOutput;
  createVisitHistory: CreateVisitHistoryOutput;
  deleteAllNoticesOfMe: CoreOutput;
  deleteMockExam: DeleteMockExamOutput;
  deleteMockExamCategory: DeleteMockExamCategoryOutput;
  deleteMockExamQuestion: DeleteMockExamQuestionOutput;
  deleteMockExamQuestionComment: DeleteMockExamQuestionCommentOutput;
  deleteMockExamQuestionFeedback: DeleteMockExamQuestionFeedbackOutput;
  deleteNotice: DeleteNoticeOutput;
  deletePost: DeletePostOutput;
  deletePostComment: DeletePostCommentOutput;
  deleteQuestionCardCategory: DeleteQuestionCardCategoryOutput;
  deleteQuestionCards: DeleteQuestionCardsOutput;
  deleteUser: CoreOutput;
  editMockExam: EditMockExamOutput;
  editMockExamCategory: DeleteMockExamCategoryOutput;
  editMockExamQuestion: EditMockExamQuestionOutput;
  editMockExamQuestionBookmark: EditMockExamQuestionBookmarkOutput;
  editMockExamQuestionComment: EditMockExamQuestionCommentOutput;
  editMockExamQuestionCommentLike: EditMockExamQuestionCommentLikeOutput;
  editMockExamQuestionFeedback: EditMockExamQuestionFeedbackOutput;
  editNotice: EditNoticeOutput;
  editPost: EditPostOutput;
  editPostComment: EditPostCommentOutput;
  editPostCommentLike: EditPostCommentLikeOutput;
  editPostLike: EditPostLikeOutput;
  editProfile: EditProfileOutput;
  emailVerification: EmailVerificationOutput;
  kakaoLogin: KakaoLoginOutput;
  login: LoginOutput;
  logout: CoreOutput;
  naverBlogViewMacro: NaverBlogViewMacroOutput;
  register: RegisterOutput;
  resetMyExamQuestionState: ResetMyExamQuestionStateOutput;
  restoreUser: CoreOutput;
  revalidate: RevalidateOutput;
  sendFindPasswordMail: SendFindPasswordMailOutput;
  sendMessageToAlramChannelOfTelegram: SendMessageToAlramChannelOfTelegramOutput;
  sendVerificationMail: SendVerificationMailOutput;
  updateAdBlockPermission: UpdateAdblockPermissionOutput;
  updateApprovedStateOfMockExamQuestion: UpdateApprovedStateOfMockExamQuestionOutput;
  updateMockExamQuestionFeedbackRecommendation: UpdateMockExamQuestionFeedbackRecommendationOutput;
  updateQuestionCard: UpdateQuestionCardOutput;
  updateQuestionCardCategory: UpdateQuestionCardCategoryOutput;
  updateQuestionStatesToCore: CoreOutput;
  viewPost: ViewPostOutput;
};


export type MutationChangePasswordAfterVerifyingArgs = {
  input: ChangePasswordAfterVerifyingInput;
};


export type MutationCheckPasswordArgs = {
  input: CheckPasswordInput;
};


export type MutationCreateFeedbackArgs = {
  input: CreateFeedbackInput;
};


export type MutationCreateMockExamArgs = {
  input: CreateMockExamInput;
};


export type MutationCreateMockExamCategoryArgs = {
  input: CreateMockExamCategoryInput;
};


export type MutationCreateMockExamHistoryArgs = {
  input: CreateMockExamHistoryInput;
};


export type MutationCreateMockExamQuestionArgs = {
  input: CreateMockExamQuestionInput;
};


export type MutationCreateMockExamQuestionCommentArgs = {
  input: CreateMockExamQuestionCommentInput;
};


export type MutationCreateMockExamQuestionFeedbackArgs = {
  input: CreateMockExamQuestionFeedbackInput;
};


export type MutationCreateMutipleChoiceArgs = {
  input: CreateMockExamQuestionMultipleChoiceInput;
};


export type MutationCreateNoticeArgs = {
  input: CreateNoticeInput;
};


export type MutationCreateOrUpdateMockExamQuestionStateArgs = {
  input: CreateOrUpdateMockExamQuestionStateInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostCommentArgs = {
  input: CreatePostCommentInput;
};


export type MutationCreateQuestionCardArgs = {
  input: CreateQuestionCardInput;
};


export type MutationCreateQuestionCardCategoryArgs = {
  input: CreateQuestionCardCategoryInput;
};


export type MutationDeleteMockExamArgs = {
  input: DeleteMockExamInput;
};


export type MutationDeleteMockExamCategoryArgs = {
  input: DeleteMockExamCategoryInput;
};


export type MutationDeleteMockExamQuestionArgs = {
  input: DeleteMockExamQuestionInput;
};


export type MutationDeleteMockExamQuestionCommentArgs = {
  input: DeleteMockExamQuestionCommentInput;
};


export type MutationDeleteMockExamQuestionFeedbackArgs = {
  input: DeleteMockExamQuestionFeedbackInput;
};


export type MutationDeleteNoticeArgs = {
  input: DeleteNoticeInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeletePostCommentArgs = {
  input: DeletePostCommentInput;
};


export type MutationDeleteQuestionCardCategoryArgs = {
  input: DeleteQuestionCardCategoryInput;
};


export type MutationDeleteQuestionCardsArgs = {
  input: DeleteQuestionCardsInput;
};


export type MutationEditMockExamArgs = {
  input: EditMockExamInput;
};


export type MutationEditMockExamCategoryArgs = {
  input: EditMockExamCategoryInput;
};


export type MutationEditMockExamQuestionArgs = {
  input: EditMockExamQuestionInput;
};


export type MutationEditMockExamQuestionBookmarkArgs = {
  input: EditMockExamQuestionBookmarkInput;
};


export type MutationEditMockExamQuestionCommentArgs = {
  input: EditMockExamQuestionCommentInput;
};


export type MutationEditMockExamQuestionCommentLikeArgs = {
  input: EditMockExamQuestionCommentLikeInput;
};


export type MutationEditMockExamQuestionFeedbackArgs = {
  input: EditMockExamQuestionFeedbackInput;
};


export type MutationEditNoticeArgs = {
  input: EditNoticeInput;
};


export type MutationEditPostArgs = {
  input: EditPostInput;
};


export type MutationEditPostCommentArgs = {
  input: EditPostCommentInput;
};


export type MutationEditPostCommentLikeArgs = {
  input: EditPostCommentLikeInput;
};


export type MutationEditPostLikeArgs = {
  input: EditPostLikeInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationEmailVerificationArgs = {
  input: EmailVerificationInput;
};


export type MutationKakaoLoginArgs = {
  input: KakaoLoginInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationNaverBlogViewMacroArgs = {
  input: NaverBlogViewMacroInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationResetMyExamQuestionStateArgs = {
  input: ResetMyExamQuestionStateInput;
};


export type MutationRestoreUserArgs = {
  input: RestoreUserInput;
};


export type MutationRevalidateArgs = {
  input: RevalidateInput;
};


export type MutationSendFindPasswordMailArgs = {
  input: SendFindPasswordMailInput;
};


export type MutationSendMessageToAlramChannelOfTelegramArgs = {
  input: SendMessageToAlramChannelOfTelegramInput;
};


export type MutationSendVerificationMailArgs = {
  input: SendVerificationMailInput;
};


export type MutationUpdateAdBlockPermissionArgs = {
  input: UpdateAdblockPermissionInput;
};


export type MutationUpdateApprovedStateOfMockExamQuestionArgs = {
  input: UpdateApprovedStateOfMockExamQuestionInput;
};


export type MutationUpdateMockExamQuestionFeedbackRecommendationArgs = {
  input: UpdateMockExamQuestionFeedbackRecommendationInput;
};


export type MutationUpdateQuestionCardArgs = {
  input: UpdateQuestionCardInput;
};


export type MutationUpdateQuestionCardCategoryArgs = {
  input: UpdateQuestionCardCategoryInput;
};


export type MutationViewPostArgs = {
  input: ViewPostInput;
};

export type MyRecommedationStatus = {
  __typename?: 'MyRecommedationStatus';
  isBad: Scalars['Boolean'];
  isGood: Scalars['Boolean'];
};

export type NaverBlogViewMacroInput = {
  blogUrl?: InputMaybe<Scalars['String']>;
};

export type NaverBlogViewMacroOutput = {
  __typename?: 'NaverBlogViewMacroOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type NaverViewTapCrawlerInput = {
  blogName: Scalars['String'];
  keyword: Scalars['String'];
};

export type NaverViewTapCrawlerOutput = {
  __typename?: 'NaverViewTapCrawlerOutput';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  postInfo?: Maybe<PostInfo>;
  searchCounts?: Maybe<SearchCounts>;
};

export type Notice = {
  __typename?: 'Notice';
  confirm: Scalars['Boolean'];
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  link?: Maybe<Scalars['String']>;
  reservationTime?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type Post = {
  __typename?: 'Post';
  category: PostCategory;
  comment: Array<PostComment>;
  commentLikeState: Scalars['Boolean'];
  commentLikesCount: Scalars['Float'];
  commentsCount: Scalars['Float'];
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  like: Array<PostLike>;
  likeState: Scalars['Boolean'];
  likesCount: Scalars['Float'];
  priority: Scalars['Float'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
  view: Scalars['Float'];
};

export enum PostCategory {
  Checkin = 'CHECKIN',
  Free = 'FREE',
  Notice = 'NOTICE',
  Recovery = 'RECOVERY',
  Review = 'REVIEW',
  Suggenstion = 'SUGGENSTION'
}

export type PostComment = {
  __typename?: 'PostComment';
  commentLike: Array<PostCommentLike>;
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  likeState: Scalars['Boolean'];
  likesCount: Scalars['Float'];
  post: Post;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type PostCommentLike = {
  __typename?: 'PostCommentLike';
  comment: PostComment;
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type PostInfo = {
  __typename?: 'PostInfo';
  content: Scalars['String'];
  link: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
};

export type PostLike = {
  __typename?: 'PostLike';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  post: Post;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  findMyExamHistory: FindMyExamHistoryOutput;
  getExamTitleWithFeedback: GetExamTitleWithFeedbackOutput;
  getFeedbacksByRecommendationCount: GetFeedbacksByRecommendationCountOutput;
  getFeedbacksWithFilter: GetFeedbacksWithFilterOutput;
  me: MeOutput;
  naverViewTapCrawlerTest: NaverViewTapCrawlerOutput;
  readAllMockExam: ReadAllMockExamsOutput;
  readAllMockExamCategories: ReadAllMockExamCategoriesOutput;
  readAllMockExamQuestion: ReadAllMockExamQuestionOutput;
  readAllMockExamQuestionFeedback: ReadAllMockExamQuestionFeedbackOutput;
  readAllQuestions: ReadAllQuestionsOutput;
  readExamTitleAndIdByQuestionComment: ReadExamTitleAndIdByQuestionCommentOutput;
  readExamTitleAndIdByQuestionState: ReadExamTitleAndIdByQuestionStateOutput;
  readExamTitleAndIdOfBookmarkedQuestion: ReadExamTitleAndIdOfBookmarkedQuestionOutput;
  readMockExam: ReadMockExamOutput;
  readMockExamQuestion: ReadMockExamQuestionOutput;
  readMockExamQuestionBookmark: ReadMockExamQuestionBookmarkOutput;
  readMockExamQuestionCommentLikesByQuestinId: ReadMockExamQuestionCommentLikesByQuestinIdOutput;
  readMockExamQuestionCommentsByQuestionId: ReadMockExamQuestionCommentsByQuestionIdOutput;
  readMockExamQuestionNumbers: ReadMockExamQuestionNumbersOutput;
  readMockExamQuestionsByMockExamId: ReadMockExamQuestionsByMockExamIdOutput;
  readMockExamQuestionsByState: ReadMockExamQuestionsByStateOutput;
  readMockExamTitlesByCateory: ReadMockExamTitlesByCateoryOutput;
  readMyExamHistory: ReadMyExamHistoryOutput;
  readMyExamQuestionState: ReadMyExamQuestionStateOutput;
  readMyMockExamCategories: ReadMyMockExamCategoriesOutput;
  readMyQuestionCardCategories: ReadMyQuestionCardCategoriesOutput;
  readMyQuestionCards: ReadMyQuestionCardsOutput;
  readMyQuestionComments: ReadMyQuestionCommentsOutput;
  readPost: ReadPostOutput;
  readPosts: ReadPostsOutput;
  readQuestionCard: ReadQuestionCardOutput;
  readVisitCount: ReadVisitCountOutput;
  readVisitHistory: ReadVisitHistoryOutput;
  searchMockExam: SearchMockExamOutput;
  searchUser: SearchUserOutput;
  userProfile: UserProfileOutput;
};


export type QueryFindMyExamHistoryArgs = {
  input: FindMyExamHistoryInput;
};


export type QueryGetFeedbacksByRecommendationCountArgs = {
  input: GetFeedbacksByRecommendationCountInput;
};


export type QueryGetFeedbacksWithFilterArgs = {
  input: GetFeedbacksWithFilterInput;
};


export type QueryNaverViewTapCrawlerTestArgs = {
  input: NaverViewTapCrawlerInput;
};


export type QueryReadAllMockExamArgs = {
  input: ReadAllMockExamsInput;
};


export type QueryReadAllMockExamCategoriesArgs = {
  input?: InputMaybe<ReadAllMockExamCategoriesInput>;
};


export type QueryReadMockExamArgs = {
  input: ReadMockExamInput;
};


export type QueryReadMockExamQuestionArgs = {
  input: ReadMockExamQuestionInput;
};


export type QueryReadMockExamQuestionBookmarkArgs = {
  input: ReadMockExamQuestionBookmarkInput;
};


export type QueryReadMockExamQuestionCommentLikesByQuestinIdArgs = {
  input: ReadMockExamQuestionCommentLikesByQuestinIdInput;
};


export type QueryReadMockExamQuestionCommentsByQuestionIdArgs = {
  input: ReadMockExamQuestionCommentsByQuestionIdInput;
};


export type QueryReadMockExamQuestionNumbersArgs = {
  input: ReadMockExamQuestionNumbersInput;
};


export type QueryReadMockExamQuestionsByMockExamIdArgs = {
  input: ReadMockExamQuestionsByMockExamIdInput;
};


export type QueryReadMockExamQuestionsByStateArgs = {
  input: ReadMockExamQuestionsByStateInput;
};


export type QueryReadMockExamTitlesByCateoryArgs = {
  input: ReadMockExamTitlesByCateoryInput;
};


export type QueryReadMyExamQuestionStateArgs = {
  input: ReadMyExamQuestionStateInput;
};


export type QueryReadMyQuestionCardsArgs = {
  input: ReadMyQuestionCardsInput;
};


export type QueryReadMyQuestionCommentsArgs = {
  input: ReadMyQuestionCommentsInput;
};


export type QueryReadPostArgs = {
  input: ReadPostInput;
};


export type QueryReadPostsArgs = {
  input: ReadPostsInput;
};


export type QueryReadQuestionCardArgs = {
  input: ReadQuestionCardInput;
};


export type QuerySearchMockExamArgs = {
  input: SearchMockExamInput;
};


export type QuerySearchUserArgs = {
  input: SearchUserInput;
};


export type QueryUserProfileArgs = {
  input: UserProfileInput;
};

export type QuestionCard = {
  __typename?: 'QuestionCard';
  category: QuestionCardCategory;
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  question: Scalars['String'];
  solution: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type QuestionCardCategory = {
  __typename?: 'QuestionCardCategory';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  questionCard: QuestionCard;
  updated_at: Scalars['DateTime'];
  user: User;
};

export enum QuestionFeedbackRecommendationType {
  Bad = 'BAD',
  Good = 'GOOD'
}

export enum QuestionFeedbackType {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Report = 'REPORT'
}

export type QuestionNumber = {
  __typename?: 'QuestionNumber';
  questionId: Scalars['Float'];
  questionNumber: Scalars['Float'];
};

export enum QuestionState {
  Core = 'CORE',
  High = 'HIGH',
  Middle = 'MIDDLE',
  Row = 'ROW'
}

export type ReadAllMockExamCategoriesInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<MockExamCategoryTypes>;
};

export type ReadAllMockExamCategoriesOutput = {
  __typename?: 'ReadAllMockExamCategoriesOutput';
  categories: Array<MockExamCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadAllMockExamQuestionFeedbackOutput = {
  __typename?: 'ReadAllMockExamQuestionFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  feedbacks: Array<MockExamQuestionFeedback>;
  ok: Scalars['Boolean'];
};

export type ReadAllMockExamQuestionOutput = {
  __typename?: 'ReadAllMockExamQuestionOutput';
  error?: Maybe<Scalars['String']>;
  mockExamQuestions: Array<MockExamQuestion>;
  ok: Scalars['Boolean'];
};

export type ReadAllMockExamsInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
};

export type ReadAllMockExamsOutput = {
  __typename?: 'ReadAllMockExamsOutput';
  error?: Maybe<Scalars['String']>;
  mockExams: Array<MockExam>;
  ok: Scalars['Boolean'];
};

export type ReadAllQuestionsOutput = {
  __typename?: 'ReadAllQuestionsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questions?: Maybe<Array<MockExamQuestion>>;
};

export type ReadExamTitleAndIdByQuestionCommentOutput = {
  __typename?: 'ReadExamTitleAndIdByQuestionCommentOutput';
  error?: Maybe<Scalars['String']>;
  examTitleAndId?: Maybe<Array<ExamTitleAndIdByQuestionComment>>;
  ok: Scalars['Boolean'];
};

export type ReadExamTitleAndIdByQuestionStateOutput = {
  __typename?: 'ReadExamTitleAndIdByQuestionStateOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  titleAndId?: Maybe<Array<TitleAndId>>;
};

export type ReadExamTitleAndIdOfBookmarkedQuestionOutput = {
  __typename?: 'ReadExamTitleAndIdOfBookmarkedQuestionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  titleAndId?: Maybe<Array<TitleAndId>>;
};

export type ReadMockExamInput = {
  id: Scalars['Float'];
};

export type ReadMockExamOutput = {
  __typename?: 'ReadMockExamOutput';
  error?: Maybe<Scalars['String']>;
  mockExam: MockExam;
  ok: Scalars['Boolean'];
  questionNumbers: Array<Scalars['Float']>;
};

export type ReadMockExamQuestionBookmarkInput = {
  examId: Scalars['Float'];
};

export type ReadMockExamQuestionBookmarkOutput = {
  __typename?: 'ReadMockExamQuestionBookmarkOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questions: Array<MockExamQuestion>;
};

export type ReadMockExamQuestionCommentLikesByQuestinIdInput = {
  commentId: Scalars['Float'];
};

export type ReadMockExamQuestionCommentLikesByQuestinIdOutput = {
  __typename?: 'ReadMockExamQuestionCommentLikesByQuestinIdOutput';
  count: Scalars['Float'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamQuestionCommentsByQuestionIdInput = {
  questionId: Scalars['Float'];
};

export type ReadMockExamQuestionCommentsByQuestionIdOutput = {
  __typename?: 'ReadMockExamQuestionCommentsByQuestionIdOutput';
  comments?: Maybe<Array<MockExamQuestionComment>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamQuestionInput = {
  examId?: InputMaybe<Scalars['Float']>;
  questionId: Scalars['Float'];
};

export type ReadMockExamQuestionNumbersInput = {
  mockExamId: Scalars['Float'];
};

export type ReadMockExamQuestionNumbersOutput = {
  __typename?: 'ReadMockExamQuestionNumbersOutput';
  error?: Maybe<Scalars['String']>;
  examStatus?: Maybe<ExamStatus>;
  ok: Scalars['Boolean'];
  questionNumbers: Array<QuestionNumber>;
};

export type ReadMockExamQuestionOutput = {
  __typename?: 'ReadMockExamQuestionOutput';
  error?: Maybe<Scalars['String']>;
  isCoAuthor: Scalars['Boolean'];
  mockExamQusetion: MockExamQuestion;
  ok: Scalars['Boolean'];
  state?: Maybe<QuestionState>;
};

export type ReadMockExamQuestionsByMockExamIdInput = {
  bookmarked?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Float']>;
  ids?: InputMaybe<Array<Scalars['Float']>>;
  isRandom?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  states?: InputMaybe<Array<QuestionState>>;
};

export type ReadMockExamQuestionsByMockExamIdOutput = {
  __typename?: 'ReadMockExamQuestionsByMockExamIdOutput';
  author: Scalars['String'];
  count: Scalars['Float'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questions: Array<MockExamQuestion>;
  title: Scalars['String'];
};

export type ReadMockExamQuestionsByStateInput = {
  examId?: InputMaybe<Scalars['Float']>;
  questionIds?: InputMaybe<Array<Scalars['Float']>>;
  states: Array<QuestionState>;
};

export type ReadMockExamQuestionsByStateOutput = {
  __typename?: 'ReadMockExamQuestionsByStateOutput';
  error?: Maybe<Scalars['String']>;
  mockExamQusetions: Array<MockExamQuestionState>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamTitlesByCateoryInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type ReadMockExamTitlesByCateoryOutput = {
  __typename?: 'ReadMockExamTitlesByCateoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  titles: Array<ExamTitleAndId>;
};

export type ReadMyExamHistoryOutput = {
  __typename?: 'ReadMyExamHistoryOutput';
  error?: Maybe<Scalars['String']>;
  mockExams?: Maybe<Array<MockExam>>;
  ok: Scalars['Boolean'];
};

export type ReadMyExamQuestionStateInput = {
  questionId: Scalars['Float'];
};

export type ReadMyExamQuestionStateOutput = {
  __typename?: 'ReadMyExamQuestionStateOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  state: MockExamQuestionState;
};

export type ReadMyMockExamCategoriesOutput = {
  __typename?: 'ReadMyMockExamCategoriesOutput';
  categories: Array<MockExamCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadMyQuestionCardCategoriesOutput = {
  __typename?: 'ReadMyQuestionCardCategoriesOutput';
  categories?: Maybe<Array<QuestionCardCategory>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadMyQuestionCardsInput = {
  categoryId?: InputMaybe<Scalars['Float']>;
};

export type ReadMyQuestionCardsOutput = {
  __typename?: 'ReadMyQuestionCardsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questionCards?: Maybe<Array<QuestionCard>>;
};

export type ReadMyQuestionCommentsInput = {
  examId: Scalars['Float'];
};

export type ReadMyQuestionCommentsOutput = {
  __typename?: 'ReadMyQuestionCommentsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questions?: Maybe<Array<MockExamQuestion>>;
};

export type ReadPostInput = {
  id: Scalars['Float'];
};

export type ReadPostOutput = {
  __typename?: 'ReadPostOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  post?: Maybe<Post>;
};

export type ReadPostsInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<PostCategory>;
  limit?: InputMaybe<Scalars['Float']>;
  page: Scalars['Float'];
};

export type ReadPostsOutput = {
  __typename?: 'ReadPostsOutput';
  count: Scalars['Float'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  posts?: Maybe<Array<Post>>;
};

export type ReadQuestionCardInput = {
  id: Scalars['Float'];
};

export type ReadQuestionCardOutput = {
  __typename?: 'ReadQuestionCardOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questionCard?: Maybe<QuestionCard>;
};

export type ReadVisitCountOutput = {
  __typename?: 'ReadVisitCountOutput';
  count?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadVisitHistoryOutput = {
  __typename?: 'ReadVisitHistoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  today?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  yesterday?: Maybe<Scalars['Float']>;
};

export type RecommendationCount = {
  __typename?: 'RecommendationCount';
  bad: Scalars['Float'];
  good: Scalars['Float'];
};

export type RegisterInput = {
  code: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterOutput = {
  __typename?: 'RegisterOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ResetMyExamQuestionStateInput = {
  examId?: InputMaybe<Scalars['Float']>;
  questionIds?: InputMaybe<Array<Scalars['Float']>>;
};

export type ResetMyExamQuestionStateOutput = {
  __typename?: 'ResetMyExamQuestionStateOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type RestoreUserInput = {
  id: Scalars['Float'];
};

export type RevalidateInput = {
  path: Scalars['String'];
};

export type RevalidateOutput = {
  __typename?: 'RevalidateOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SearchCount = {
  __typename?: 'SearchCount';
  all: Scalars['Float'];
  blog: Scalars['Float'];
  url: Scalars['String'];
};

export type SearchCounts = {
  __typename?: 'SearchCounts';
  daum: SearchCount;
  naver: SearchCount;
};

export type SearchMockExamInput = {
  query: Scalars['String'];
};

export type SearchMockExamOutput = {
  __typename?: 'SearchMockExamOutput';
  error?: Maybe<Scalars['String']>;
  mockExams: Array<MockExam>;
  ok: Scalars['Boolean'];
  totalResults: Scalars['Float'];
};

export type SearchUserInput = {
  name: Scalars['String'];
};

export type SearchUserOutput = {
  __typename?: 'SearchUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
};

export type SendFindPasswordMailInput = {
  email: Scalars['String'];
};

export type SendFindPasswordMailOutput = {
  __typename?: 'SendFindPasswordMailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SendMessageToAlramChannelOfTelegramInput = {
  message: Scalars['String'];
};

export type SendMessageToAlramChannelOfTelegramOutput = {
  __typename?: 'SendMessageToAlramChannelOfTelegramOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SendVerificationMailInput = {
  email: Scalars['String'];
};

export type SendVerificationMailOutput = {
  __typename?: 'SendVerificationMailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type TitleAndId = {
  __typename?: 'TitleAndId';
  id?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateAdblockPermissionInput = {
  userId: Scalars['Float'];
};

export type UpdateAdblockPermissionOutput = {
  __typename?: 'UpdateAdblockPermissionOutput';
  adblockPermission?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateApprovedStateOfMockExamQuestionInput = {
  questionId: Scalars['Float'];
};

export type UpdateApprovedStateOfMockExamQuestionOutput = {
  __typename?: 'UpdateApprovedStateOfMockExamQuestionOutput';
  currentApprovedState: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questionId: Scalars['Float'];
};

export type UpdateMockExamQuestionFeedbackRecommendationInput = {
  feedbackId: Scalars['Float'];
  type: QuestionFeedbackRecommendationType;
};

export type UpdateMockExamQuestionFeedbackRecommendationOutput = {
  __typename?: 'UpdateMockExamQuestionFeedbackRecommendationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  recommendation?: Maybe<MockExamQuestionFeedbackRecommendation>;
};

export type UpdateQuestionCardCategoryInput = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type UpdateQuestionCardCategoryOutput = {
  __typename?: 'UpdateQuestionCardCategoryOutput';
  category?: Maybe<QuestionCardCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateQuestionCardInput = {
  question?: InputMaybe<Scalars['String']>;
  questionId: Scalars['Float'];
  solution?: InputMaybe<Scalars['String']>;
};

export type UpdateQuestionCardOutput = {
  __typename?: 'UpdateQuestionCardOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questionCard?: Maybe<QuestionCard>;
};

export type User = {
  __typename?: 'User';
  LoginType: LoginType;
  created_at: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  email: Scalars['String'];
  examCoAuthor?: Maybe<Array<ExamCoAuthor>>;
  feedback: Array<Feedback>;
  feedbackRecommendation: Array<MockExamQuestionFeedbackRecommendation>;
  id: Scalars['Float'];
  isAllowAdblock: Scalars['Boolean'];
  mockExam: Array<MockExam>;
  mockExamCategory: Array<MockExamCategory>;
  mockExamHistory: Array<MockExamHistory>;
  mockExamQuestion: Array<MockExamQuestion>;
  mockExamQuestionBookmark: Array<MockExamQuestionBookmark>;
  mockExamQuestionComment: Array<MockExamQuestionComment>;
  mockExamQuestionCommentLike: Array<MockExamQuestionCommentLike>;
  mockExamQuestionState: Array<MockExamQuestionState>;
  nickname: Scalars['String'];
  notice?: Maybe<Array<Notice>>;
  password: Scalars['String'];
  post?: Maybe<Array<Post>>;
  postComment: Array<PostComment>;
  questionCardCategorys: Array<QuestionCardCategory>;
  questionCards: Array<QuestionCard>;
  questionFeedback: Array<MockExamQuestionFeedback>;
  role: UserRole;
  updated_at: Scalars['DateTime'];
  visit: Visit;
};

export type UserProfileInput = {
  id: Scalars['Float'];
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  Partner = 'PARTNER'
}

export type ViewPostInput = {
  postId: Scalars['Float'];
};

export type ViewPostOutput = {
  __typename?: 'ViewPostOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Visit = {
  __typename?: 'Visit';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};
