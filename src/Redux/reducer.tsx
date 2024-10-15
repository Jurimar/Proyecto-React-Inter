interface DataState {
    data: Array<{ id: number; name: string }>;
    loading: boolean;
    error: string | null;
    events: { id: string; name: string }[]; // Add the events property
  }

  const initialState: DataState = {
    data: [],
    loading: false,
    error: null,
    events: [], // Add the events property
  };
  
  interface Action {
    type: string;
    payload?: Array<{ id: number; name: string }>;
    error?: null;
  }

  export function dataReducer(state = initialState, action: Action): DataState {
    switch (action.type) {
      case 'FETCH_DATA_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload ?? [],
        };
      case 'FETCH_DATA_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error ?? null,
        };
      case 'RESET_DATA':
        return {
          ...state,
          data: [],
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  }