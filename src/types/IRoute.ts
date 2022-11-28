type NestedStackParams = {
  screen: string;
  initial?: boolean;
};

export type RootStackParamList = {
  ProfileStack: NestedStackParams;
  GroupStack: NestedStackParams;
};
