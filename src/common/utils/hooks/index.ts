export type THookReducerLike<S, D, A, I = void> = (input: I) => {
  state: S;
  dispatch: D;
  actions: A;
};
