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

export type CreateMockExamCategoryInput = {
  name: Scalars['String'];
};

export type CreateMockExamCategoryOutput = {
  __typename?: 'CreateMockExamCategoryOutput';
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
  ok: Scalars['Boolean'];
};

export type CreateMockExamQuestionFeedbackInput = {
  content: Scalars['String'];
  questionId: Scalars['Float'];
};

export type CreateMockExamQuestionFeedbackOutput = {
  __typename?: 'CreateMockExamQuestionFeedbackOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMockExamQuestionInput = {
  mockExamId: Scalars['Float'];
  number: Scalars['Float'];
  question: Scalars['String'];
  question_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
  solution: Scalars['String'];
  solution_img?: InputMaybe<Array<MockExamQuestionImageInputType>>;
};

export type CreateMockExamQuestionOutput = {
  __typename?: 'CreateMockExamQuestionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrUpdateMockExamQuestionStateInput = {
  questionId: Scalars['Float'];
  state: QuestionState;
};

export type CreateOrUpdateMockExamQuestionStateOutput = {
  __typename?: 'CreateOrUpdateMockExamQuestionStateOutput';
  currentState: QuestionState;
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
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

export type EditMockExamCategoryInput = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type EditMockExamInput = {
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type EditMockExamOutput = {
  __typename?: 'EditMockExamOutput';
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

export type EmailVerificationInput = {
  code: Scalars['String'];
};

export type EmailVerificationOutput = {
  __typename?: 'EmailVerificationOutput';
  email: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ExamTitleAndId = {
  __typename?: 'ExamTitleAndId';
  id: Scalars['Float'];
  title: Scalars['String'];
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

export type MockExam = {
  __typename?: 'MockExam';
  approved: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mockExamCategory: MockExamCategory;
  mockExamQuestion: Array<MockExamQuestion>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type MockExamCategory = {
  __typename?: 'MockExamCategory';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mockExam: Array<MockExam>;
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type MockExamImageType = {
  __typename?: 'MockExamImageType';
  name: Scalars['String'];
  uid: Scalars['String'];
  url: Scalars['String'];
};

export type MockExamQuestion = {
  __typename?: 'MockExamQuestion';
  approved: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mockExam: MockExam;
  mockExamQuestionFeedback: Array<MockExamQuestionFeedback>;
  number: Scalars['Float'];
  question: Scalars['String'];
  question_img?: Maybe<Array<MockExamImageType>>;
  solution: Scalars['String'];
  solution_img?: Maybe<Array<MockExamImageType>>;
  state: Array<MockExamQuestionState>;
  updated_at: Scalars['DateTime'];
};

export type MockExamQuestionFeedback = {
  __typename?: 'MockExamQuestionFeedback';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  mockExamQuestion: MockExamQuestion;
  updated_at: Scalars['DateTime'];
};

export type MockExamQuestionImageInputType = {
  name: Scalars['String'];
  uid: Scalars['String'];
  url: Scalars['String'];
};

export type MockExamQuestionState = {
  __typename?: 'MockExamQuestionState';
  created_at: Scalars['DateTime'];
  id: Scalars['Float'];
  question: MockExamQuestion;
  state: QuestionState;
  updated_at: Scalars['DateTime'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMockExam: CreateMockExamOutput;
  createMockExamCategory: CreateMockExamCategoryOutput;
  createMockExamQuestion: CreateMockExamQuestionOutput;
  createMockExamQuestionFeedback: CreateMockExamQuestionFeedbackOutput;
  createOrUpdateMockExamQuestionState: CreateOrUpdateMockExamQuestionStateOutput;
  deleteMockExam: DeleteMockExamOutput;
  deleteMockExamCategory: DeleteMockExamCategoryOutput;
  deleteMockExamQuestion: DeleteMockExamQuestionOutput;
  deleteMockExamQuestionFeedback: DeleteMockExamQuestionFeedbackOutput;
  editMockExam: EditMockExamOutput;
  editMockExamCategory: DeleteMockExamCategoryOutput;
  editMockExamQuestion: EditMockExamQuestionOutput;
  editMockExamQuestionFeedback: EditMockExamQuestionFeedbackOutput;
  emailVerification: EmailVerificationOutput;
  login: LoginOutput;
  register: RegisterOutput;
  sendVerificationMail: SendVerificationMailOutput;
  updateApprovedStateOfMockExamQuestion: UpdateApprovedStateOfMockExamQuestionOutput;
};


export type MutationCreateMockExamArgs = {
  input: CreateMockExamInput;
};


export type MutationCreateMockExamCategoryArgs = {
  input: CreateMockExamCategoryInput;
};


export type MutationCreateMockExamQuestionArgs = {
  input: CreateMockExamQuestionInput;
};


export type MutationCreateMockExamQuestionFeedbackArgs = {
  input: CreateMockExamQuestionFeedbackInput;
};


export type MutationCreateOrUpdateMockExamQuestionStateArgs = {
  input: CreateOrUpdateMockExamQuestionStateInput;
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


export type MutationDeleteMockExamQuestionFeedbackArgs = {
  input: DeleteMockExamQuestionFeedbackInput;
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


export type MutationEditMockExamQuestionFeedbackArgs = {
  input: EditMockExamQuestionFeedbackInput;
};


export type MutationEmailVerificationArgs = {
  input: EmailVerificationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSendVerificationMailArgs = {
  input: SendVerificationMailInput;
};


export type MutationUpdateApprovedStateOfMockExamQuestionArgs = {
  input: UpdateApprovedStateOfMockExamQuestionInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  readAllMockExam: ReadAllMockExamsOutput;
  readAllMockExamCategories: ReadAllMockExamCategoriesOutput;
  readAllMockExamQuestion: ReadAllMockExamQuestionOutput;
  readAllMockExamQuestionFeedback: ReadAllMockExamQuestionFeedbackOutput;
  readMockExam: ReadMockExamOutput;
  readMockExamQuestion: ReadMockExamQuestionOutput;
  readMockExamQuestionNumbers: ReadMockExamQuestionNumbersOutput;
  readMockExamQuestionsByMockExamId: ReadMockExamQuestionsByMockExamIdOutput;
  readMockExamQuestionsByState: ReadMockExamQuestionsByStateOutput;
  readMockExamTitlesByCateory: ReadMockExamTitlesByCateoryOutput;
  searchMockExam: SearchMockExamOutput;
  userProfile: UserProfileOutput;
};


export type QueryReadAllMockExamArgs = {
  input: ReadAllMockExamsInput;
};


export type QueryReadMockExamArgs = {
  input: ReadMockExamInput;
};


export type QueryReadMockExamQuestionArgs = {
  input: ReadMockExamQuestionInput;
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


export type QuerySearchMockExamArgs = {
  input: SearchMockExamInput;
};


export type QueryUserProfileArgs = {
  input: UserProfileInput;
};

export enum QuestionState {
  Core = 'CORE',
  High = 'HIGH',
  Middle = 'MIDDLE',
  Row = 'ROW'
}

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
  category?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
};

export type ReadAllMockExamsOutput = {
  __typename?: 'ReadAllMockExamsOutput';
  error?: Maybe<Scalars['String']>;
  mockExams: Array<MockExam>;
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

export type ReadMockExamQuestionInput = {
  examId: Scalars['Float'];
  questionId: Scalars['Float'];
};

export type ReadMockExamQuestionNumbersInput = {
  mockExamId: Scalars['Float'];
};

export type ReadMockExamQuestionNumbersOutput = {
  __typename?: 'ReadMockExamQuestionNumbersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questionNumbers: Array<Scalars['Float']>;
};

export type ReadMockExamQuestionOutput = {
  __typename?: 'ReadMockExamQuestionOutput';
  error?: Maybe<Scalars['String']>;
  mockExamQusetion: MockExamQuestion;
  ok: Scalars['Boolean'];
  state?: Maybe<QuestionState>;
};

export type ReadMockExamQuestionsByMockExamIdInput = {
  id: Scalars['Float'];
};

export type ReadMockExamQuestionsByMockExamIdOutput = {
  __typename?: 'ReadMockExamQuestionsByMockExamIdOutput';
  count: Scalars['Float'];
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  questions: Array<MockExamQuestion>;
};

export type ReadMockExamQuestionsByStateInput = {
  examId: Scalars['Float'];
  state: QuestionState;
};

export type ReadMockExamQuestionsByStateOutput = {
  __typename?: 'ReadMockExamQuestionsByStateOutput';
  error?: Maybe<Scalars['String']>;
  mockExamQusetions: Array<MockExamQuestion>;
  ok: Scalars['Boolean'];
};

export type ReadMockExamTitlesByCateoryInput = {
  name: Scalars['String'];
};

export type ReadMockExamTitlesByCateoryOutput = {
  __typename?: 'ReadMockExamTitlesByCateoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  titles: Array<ExamTitleAndId>;
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

export type SendVerificationMailInput = {
  email: Scalars['String'];
};

export type SendVerificationMailOutput = {
  __typename?: 'SendVerificationMailOutput';
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

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  mockExamQuestionState: Array<MockExamQuestionState>;
  nickname: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  updated_at: Scalars['DateTime'];
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
  Client = 'CLIENT'
}
