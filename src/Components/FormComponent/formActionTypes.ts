type AddFieldAction = {
  type: "ADD_FIELD";
  payload: {
    kind: string;
    name: string;
  };
};

type RemoveFieldAction = {
  type: "REMOVE_FIELD";
  payload: {
    id: number;
  };
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  payload: {
    value: string;
  };
};

type UpdateOptionAction = {
  type: "UPDATE_FIELD_OPTIONS";
  payload: {
    value: string;
    id: string;
  };
};

type UpdateNameAction = {
  type: "UPDATE_NAME";
  payload: {
    value: string;
    id: string;
  };
};

type FetchAction = {
  type: "FETCH";
  payload: {
    id: string;
  };
};

export type FormDataAction =
  | AddFieldAction
  | RemoveFieldAction
  | UpdateTitleAction
  | UpdateOptionAction
  | UpdateNameAction;
// | FetchAction;
