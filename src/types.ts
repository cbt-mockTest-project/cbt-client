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

export type AcceptExamCategoryInvitationInput = {
  categoryId: Scalars['Float'];
};

export type AcceptExamCategoryInvitationOutput = {
  __typename?: 'AcceptExamCategoryInvitationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AddExamToCategoryInput = {
  categoryId: Scalars['Float'];
  examId: Scalars['Float'];
};

export type AddExamToCategoryOutput = {
  __typename?: 'AddExamToCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Attendance = {
  __typename?: 'Attendance';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type AttendanceInputTyper = {
  content: Scalars['String'];
  user: UserInputType;
};

export type CategoryEvaluation = {
  __typename?: 'CategoryEvaluation';
  category: MockExamCategory;
  created_at: Scalars['DateTime'];
  feedback?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  isSecret?: Maybe<Scalars['Boolean']>;
  score?: Maybe<Scalars['Float']>;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type CategoryEvaluationInputType = {
  category: MockExamCategoryInputType;
  feedback?: InputMaybe<Scalars['String']>;
  isSecret?: InputMaybe<Scalars['Boolean']>;
  score?: InputMaybe<Scalars['Float']>;
  user: UserInputType;
};

export type ChangeClientRoleAndCreatePaymentInput = {
  changeClientRoleInput: ChangeClientRoleInput;
  createPaymentInput: CreatePaymentInput;
};

export type ChangeClientRoleAndCreatePaymentOutput = {
  __typename?: 'ChangeClientRoleAndCreatePaymentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  paymentId?: Maybe<Scalars['Float']>;
};

export type ChangeClientRoleInput = {
  role: UserRole;
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

export type CheckDiscountCodeInput = {
  code: Scalars['String'];
};

export type CheckDiscountCodeOutput = {
  __typename?: 'CheckDiscountCodeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CheckIfCategoryEvaluatedInput = {
  categoryId: Scalars['Float'];
};

export type CheckIfCategoryEvaluatedOutput = {
  __typename?: 'CheckIfCategoryEvaluatedOutput';
  error?: Maybe<Scalars['String']>;
  isEvaluated?: Maybe<Scalars['Boolean']>;
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

export type CheckUserRoleInput = {
  roleIds: Array<Scalars['Float']>;
};

export type CheckUserRoleOutput = {
  __typename?: 'CheckUserRoleOutput';
  confirmed: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CoreOutput = {
  __typename?: 'CoreOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateAttendanceInput = {
  content: Scalars['String'];
};

export type CreateAttendanceOutput = {
  __typename?: 'CreateAttendanceOutput';
  attendance?: Maybe<Attendance>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateCategoryEvaluationInput = {
  categoryId: Scalars['Float'];
  feedback?: InputMaybe<Scalars['String']>;
  isSecret?: InputMaybe<Scalars['Boolean']>;
  score?: InputMaybe<Scalars['Float']>;
};

export type CreateCategoryEvaluationOutput = {
  __typename?: 'CreateCategoryEvaluationOutput';
  categoryEvaluation?: Maybe<CategoryEvaluation>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateExamCategoryInvitationInput = {
  categoryId: Scalars['Float'];
  userIdForInvitation: Scalars['Float'];
};

export type CreateExamCategoryInvitationOutput = {
  __typename?: 'CreateExamCategoryInvitationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateExamCategoryViewerInput = {
  categoryId: Scalars['Float'];
  viewerId: Scalars['Float'];
};

export type CreateExamCategoryViewerOutput = {
  __typename?: 'CreateExamCategoryViewerOutput';
  error?: Maybe<Scalars['String']>;
  examViewer?: Maybe<ExamViewer>;
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

export type CreateFreeTrialRoleOutput = {
  __typename?: 'CreateFreeTrialRoleOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamCategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
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
  label?: InputMaybe<Scalars['String']>;
  mockExamId: Scalars['Float'];
  number: Scalars['Float'];
  question?: InputMaybe<Scalars['String']>;
  question_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  solution?: InputMaybe<Scalars['String']>;
  solution_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
};

export type CreateMockExamQuestionMultipleChoiceInput = {
  answer: Scalars['Float'];
  options: Array<MockExamQuestionMultipleChoiceOptionInputType>;
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

export type CreateOrUpdateTodoInput = {
  dateString: Scalars['String'];
  todoList?: InputMaybe<Array<TodoListInputType>>;
};

export type CreateOrUpdateTodoOutput = {
  __typename?: 'CreateOrUpdateTodoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  todo?: Maybe<Todo>;
};

export type CreatePaymentInput = {
  orderId: Scalars['String'];
  price: Scalars['Float'];
  productName: Scalars['String'];
  receiptId: Scalars['String'];
};

export type CreatePaymentOutput = {
  __typename?: 'CreatePaymentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  payment?: Maybe<Payment>;
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
  data?: InputMaybe<PostDataInput>;
  title: Scalars['String'];
};

export type CreatePostOutput = {
  __typename?: 'CreatePostOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  postId?: Maybe<Scalars['Float']>;
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

export type CreateUserRoleInput = {
  roleId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type CreateUserRoleOutput = {
  __typename?: 'CreateUserRoleOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  roleId?: Maybe<Scalars['Float']>;
};

export type CreateVideoInput = {
  size: Scalars['Float'];
  url: Scalars['String'];
};

export type CreateVideoOutput = {
  __typename?: 'CreateVideoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateVisitHistoryOutput = {
  __typename?: 'CreateVisitHistoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  todayViewCount?: Maybe<Scalars['Float']>;
  totalViewCount?: Maybe<Scalars['Float']>;
};

export type DeleteAttendanceInput = {
  id: Scalars['Float'];
};

export type DeleteAttendanceOutput = {
  __typename?: 'DeleteAttendanceOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteCategoryEvaluationInput = {
  id: Scalars['Float'];
};

export type DeleteCategoryEvaluationOutput = {
  __typename?: 'DeleteCategoryEvaluationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteExamCategoryBookmarkInput = {
  categoryId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type DeleteExamCategoryBookmarkOutput = {
  __typename?: 'DeleteExamCategoryBookmarkOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteExamCategoryInvitationInput = {
  invitationId: Scalars['Float'];
};

export type DeleteExamCategoryInvitationOutput = {
  __typename?: 'DeleteExamCategoryInvitationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteExamCategoryViewerInput = {
  categoryId: Scalars['Float'];
  examViewerId: Scalars['Float'];
  executor?: InputMaybe<Scalars['String']>;
};

export type DeleteExamCategoryViewerOutput = {
  __typename?: 'DeleteExamCategoryViewerOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
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

export type DeletePaymentInput = {
  paymentId: Scalars['Float'];
};

export type DeletePaymentOutput = {
  __typename?: 'DeletePaymentOutput';
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

export type DeleteUserRoleInput = {
  id: Scalars['Float'];
};

export type DeleteUserRoleOutput = {
  __typename?: 'DeleteUserRoleOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DiscountCode = {
  __typename?: 'DiscountCode';
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  status: DiscountCodeStatus;
  type: DiscountCodeType;
  updated_at: Scalars['DateTime'];
  user: User;
};

export enum DiscountCodeStatus {
  Pending = 'PENDING',
  Unused = 'UNUSED',
  Used = 'USED'
}

export enum DiscountCodeType {
  EhsMaster = 'EHS_MASTER',
  MoudCbt = 'MOUD_CBT'
}

export type Discountcode = {
  code: Scalars['String'];
  status: DiscountCodeStatus;
  type: DiscountCodeType;
  user: UserInputType;
};

export type EditMockExamCategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Float'];
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type EditMockExamInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
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
  type: QuestionFeedbackType;
};

export type EditMockExamQuestionFeedbackOutput = {
  __typename?: 'EditMockExamQuestionFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMockExamQuestionInput = {
  id: Scalars['Float'];
  label?: InputMaybe<Scalars['String']>;
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
  data?: InputMaybe<PostDataInput>;
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
  profileImg?: InputMaybe<Scalars['String']>;
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

export type ExamCategoryBookmark = {
  __typename?: 'ExamCategoryBookmark';
  category: MockExamCategory;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type ExamCategoryBookmarkInputType = {
  category: MockExamCategoryInputType;
  user: UserInputType;
};

export type ExamCategoryInvitation = {
  __typename?: 'ExamCategoryInvitation';
  category: MockExamCategory;
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type ExamCategoryInvitationInputType = {
  category: MockExamCategoryInputType;
  user: UserInputType;
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

export type ExamCoAuthorInputType = {
  exam: MockExamInputType;
  examCategory: MockExamCategoryInputType;
  user: UserInputType;
};

export type ExamLike = {
  __typename?: 'ExamLike';
  exam: MockExam;
  user: User;
};

export type ExamLikeInputType = {
  exam: MockExamInputType;
  user: UserInputType;
};

export type ExamOrder = {
  examId: Scalars['Float'];
  order: Scalars['Float'];
};

export enum ExamSource {
  EhsMaster = 'EHS_MASTER',
  MoudCbt = 'MOUD_CBT',
  User = 'USER'
}

export enum ExamStatus {
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Request = 'REQUEST',
  Unset = 'UNSET'
}

export type ExamTitleAndId = {
  __typename?: 'ExamTitleAndId';
  id: Scalars['Float'];
  order: Scalars['Float'];
  slug?: Maybe<Scalars['String']>;
  status: ExamStatus;
  title: Scalars['String'];
};

export type ExamTitleAndIdByQuestionComment = {
  __typename?: 'ExamTitleAndIdByQuestionComment';
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type ExamViewer = {
  __typename?: 'ExamViewer';
  created_at: Scalars['DateTime'];
  exam: MockExam;
  examCategory: MockExamCategory;
  id: Scalars['Float'];
  isApprove: Scalars['Boolean'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type ExamViewerInput = {
  exam: MockExamInputType;
  examCategory: MockExamCategoryInputType;
  isApprove: Scalars['Boolean'];
  user: UserInputType;
};

export type Feedback = {
  __typename?: 'Feedback';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type FeedbackInputType = {
  content: Scalars['String'];
  user: UserInputType;
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

export type GetBuyersOutput = {
  __typename?: 'GetBuyersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  userAndRoles?: Maybe<Array<UserAndRole>>;
};

export type GetCategoryEvaluationInput = {
  categoryId: Scalars['Float'];
};

export type GetCategoryEvaluationOutput = {
  __typename?: 'GetCategoryEvaluationOutput';
  categoryEvaluations?: Maybe<Array<CategoryEvaluation>>;
  error?: Maybe<Scalars['String']>;
  isEvaluated?: Maybe<Scalars['Boolean']>;
  ok: Scalars['Boolean'];
};

export type GetExamCategoriesInput = {
  categoryIds?: InputMaybe<Array<Scalars['Float']>>;
  categoryMakerId?: InputMaybe<Scalars['Float']>;
  examSource?: InputMaybe<ExamSource>;
  isBookmarked?: InputMaybe<Scalars['Boolean']>;
  isPublicOnly?: InputMaybe<Scalars['Boolean']>;
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type GetExamCategoriesOutput = {
  __typename?: 'GetExamCategoriesOutput';
  categories?: Maybe<Array<MockExamCategory>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetExamCategoryInvitationsOutput = {
  __typename?: 'GetExamCategoryInvitationsOutput';
  error?: Maybe<Scalars['String']>;
  invitations?: Maybe<Array<ExamCategoryInvitation>>;
  ok: Scalars['Boolean'];
};

export type GetExamCategoryLearningProgressInput = {
  categoryId: Scalars['Float'];
};

export type GetExamCategoryLearningProgressOutput = {
  __typename?: 'GetExamCategoryLearningProgressOutput';
  error?: Maybe<Scalars['String']>;
  highScoreCount?: Maybe<Scalars['Float']>;
  lowScoreCount?: Maybe<Scalars['Float']>;
  ok: Scalars['Boolean'];
  totalQuestionCount?: Maybe<Scalars['Float']>;
};

export type GetExamCategorySubscribersInput = {
  categoryId: Scalars['Float'];
};

export type GetExamCategorySubscribersOutput = {
  __typename?: 'GetExamCategorySubscribersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
};

export type GetExamCategoryViewrsInput = {
  categoryId: Scalars['Float'];
};

export type GetExamCategoryViewrsOutput = {
  __typename?: 'GetExamCategoryViewrsOutput';
  error?: Maybe<Scalars['String']>;
  examViewers?: Maybe<Array<ExamViewer>>;
  ok: Scalars['Boolean'];
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

export type GetInvitedExamsOutput = {
  __typename?: 'GetInvitedExamsOutput';
  error?: Maybe<Scalars['String']>;
  examViewers?: Maybe<Array<ExamViewer>>;
  ok: Scalars['Boolean'];
};

export type GetMyAllExamCategoriesLearningProgressOutput = {
  __typename?: 'GetMyAllExamCategoriesLearningProgressOutput';
  error?: Maybe<Scalars['String']>;
  highScoreCount?: Maybe<Scalars['Float']>;
  lowScoreCount?: Maybe<Scalars['Float']>;
  ok: Scalars['Boolean'];
  totalQuestionCount?: Maybe<Scalars['Float']>;
};

export type GetMyBlogPostRankInput = {
  blogName: Scalars['String'];
  keyword: Scalars['String'];
};

export type GetMyBlogPostRankOutput = {
  __typename?: 'GetMyBlogPostRankOutput';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  postInfo?: Maybe<PostInfo>;
  searchCounts?: Maybe<SearchCounts>;
};

export type GetMyBookmarkedExamCategoriesOutput = {
  __typename?: 'GetMyBookmarkedExamCategoriesOutput';
  categories?: Maybe<Array<MockExamCategory>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetMyBookmarkedExamsOutput = {
  __typename?: 'GetMyBookmarkedExamsOutput';
  error?: Maybe<Scalars['String']>;
  exams?: Maybe<Array<MockExam>>;
  ok: Scalars['Boolean'];
};

export type GetMyExamCategoriesOutput = {
  __typename?: 'GetMyExamCategoriesOutput';
  categories?: Maybe<Array<MockExamCategory>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetMyExamsInput = {
  isBookmarked?: InputMaybe<Scalars['Boolean']>;
};

export type GetMyExamsOutput = {
  __typename?: 'GetMyExamsOutput';
  error?: Maybe<Scalars['String']>;
  exams?: Maybe<Array<MockExam>>;
  ok: Scalars['Boolean'];
};

export type GetMyPaymentsOutput = {
  __typename?: 'GetMyPaymentsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  payments?: Maybe<Array<Payment>>;
};

export type GetPartnersOutput = {
  __typename?: 'GetPartnersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  partners?: Maybe<Array<Partner>>;
};

export type GetRoleCountInput = {
  roleId: Scalars['Float'];
};

export type GetRoleCountOutput = {
  __typename?: 'GetRoleCountOutput';
  count?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetRolesCountInput = {
  roleIds: Array<Scalars['Float']>;
};

export type GetRolesCountOutput = {
  __typename?: 'GetRolesCountOutput';
  count?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetTodayAttendanceOutput = {
  __typename?: 'GetTodayAttendanceOutput';
  attendances?: Maybe<Array<Attendance>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetTodoInput = {
  dateString: Scalars['String'];
};

export type GetTodoOutput = {
  __typename?: 'GetTodoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  todo?: Maybe<Todo>;
};

export type GetUserByNicknameOrEmailInput = {
  keyword: Scalars['String'];
};

export type GetUserByNicknameOrEmailOutput = {
  __typename?: 'GetUserByNicknameOrEmailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
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
  examBookmarks: Array<MockExamBookmark>;
  examCoAuthor?: Maybe<Array<ExamCoAuthor>>;
  examLikes: Array<ExamLike>;
  examViewer?: Maybe<Array<ExamViewer>>;
  history: Array<MockExamHistory>;
  id: Scalars['Float'];
  isBookmarked?: Maybe<Scalars['Boolean']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  isPremium: Scalars['Boolean'];
  mockExamCategory: Array<MockExamCategory>;
  mockExamQuestion: Array<MockExamQuestion>;
  mockExamQuestionState: Array<MockExamQuestion>;
  order: Scalars['Float'];
  questionOrderIds: Array<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  source: ExamSource;
  status: ExamStatus;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
  uuid: Scalars['String'];
};

export type MockExamBookmark = {
  __typename?: 'MockExamBookmark';
  created_at: Scalars['DateTime'];
  exam: MockExam;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamBookmarkInputType = {
  exam: MockExamInputType;
  user: UserInputType;
};

export type MockExamCategory = {
  __typename?: 'MockExamCategory';
  approved: Scalars['Boolean'];
  categoryEvaluations?: Maybe<Array<CategoryEvaluation>>;
  created_at: Scalars['DateTime'];
  description: Scalars['String'];
  examCategoryBookmarks: Array<ExamCategoryBookmark>;
  examCategoryInvitations: Array<ExamCategoryInvitation>;
  examCoAuthor?: Maybe<Array<ExamCoAuthor>>;
  examOrderIds: Array<Scalars['Float']>;
  examViewer?: Maybe<Array<ExamViewer>>;
  hasAccess?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  isBookmarked?: Maybe<Scalars['Boolean']>;
  isPublic: Scalars['Boolean'];
  mockExam: Array<MockExam>;
  name: Scalars['String'];
  order: Scalars['Float'];
  partner?: Maybe<Partner>;
  roles: Array<Role>;
  seller?: Maybe<Seller>;
  source: ExamSource;
  type: MockExamCategoryTypes;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamCategoryInputType = {
  approved?: InputMaybe<Scalars['Boolean']>;
  categoryEvaluations?: InputMaybe<Array<CategoryEvaluationInputType>>;
  description?: InputMaybe<Scalars['String']>;
  examCategoryBookmarks: Array<ExamCategoryBookmarkInputType>;
  examCategoryInvitations: Array<ExamCategoryInvitationInputType>;
  examCoAuthor?: InputMaybe<Array<ExamCoAuthorInputType>>;
  examOrderIds?: InputMaybe<Array<Scalars['Float']>>;
  examViewer?: InputMaybe<Array<ExamViewerInput>>;
  hasAccess?: InputMaybe<Scalars['Boolean']>;
  isBookmarked?: InputMaybe<Scalars['Boolean']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  mockExam: Array<MockExamInputType>;
  name: Scalars['String'];
  order: Scalars['Float'];
  partner?: InputMaybe<PartnerInputType>;
  roles: Array<RoleInputType>;
  seller?: InputMaybe<SellerInputType>;
  source: ExamSource;
  type: MockExamCategoryTypes;
  user: UserInputType;
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

export type MockExamHistoryInputType = {
  exam: MockExamInputType;
  user: UserInputType;
};

export type MockExamImageType = {
  __typename?: 'MockExamImageType';
  name: Scalars['String'];
  uid: Scalars['String'];
  url: Scalars['String'];
};

export type MockExamInputType = {
  approved?: InputMaybe<Scalars['Boolean']>;
  examBookmarks: Array<MockExamBookmarkInputType>;
  examCoAuthor?: InputMaybe<Array<ExamCoAuthorInputType>>;
  examLikes: Array<ExamLikeInputType>;
  examViewer?: InputMaybe<Array<ExamViewerInput>>;
  history: Array<MockExamHistoryInputType>;
  isBookmarked?: InputMaybe<Scalars['Boolean']>;
  isLiked?: InputMaybe<Scalars['Boolean']>;
  isPremium?: InputMaybe<Scalars['Boolean']>;
  mockExamCategory: Array<MockExamCategoryInputType>;
  mockExamQuestion: Array<MockExamQuestionInputType>;
  mockExamQuestionState: Array<MockExamQuestionInputType>;
  order?: InputMaybe<Scalars['Float']>;
  questionOrderIds?: InputMaybe<Array<Scalars['String']>>;
  slug?: InputMaybe<Scalars['String']>;
  source: ExamSource;
  status: ExamStatus;
  title: Scalars['String'];
  user: UserInputType;
  uuid: Scalars['String'];
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
  commentCount?: Maybe<Scalars['Float']>;
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  isBookmarked?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  mockExam?: Maybe<MockExam>;
  mockExamQuestionBookmark: Array<MockExamQuestionBookmark>;
  mockExamQuestionComment: Array<MockExamQuestionComment>;
  mockExamQuestionFeedback: Array<MockExamQuestionFeedback>;
  multipleChoice: Array<MockExamQuestionMultipleChoice>;
  myQuestionState?: Maybe<QuestionState>;
  number: Scalars['Float'];
  objectiveData?: Maybe<ObjectiveData>;
  orderId: Scalars['String'];
  question?: Maybe<Scalars['String']>;
  question_img?: Maybe<Array<MockExamImageType>>;
  question_video?: Maybe<Array<MockExamVideoType>>;
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

export type MockExamQuestionBookmarkInputType = {
  question: MockExamQuestionInputType;
  user: UserInputType;
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

export type MockExamQuestionCommentInputType = {
  commentLike: Array<MockExamQuestionCommentLikeInputType>;
  content: Scalars['String'];
  likeState?: InputMaybe<Scalars['Boolean']>;
  likesCount?: InputMaybe<Scalars['Float']>;
  question: MockExamQuestionInputType;
  user: UserInputType;
};

export type MockExamQuestionCommentLike = {
  __typename?: 'MockExamQuestionCommentLike';
  comment: MockExamQuestionComment;
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type MockExamQuestionCommentLikeInputType = {
  comment: MockExamQuestionCommentInputType;
  user: UserInputType;
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

export type MockExamQuestionFeedbackInputType = {
  content: Scalars['String'];
  mockExamQuestion: MockExamQuestionInputType;
  myRecommedationStatus: MyRecommedationStatusInputType;
  recommendation: Array<MockExamQuestionFeedbackRecommendationInputType>;
  recommendationCount: RecommendationCountInputType;
  type: QuestionFeedbackType;
  user: UserInputType;
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

export type MockExamQuestionFeedbackRecommendationInputType = {
  feedback: MockExamQuestionFeedbackInputType;
  type: QuestionFeedbackRecommendationType;
  user: UserInputType;
};

export type MockExamQuestionImageInputType = {
  name: Scalars['String'];
  uid: Scalars['String'];
  url: Scalars['String'];
};

export type MockExamQuestionInputType = {
  approved?: InputMaybe<Scalars['Boolean']>;
  commentCount?: InputMaybe<Scalars['Float']>;
  isBookmarked?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  mockExam?: InputMaybe<MockExamInputType>;
  mockExamQuestionBookmark: Array<MockExamQuestionBookmarkInputType>;
  mockExamQuestionComment: Array<MockExamQuestionCommentInputType>;
  mockExamQuestionFeedback: Array<MockExamQuestionFeedbackInputType>;
  multipleChoice: Array<MockExamQuestionMultipleChoiceInputType>;
  myQuestionState?: InputMaybe<QuestionState>;
  number: Scalars['Float'];
  objectiveData?: InputMaybe<MockExamQuestionObjectiveInputType>;
  orderId: Scalars['String'];
  question?: InputMaybe<Scalars['String']>;
  question_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  question_video?: InputMaybe<Array<MockExamQuestionVideoInputType>>;
  solution?: InputMaybe<Scalars['String']>;
  solution_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  state: Array<MockExamQuestionStateInputType>;
  user: UserInputType;
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

export type MockExamQuestionMultipleChoiceInputType = {
  answer: Scalars['Float'];
  options: Array<MockExamQuestionMultipleChoiceOptionInputType>;
  question: MockExamQuestionInputType;
};

export type MockExamQuestionMultipleChoiceOptionInputType = {
  content: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  number: Scalars['Float'];
};

export type MockExamQuestionObjectiveContentInputType = {
  content: Scalars['String'];
  url: Scalars['String'];
};

export type MockExamQuestionObjectiveInputType = {
  answer: Scalars['Float'];
  content: Array<MockExamQuestionObjectiveContentInputType>;
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

export type MockExamQuestionStateInputType = {
  answer: Scalars['String'];
  exam: MockExamInputType;
  question: MockExamQuestionInputType;
  state: QuestionState;
  user: UserInputType;
};

export type MockExamQuestionVideoInputType = {
  size: Scalars['Float'];
  url: Scalars['String'];
};

export type MockExamVideoType = {
  __typename?: 'MockExamVideoType';
  size: Scalars['Float'];
  url: Scalars['String'];
};

export type MoveExamOrderInput = {
  categoryId: Scalars['Float'];
  endIdx: Scalars['Float'];
  startIdx: Scalars['Float'];
};

export type MoveExamOrderOutput = {
  __typename?: 'MoveExamOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptExamCategoryInvitation: AcceptExamCategoryInvitationOutput;
  addExamToCategory: AddExamToCategoryOutput;
  changeClientRole: CoreOutput;
  changeClientRoleAndCreatePayment: ChangeClientRoleAndCreatePaymentOutput;
  changePasswordAfterVerifying: ChangePasswordAfterVerifyingOutput;
  checkDiscountCode: CheckDiscountCodeOutput;
  checkIfCategoryEvaluated: CheckIfCategoryEvaluatedOutput;
  checkPassword: CheckPasswordOutput;
  checkUserRole: CheckUserRoleOutput;
  createAttendance: CreateAttendanceOutput;
  createCategoryEvaluation: CreateCategoryEvaluationOutput;
  createDiscountCode: Scalars['Boolean'];
  createExamCategoryInvitation: CreateExamCategoryInvitationOutput;
  createExamCategoryViewer: CreateExamCategoryViewerOutput;
  createFeedback: CreateFeedbackOutput;
  createFreeTrialRole: CreateFreeTrialRoleOutput;
  createMockExam: CreateMockExamOutput;
  createMockExamCategory: CreateMockExamCategoryOutput;
  createMockExamHistory: CreateMockExamHistoryOutput;
  createMockExamQuestion: CreateMockExamQuestionOutput;
  createMockExamQuestionComment: CreateMockExamQuestionCommentOutput;
  createMockExamQuestionFeedback: CreateMockExamQuestionFeedbackOutput;
  createMutipleChoice: CreateMockExamQuestionMultipleChoiceOutput;
  createNotice: CreateNoticeOutput;
  createOrUpdateMockExamQuestionState: CreateOrUpdateMockExamQuestionStateOutput;
  createOrUpdateTodo: CreateOrUpdateTodoOutput;
  createPayment: CreatePaymentOutput;
  createPost: CreatePostOutput;
  createPostComment: CreatePostCommentOutput;
  createQuestionCard: CreateQuestionCardOutput;
  createQuestionCardCategory: CreateQuestionCardCategoryOutput;
  createUserRole: CreateUserRoleOutput;
  createVideo: CreateVideoOutput;
  createVisit: CoreOutput;
  createVisitHistory: CreateVisitHistoryOutput;
  deleteAllNoticesOfMe: CoreOutput;
  deleteAttendance: DeleteAttendanceOutput;
  deleteCategoryEvaluation: DeleteCategoryEvaluationOutput;
  deleteExamCategoryBookmark: DeleteExamCategoryBookmarkOutput;
  deleteExamCategoryInvitation: DeleteExamCategoryInvitationOutput;
  deleteExamCategoryViewer: DeleteExamCategoryViewerOutput;
  deleteMockExam: DeleteMockExamOutput;
  deleteMockExamCategory: DeleteMockExamCategoryOutput;
  deleteMockExamQuestion: DeleteMockExamQuestionOutput;
  deleteMockExamQuestionComment: DeleteMockExamQuestionCommentOutput;
  deleteMockExamQuestionFeedback: DeleteMockExamQuestionFeedbackOutput;
  deleteNotice: DeleteNoticeOutput;
  deletePayment: DeletePaymentOutput;
  deletePost: DeletePostOutput;
  deletePostComment: DeletePostCommentOutput;
  deleteQuestionCardCategory: DeleteQuestionCardCategoryOutput;
  deleteQuestionCards: DeleteQuestionCardsOutput;
  deleteUser: CoreOutput;
  deleteUserRole: DeleteUserRoleOutput;
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
  login: LoginOutput;
  logout: CoreOutput;
  moveExamOrder: MoveExamOrderOutput;
  naverBlogViewMacro: NaverBlogViewMacroOutput;
  register: RegisterOutput;
  removeExamFromCategory: RemoveExamFromCategoryOutput;
  resetMyExamQuestionState: ResetMyExamQuestionStateOutput;
  resetMyQuestionBookmark: CoreOutput;
  resetRecentlyStudiedCategory: CoreOutput;
  restMyAllQuestionStates: CoreOutput;
  restoreUser: CoreOutput;
  revalidate: RevalidateOutput;
  saveExam: SaveExamOutput;
  sendFindPasswordMail: SendFindPasswordMailOutput;
  sendMessageToAlramChannelOfTelegram: SendMessageToAlramChannelOfTelegramOutput;
  sendMessageToTelegram: SendMessageToTelegramOutput;
  sendVerificationMail: SendVerificationMailOutput;
  syncRole: CoreOutput;
  toggleExamBookmark: ToggleExamBookmarkOutput;
  toggleExamCategorieBookmark: ToggleExamCategoryBookmarkOutput;
  updateAdBlockPermission: UpdateAdblockPermissionOutput;
  updateApprovedStateOfMockExamQuestion: UpdateApprovedStateOfMockExamQuestionOutput;
  updateCategoryEvaluation: UpdateCategoryEvaluationOutput;
  updateDiscountCode: UpdateDiscountCodeOutput;
  updateExamOrder: UpdateExamOrderOutput;
  updateExamViewerApproveState: UpdateExamViewerApproveStateOutput;
  updateMockExamQuestionFeedbackRecommendation: UpdateMockExamQuestionFeedbackRecommendationOutput;
  updatePayment: UpdatePaymentOutput;
  updateQuestionCard: UpdateQuestionCardOutput;
  updateQuestionCardCategory: UpdateQuestionCardCategoryOutput;
  updateQuestionStatesToCore: CoreOutput;
  upsertRecentlyStudiedCategory: UpsertRecentlyStudiedCategoryOutput;
  viewPost: ViewPostOutput;
};


export type MutationAcceptExamCategoryInvitationArgs = {
  input: AcceptExamCategoryInvitationInput;
};


export type MutationAddExamToCategoryArgs = {
  input: AddExamToCategoryInput;
};


export type MutationChangeClientRoleArgs = {
  input: ChangeClientRoleInput;
};


export type MutationChangeClientRoleAndCreatePaymentArgs = {
  input: ChangeClientRoleAndCreatePaymentInput;
};


export type MutationChangePasswordAfterVerifyingArgs = {
  input: ChangePasswordAfterVerifyingInput;
};


export type MutationCheckDiscountCodeArgs = {
  input: CheckDiscountCodeInput;
};


export type MutationCheckIfCategoryEvaluatedArgs = {
  input: CheckIfCategoryEvaluatedInput;
};


export type MutationCheckPasswordArgs = {
  input: CheckPasswordInput;
};


export type MutationCheckUserRoleArgs = {
  input: CheckUserRoleInput;
};


export type MutationCreateAttendanceArgs = {
  input: CreateAttendanceInput;
};


export type MutationCreateCategoryEvaluationArgs = {
  input: CreateCategoryEvaluationInput;
};


export type MutationCreateExamCategoryInvitationArgs = {
  input: CreateExamCategoryInvitationInput;
};


export type MutationCreateExamCategoryViewerArgs = {
  input: CreateExamCategoryViewerInput;
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


export type MutationCreateOrUpdateTodoArgs = {
  input: CreateOrUpdateTodoInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
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


export type MutationCreateUserRoleArgs = {
  input: CreateUserRoleInput;
};


export type MutationCreateVideoArgs = {
  input: CreateVideoInput;
};


export type MutationDeleteAttendanceArgs = {
  input: DeleteAttendanceInput;
};


export type MutationDeleteCategoryEvaluationArgs = {
  input: DeleteCategoryEvaluationInput;
};


export type MutationDeleteExamCategoryBookmarkArgs = {
  input: DeleteExamCategoryBookmarkInput;
};


export type MutationDeleteExamCategoryInvitationArgs = {
  input: DeleteExamCategoryInvitationInput;
};


export type MutationDeleteExamCategoryViewerArgs = {
  input: DeleteExamCategoryViewerInput;
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


export type MutationDeletePaymentArgs = {
  input: DeletePaymentInput;
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


export type MutationDeleteUserRoleArgs = {
  input: DeleteUserRoleInput;
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


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMoveExamOrderArgs = {
  input: MoveExamOrderInput;
};


export type MutationNaverBlogViewMacroArgs = {
  input: NaverBlogViewMacroInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveExamFromCategoryArgs = {
  input: RemoveExamFromCategoryInput;
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


export type MutationSaveExamArgs = {
  input: SaveExamInput;
};


export type MutationSendFindPasswordMailArgs = {
  input: SendFindPasswordMailInput;
};


export type MutationSendMessageToAlramChannelOfTelegramArgs = {
  input: SendMessageToAlramChannelOfTelegramInput;
};


export type MutationSendMessageToTelegramArgs = {
  input: SendMessageToTelegramInput;
};


export type MutationSendVerificationMailArgs = {
  input: SendVerificationMailInput;
};


export type MutationToggleExamBookmarkArgs = {
  input: ToggleExamBookmarkInput;
};


export type MutationToggleExamCategorieBookmarkArgs = {
  input: ToggleExamCategoryBookmarkInput;
};


export type MutationUpdateAdBlockPermissionArgs = {
  input: UpdateAdblockPermissionInput;
};


export type MutationUpdateApprovedStateOfMockExamQuestionArgs = {
  input: UpdateApprovedStateOfMockExamQuestionInput;
};


export type MutationUpdateCategoryEvaluationArgs = {
  input: UpdateCategoryEvaluationInput;
};


export type MutationUpdateDiscountCodeArgs = {
  input: UpdateDiscountCodeInput;
};


export type MutationUpdateExamOrderArgs = {
  input: UpdateExamOrderInput;
};


export type MutationUpdateExamViewerApproveStateArgs = {
  input: UpdateExamViewerApproveStateInput;
};


export type MutationUpdateMockExamQuestionFeedbackRecommendationArgs = {
  input: UpdateMockExamQuestionFeedbackRecommendationInput;
};


export type MutationUpdatePaymentArgs = {
  input: UpdatePaymentInput;
};


export type MutationUpdateQuestionCardArgs = {
  input: UpdateQuestionCardInput;
};


export type MutationUpdateQuestionCardCategoryArgs = {
  input: UpdateQuestionCardCategoryInput;
};


export type MutationUpsertRecentlyStudiedCategoryArgs = {
  input: UpsertRecentlyStudiedCategoryInput;
};


export type MutationViewPostArgs = {
  input: ViewPostInput;
};

export type MyRecommedationStatus = {
  __typename?: 'MyRecommedationStatus';
  isBad: Scalars['Boolean'];
  isGood: Scalars['Boolean'];
};

export type MyRecommedationStatusInputType = {
  isBad?: InputMaybe<Scalars['Boolean']>;
  isGood?: InputMaybe<Scalars['Boolean']>;
};

export type NaverBlogViewMacroInput = {
  blogUrl?: InputMaybe<Scalars['String']>;
};

export type NaverBlogViewMacroOutput = {
  __typename?: 'NaverBlogViewMacroOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
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

export type NoticeInputType = {
  confirm?: InputMaybe<Scalars['Boolean']>;
  content: Scalars['String'];
  link?: InputMaybe<Scalars['String']>;
  reservationTime?: InputMaybe<Scalars['DateTime']>;
  user: UserInputType;
};

export type ObjectiveContent = {
  __typename?: 'ObjectiveContent';
  content: Scalars['String'];
  url: Scalars['String'];
};

export type ObjectiveData = {
  __typename?: 'ObjectiveData';
  answer: Scalars['Float'];
  content: Array<ObjectiveContent>;
};

export type PartialMockExamQuestionInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  commentCount?: InputMaybe<Scalars['Float']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Float']>;
  isBookmarked?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  mockExam?: InputMaybe<MockExamInputType>;
  mockExamQuestionBookmark?: InputMaybe<Array<MockExamQuestionBookmarkInputType>>;
  mockExamQuestionComment?: InputMaybe<Array<MockExamQuestionCommentInputType>>;
  mockExamQuestionFeedback?: InputMaybe<Array<MockExamQuestionFeedbackInputType>>;
  multipleChoice?: InputMaybe<Array<MockExamQuestionMultipleChoiceInputType>>;
  myQuestionState?: InputMaybe<QuestionState>;
  number?: InputMaybe<Scalars['Float']>;
  objectiveData?: InputMaybe<MockExamQuestionObjectiveInputType>;
  orderId: Scalars['String'];
  question?: InputMaybe<Scalars['String']>;
  question_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  question_video?: InputMaybe<Array<MockExamQuestionVideoInputType>>;
  solution?: InputMaybe<Scalars['String']>;
  solution_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  state?: InputMaybe<Array<MockExamQuestionStateInputType>>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserInputType>;
};

export type Partner = {
  __typename?: 'Partner';
  created_at: Scalars['DateTime'];
  examCategory: Array<MockExamCategory>;
  id: Scalars['Float'];
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type PartnerInputType = {
  examCategory: Array<MockExamCategoryInputType>;
  name: Scalars['String'];
};

export type PayInputType = {
  orderId: Scalars['String'];
  price: Scalars['Float'];
  productName: Scalars['String'];
  receiptId: Scalars['String'];
  receiptUrl?: InputMaybe<Scalars['String']>;
  user: UserInputType;
};

export type Payment = {
  __typename?: 'Payment';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  orderId: Scalars['String'];
  price: Scalars['Float'];
  productName: Scalars['String'];
  receiptId: Scalars['String'];
  receiptUrl?: Maybe<Scalars['String']>;
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
  data?: Maybe<PostData>;
  id: Scalars['Float'];
  isHidden: Scalars['Boolean'];
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
  Data = 'DATA',
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

export type PostCommentInputType = {
  commentLike: Array<PostCommentLikeInputType>;
  content: Scalars['String'];
  likeState?: InputMaybe<Scalars['Boolean']>;
  likesCount?: InputMaybe<Scalars['Float']>;
  post: PostInputType;
  user: UserInputType;
};

export type PostCommentLike = {
  __typename?: 'PostCommentLike';
  comment: PostComment;
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type PostCommentLikeInputType = {
  comment: PostCommentInputType;
  user: UserInputType;
};

export type PostData = {
  __typename?: 'PostData';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  post: Array<Post>;
  postFile: Array<PostFile>;
  price: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type PostDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  filePage?: InputMaybe<Scalars['Float']>;
  fileUrl?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type PostDataInputType = {
  post: Array<PostInputType>;
  postFile: Array<PostFileInputType>;
  price: Scalars['Float'];
  user: UserInputType;
};

export type PostFile = {
  __typename?: 'PostFile';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  page: Scalars['Float'];
  postData: PostData;
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  user: User;
};

export type PostFileInputType = {
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  postData: PostDataInputType;
  url?: InputMaybe<Scalars['String']>;
  user: UserInputType;
};

export type PostInfo = {
  __typename?: 'PostInfo';
  content: Scalars['String'];
  link: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
};

export type PostInputType = {
  category: PostCategory;
  comment: Array<PostCommentInputType>;
  commentLikeState?: InputMaybe<Scalars['Boolean']>;
  commentLikesCount?: InputMaybe<Scalars['Float']>;
  commentsCount?: InputMaybe<Scalars['Float']>;
  content: Scalars['String'];
  data?: InputMaybe<PostDataInputType>;
  isHidden?: InputMaybe<Scalars['Boolean']>;
  like: Array<PostLikeInputType>;
  likeState?: InputMaybe<Scalars['Boolean']>;
  likesCount?: InputMaybe<Scalars['Float']>;
  priority?: InputMaybe<Scalars['Float']>;
  title: Scalars['String'];
  user: UserInputType;
  view?: InputMaybe<Scalars['Float']>;
};

export type PostLike = {
  __typename?: 'PostLike';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  post: Post;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type PostLikeInputType = {
  post: PostInputType;
  user: UserInputType;
};

/** Order by criteria for posts */
export enum PostOrderType {
  CreatedAt = 'createdAt',
  Like = 'like'
}

export type Query = {
  __typename?: 'Query';
  findMyExamHistory: FindMyExamHistoryOutput;
  getBuyers: GetBuyersOutput;
  getCategoryEvaluation: GetCategoryEvaluationOutput;
  getExamCategories: GetExamCategoriesOutput;
  getExamCategoryInvitations: GetExamCategoryInvitationsOutput;
  getExamCategoryLearningProgress: GetExamCategoryLearningProgressOutput;
  getExamCategorySubscribers: GetExamCategorySubscribersOutput;
  getExamCategoryViewers: GetExamCategoryViewrsOutput;
  getExamTitleWithFeedback: GetExamTitleWithFeedbackOutput;
  getFeedbacksByRecommendationCount: GetFeedbacksByRecommendationCountOutput;
  getFeedbacksWithFilter: GetFeedbacksWithFilterOutput;
  getInvitedExams: GetInvitedExamsOutput;
  getMyAllExamCategoriesLearningProgress: GetMyAllExamCategoriesLearningProgressOutput;
  getMyBlogPostRank: GetMyBlogPostRankOutput;
  getMyBookmarkedExamCategories: GetMyBookmarkedExamCategoriesOutput;
  getMyBookmarkedExams: GetMyBookmarkedExamsOutput;
  getMyExamCategories: GetMyExamCategoriesOutput;
  getMyExams: GetMyExamsOutput;
  getMyPayments: GetMyPaymentsOutput;
  getPartners: GetPartnersOutput;
  getRoleCount: GetRoleCountOutput;
  getRolesCount: GetRolesCountOutput;
  getTodayAttendance: GetTodayAttendanceOutput;
  getTodo: GetTodoOutput;
  getUserByNicknameOrEmail: GetUserByNicknameOrEmailOutput;
  me: MeOutput;
  readAllMockExam: ReadAllMockExamsOutput;
  readAllMockExamCategories: ReadAllMockExamCategoriesOutput;
  readAllMockExamQuestion: ReadAllMockExamQuestionOutput;
  readAllMockExamQuestionFeedback: ReadAllMockExamQuestionFeedbackOutput;
  readAllQuestions: ReadAllQuestionsOutput;
  readExamTitleAndIdByQuestionComment: ReadExamTitleAndIdByQuestionCommentOutput;
  readExamTitleAndIdByQuestionState: ReadExamTitleAndIdByQuestionStateOutput;
  readExamTitleAndIdOfBookmarkedQuestion: ReadExamTitleAndIdOfBookmarkedQuestionOutput;
  readMockExam: ReadMockExamOutput;
  readMockExamCategories: ReadMockExamCategoriesOutput;
  readMockExamCategoryByCategoryId: ReadMockExamCategoryByCategoryIdOutput;
  readMockExamCategoryByExamId: ReadMockExamCategoryByExamIdOutput;
  readMockExamCategoryIds: ReadMockExamCategoryIdsOutput;
  readMockExamCategoryNames: ReadMockExamCategoryNamesOutput;
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
  readQuestionsByExamIds: ReadQuestionsByExamIdsOutput;
  readVisitCount: ReadVisitCountOutput;
  readVisitHistory: ReadVisitHistoryOutput;
  searchMockExam: SearchMockExamOutput;
  searchMockExamCategories: SearchMockExamCategoriesOutput;
  searchQuestionsByKeyword: SearchQuestionsByKeywordOutput;
  searchUser: SearchUserOutput;
  sync: CoreOutput;
  syncPrice: CoreOutput;
  test: Array<Scalars['String']>;
  userProfile: UserProfileOutput;
};


export type QueryFindMyExamHistoryArgs = {
  input: FindMyExamHistoryInput;
};


export type QueryGetCategoryEvaluationArgs = {
  input: GetCategoryEvaluationInput;
};


export type QueryGetExamCategoriesArgs = {
  input: GetExamCategoriesInput;
};


export type QueryGetExamCategoryLearningProgressArgs = {
  input: GetExamCategoryLearningProgressInput;
};


export type QueryGetExamCategorySubscribersArgs = {
  input: GetExamCategorySubscribersInput;
};


export type QueryGetExamCategoryViewersArgs = {
  input: GetExamCategoryViewrsInput;
};


export type QueryGetFeedbacksByRecommendationCountArgs = {
  input: GetFeedbacksByRecommendationCountInput;
};


export type QueryGetFeedbacksWithFilterArgs = {
  input: GetFeedbacksWithFilterInput;
};


export type QueryGetMyBlogPostRankArgs = {
  input: GetMyBlogPostRankInput;
};


export type QueryGetMyExamsArgs = {
  input: GetMyExamsInput;
};


export type QueryGetRoleCountArgs = {
  input: GetRoleCountInput;
};


export type QueryGetRolesCountArgs = {
  input: GetRolesCountInput;
};


export type QueryGetTodoArgs = {
  input: GetTodoInput;
};


export type QueryGetUserByNicknameOrEmailArgs = {
  input: GetUserByNicknameOrEmailInput;
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


export type QueryReadMockExamCategoriesArgs = {
  input: ReadMockExamCategoriesInput;
};


export type QueryReadMockExamCategoryByCategoryIdArgs = {
  input: ReadMockExamCategoryByCategoryIdInput;
};


export type QueryReadMockExamCategoryByExamIdArgs = {
  input: ReadMockExamCategoryByExamIdInput;
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


export type QueryReadMyMockExamCategoriesArgs = {
  input?: InputMaybe<ReadMyMockExamCategoriesInput>;
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


export type QueryReadQuestionsByExamIdsArgs = {
  input: ReadQuestionsByExamIdsInput;
};


export type QuerySearchMockExamArgs = {
  input: SearchMockExamInput;
};


export type QuerySearchMockExamCategoriesArgs = {
  input: SearchMockExamCategoriesInput;
};


export type QuerySearchQuestionsByKeywordArgs = {
  input: SearchQuestionsByKeywordInput;
};


export type QuerySearchUserArgs = {
  input: SearchUserInput;
};


export type QueryUserProfileArgs = {
  input: UserProfileInput;
};

export type QuestionCard = {
  __typename?: 'QuestionCard';
  category?: Maybe<QuestionCardCategory>;
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

export type QuestionCardCategoryInputType = {
  name: Scalars['String'];
  questionCard: QuestionCardInputType;
  user: UserInputType;
};

export type QuestionCardInputType = {
  category?: InputMaybe<QuestionCardCategoryInputType>;
  question: Scalars['String'];
  solution: Scalars['String'];
  user: UserInputType;
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
  partnerId?: InputMaybe<Scalars['Float']>;
  source?: InputMaybe<ExamSource>;
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

export type ReadMockExamCategoriesInput = {
  source?: InputMaybe<ExamSource>;
};

export type ReadMockExamCategoriesOutput = {
  __typename?: 'ReadMockExamCategoriesOutput';
  categories: Array<MockExamCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamCategoryByCategoryIdInput = {
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ReadMockExamCategoryByCategoryIdOutput = {
  __typename?: 'ReadMockExamCategoryByCategoryIdOutput';
  category?: Maybe<MockExamCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamCategoryByExamIdInput = {
  examId: Scalars['Float'];
};

export type ReadMockExamCategoryByExamIdOutput = {
  __typename?: 'ReadMockExamCategoryByExamIdOutput';
  category?: Maybe<MockExamCategory>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamCategoryIdsOutput = {
  __typename?: 'ReadMockExamCategoryIdsOutput';
  error?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Scalars['Float']>>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamCategoryNamesOutput = {
  __typename?: 'ReadMockExamCategoryNamesOutput';
  error?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Scalars['String']>>;
  ok: Scalars['Boolean'];
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
  isPremium: Scalars['Boolean'];
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
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<ExamSource>;
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

export type ReadMyMockExamCategoriesInput = {
  type?: InputMaybe<Scalars['String']>;
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
  order?: InputMaybe<PostOrderType>;
  page: Scalars['Float'];
  search?: InputMaybe<Scalars['String']>;
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

export type ReadQuestionsByExamIdsInput = {
  bookmarked?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['Float']>>;
  limit?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<Scalars['String']>;
  states?: InputMaybe<Array<QuestionState>>;
};

export type ReadQuestionsByExamIdsOutput = {
  __typename?: 'ReadQuestionsByExamIdsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questions: Array<MockExamQuestion>;
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

export type RecommendationCountInputType = {
  bad?: InputMaybe<Scalars['Float']>;
  good?: InputMaybe<Scalars['Float']>;
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

export type RemoveExamFromCategoryInput = {
  categoryId: Scalars['Float'];
  examId: Scalars['Float'];
};

export type RemoveExamFromCategoryOutput = {
  __typename?: 'RemoveExamFromCategoryOutput';
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

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mockExamCategories: Array<MockExamCategory>;
  name: Scalars['String'];
  seller?: Maybe<Seller>;
  updated_at: Scalars['DateTime'];
  userRoles: Array<UserAndRole>;
};

export type RoleInputType = {
  mockExamCategories: Array<MockExamCategoryInputType>;
  name: Scalars['String'];
  seller?: InputMaybe<SellerInputType>;
  userRoles: Array<UserRoleInputType>;
};

export type SaveExamInput = {
  categoryId?: InputMaybe<Scalars['Float']>;
  questionOrderIds: Array<Scalars['String']>;
  questions?: InputMaybe<Array<PartialMockExamQuestionInput>>;
  title: Scalars['String'];
  uuid: Scalars['String'];
};

export type SaveExamOutput = {
  __typename?: 'SaveExamOutput';
  error?: Maybe<Scalars['String']>;
  examId?: Maybe<Scalars['Float']>;
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

export type SearchMockExamCategoriesInput = {
  isPublic: Scalars['Boolean'];
  keyword: Scalars['String'];
  limit: Scalars['Float'];
  page: Scalars['Float'];
};

export type SearchMockExamCategoriesOutput = {
  __typename?: 'SearchMockExamCategoriesOutput';
  categories?: Maybe<Array<MockExamCategory>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
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

export type SearchQuestionsByKeywordInput = {
  keyword: Scalars['String'];
};

export type SearchQuestionsByKeywordOutput = {
  __typename?: 'SearchQuestionsByKeywordOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questions?: Maybe<Array<MockExamQuestion>>;
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

export type Seller = {
  __typename?: 'Seller';
  created_at: Scalars['DateTime'];
  examCategories: Array<MockExamCategory>;
  id: Scalars['Float'];
  roles: Array<Role>;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type SellerInputType = {
  examCategories: Array<MockExamCategoryInputType>;
  roles: Array<RoleInputType>;
  user: UserInputType;
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

export type Todo = {
  __typename?: 'Todo';
  created_at: Scalars['DateTime'];
  dateString: Scalars['String'];
  id: Scalars['Float'];
  todoList: Array<TodoList>;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type TodoInputType = {
  dateString: Scalars['String'];
  todoList?: InputMaybe<Array<TodoListInputType>>;
  user: UserInputType;
};

export type TodoList = {
  __typename?: 'TodoList';
  isDone: Scalars['Boolean'];
  todo: Scalars['String'];
};

export type TodoListInputType = {
  isDone: Scalars['Boolean'];
  todo: Scalars['String'];
};

export type ToggleExamBookmarkInput = {
  examId: Scalars['Float'];
};

export type ToggleExamBookmarkOutput = {
  __typename?: 'ToggleExamBookmarkOutput';
  error?: Maybe<Scalars['String']>;
  isBookmarked?: Maybe<Scalars['Boolean']>;
  ok: Scalars['Boolean'];
};

export type ToggleExamCategoryBookmarkInput = {
  categoryId: Scalars['Float'];
};

export type ToggleExamCategoryBookmarkOutput = {
  __typename?: 'ToggleExamCategoryBookmarkOutput';
  error?: Maybe<Scalars['String']>;
  isBookmarked?: Maybe<Scalars['Boolean']>;
  ok: Scalars['Boolean'];
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

export type UpdateCategoryEvaluationInput = {
  feedback?: InputMaybe<Scalars['String']>;
  id: Scalars['Float'];
  isSecret?: InputMaybe<Scalars['Boolean']>;
  score?: InputMaybe<Scalars['Float']>;
};

export type UpdateCategoryEvaluationOutput = {
  __typename?: 'UpdateCategoryEvaluationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateDiscountCodeInput = {
  code: Scalars['String'];
  status: DiscountCodeStatus;
};

export type UpdateDiscountCodeOutput = {
  __typename?: 'UpdateDiscountCodeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateExamOrderInput = {
  examOrders: Array<ExamOrder>;
};

export type UpdateExamOrderOutput = {
  __typename?: 'UpdateExamOrderOutput';
  error?: Maybe<Scalars['String']>;
  mockExams?: Maybe<Array<MockExam>>;
  ok: Scalars['Boolean'];
};

export type UpdateExamViewerApproveStateInput = {
  examViewerId: Scalars['Float'];
};

export type UpdateExamViewerApproveStateOutput = {
  __typename?: 'UpdateExamViewerApproveStateOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
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

export type UpdatePaymentInput = {
  paymentId: Scalars['Float'];
  receiptId: Scalars['String'];
};

export type UpdatePaymentOutput = {
  __typename?: 'UpdatePaymentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
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

export type UpsertRecentlyStudiedCategoryInput = {
  categoryId: Scalars['Float'];
};

export type UpsertRecentlyStudiedCategoryOutput = {
  __typename?: 'UpsertRecentlyStudiedCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  LoginType: LoginType;
  attendances?: Maybe<Array<Attendance>>;
  categoryEvaluations: Array<CategoryEvaluation>;
  created_at: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  discountCode?: Maybe<Array<DiscountCode>>;
  email: Scalars['String'];
  examBookmarks: Array<MockExamBookmark>;
  examCategoryBookmarks: Array<ExamCategoryBookmark>;
  examCategoryInvitations: Array<ExamCategoryInvitation>;
  examCoAuthor?: Maybe<Array<ExamCoAuthor>>;
  examLikes: Array<ExamLike>;
  examViewer?: Maybe<Array<ExamViewer>>;
  feedback: Array<Feedback>;
  feedbackRecommendation: Array<MockExamQuestionFeedbackRecommendation>;
  id: Scalars['Float'];
  isAllowAdblock: Scalars['Boolean'];
  lastLogInIp: Scalars['String'];
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
  payments: Array<Payment>;
  post?: Maybe<Array<Post>>;
  postComment: Array<PostComment>;
  postData: Array<PostData>;
  postFile: Array<PostFile>;
  profileImg: Scalars['String'];
  questionCardCategorys: Array<QuestionCardCategory>;
  questionCards: Array<QuestionCard>;
  questionFeedback: Array<MockExamQuestionFeedback>;
  recentlyStudiedCategory: Array<Scalars['Float']>;
  role: UserRole;
  seller?: Maybe<Seller>;
  solvedProblemCount?: Maybe<Scalars['Float']>;
  todos: Array<Todo>;
  updated_at: Scalars['DateTime'];
  usedFreeTrial: Scalars['Boolean'];
  userRoles: Array<UserAndRole>;
  visit: Array<Visit>;
};

export type UserAndRole = {
  __typename?: 'UserAndRole';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  price: Scalars['Float'];
  role: Role;
  updated_at: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type UserInputType = {
  LoginType: LoginType;
  attendances?: InputMaybe<Array<AttendanceInputTyper>>;
  categoryEvaluations: Array<CategoryEvaluationInputType>;
  deletedAt: Scalars['DateTime'];
  discountCode?: InputMaybe<Array<Discountcode>>;
  email: Scalars['String'];
  examBookmarks: Array<MockExamBookmarkInputType>;
  examCategoryBookmarks: Array<ExamCategoryBookmarkInputType>;
  examCategoryInvitations: Array<ExamCategoryInvitationInputType>;
  examCoAuthor?: InputMaybe<Array<ExamCoAuthorInputType>>;
  examLikes: Array<ExamLikeInputType>;
  examViewer?: InputMaybe<Array<ExamViewerInput>>;
  feedback: Array<FeedbackInputType>;
  feedbackRecommendation: Array<MockExamQuestionFeedbackRecommendationInputType>;
  isAllowAdblock: Scalars['Boolean'];
  lastLogInIp?: InputMaybe<Scalars['String']>;
  mockExam: Array<MockExamInputType>;
  mockExamCategory: Array<MockExamCategoryInputType>;
  mockExamHistory: Array<MockExamHistoryInputType>;
  mockExamQuestion: Array<MockExamQuestionInputType>;
  mockExamQuestionBookmark: Array<MockExamQuestionBookmarkInputType>;
  mockExamQuestionComment: Array<MockExamQuestionCommentInputType>;
  mockExamQuestionCommentLike: Array<MockExamQuestionCommentLikeInputType>;
  mockExamQuestionState: Array<MockExamQuestionStateInputType>;
  nickname: Scalars['String'];
  notice?: InputMaybe<Array<NoticeInputType>>;
  password: Scalars['String'];
  payments: Array<PayInputType>;
  post?: InputMaybe<Array<PostInputType>>;
  postComment: Array<PostCommentInputType>;
  postData: Array<PostDataInputType>;
  postFile: Array<PostFileInputType>;
  profileImg?: InputMaybe<Scalars['String']>;
  questionCardCategorys: Array<QuestionCardCategoryInputType>;
  questionCards: Array<QuestionCardInputType>;
  questionFeedback: Array<MockExamQuestionFeedbackInputType>;
  recentlyStudiedCategory?: InputMaybe<Array<Scalars['Float']>>;
  role: UserRole;
  seller?: InputMaybe<SellerInputType>;
  solvedProblemCount?: InputMaybe<Scalars['Float']>;
  todos: Array<TodoInputType>;
  usedFreeTrial: Scalars['Boolean'];
  userRoles: Array<UserRoleInputType>;
  visit: Array<VisitInputType>;
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
  ClientBasic = 'CLIENT_BASIC',
  ClientSafePremium = 'CLIENT_SAFE_PREMIUM',
  Partner = 'PARTNER',
  PaymentTest = 'PAYMENT_TEST',
  Seller = 'SELLER'
}

export type UserRoleInputType = {
  price?: InputMaybe<Scalars['Float']>;
  role: RoleInputType;
  user?: InputMaybe<UserInputType>;
};

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

export type VisitInputType = {
  user: UserInputType;
};

export type ZepComment = {
  __typename?: 'ZepComment';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  zepPost: ZepPost;
  zepUser: ZepUser;
};

export type ZepMapUserCount = {
  __typename?: 'ZepMapUserCount';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mapId: Scalars['String'];
  updated_at: Scalars['DateTime'];
  userCount: Scalars['Float'];
};

export type ZepPost = {
  __typename?: 'ZepPost';
  category: ZepPostCategory;
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  zepComment: Array<ZepComment>;
  zepUser: ZepUser;
};

export enum ZepPostCategory {
  Algorism = 'ALGORISM',
  Feedback = 'FEEDBACK',
  Free = 'FREE',
  Notice = 'NOTICE',
  Project = 'PROJECT',
  Study = 'STUDY'
}

export type ZepStudyTime = {
  __typename?: 'ZepStudyTime';
  created_at: Scalars['DateTime'];
  grass_count: Scalars['Float'];
  id: Scalars['Float'];
  study_time: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  zepUser: ZepUser;
};

export type ZepUser = {
  __typename?: 'ZepUser';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  nickname: Scalars['String'];
  studyTimes: Array<ZepStudyTime>;
  updated_at: Scalars['DateTime'];
  zepComment: Array<ZepComment>;
  zepPost: Array<ZepPost>;
  zep_id: Scalars['String'];
};

export type SendMessageToTelegramInput = {
  channelId: Scalars['Float'];
  message: Scalars['String'];
};

export type SendMessageToTelegramOutput = {
  __typename?: 'sendMessageToTelegramOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};
