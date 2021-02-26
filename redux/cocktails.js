import axios from "axios";

// INITIAL STATE

const initialState = {
  cocktails: [],
  loading: false,
  ingredient: "",
  error: false,
};

// TYPES

const COCKTAIL_FETCH_START = "COCKTAIL_FETCH_START";
const COCKTAIL_FETCH_SUCCESS = "COCKTAIL_FETCH_SUCCESS";
const COCKTAIL_FETCH_FAIL = "COCKTAIL_FETCH_FAIL";

// ACTION CREATORS

const cocktailFetchStart = (str) => ({
  type: COCKTAIL_FETCH_START,
  payload: str,
});

const cocktailFetchFail = () => ({
  type: COCKTAIL_FETCH_FAIL,
});

const cocktailFetchSuccess = (cocktails) => ({
  type: COCKTAIL_FETCH_SUCCESS,
  payload: cocktails,
});

export const getCocktails = (str) => async (dispatch, getState) => {
  dispatch(cocktailFetchStart(str));
  try {
    const response = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${
        getState().cocktailState.ingredient
      }`
    );
    // console.log(response.data);
    dispatch(cocktailFetchSuccess(response.data.drinks));
  } catch (error) {
    dispatch(cocktailFetchFail());
  }
};

// REDUCER

const cocktailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COCKTAIL_FETCH_START:
      return { ...state, ingredient: payload, loading: true, error: false };
    case COCKTAIL_FETCH_SUCCESS:
      return { ...state, loading: false, error: false, cocktails: payload };
    case COCKTAIL_FETCH_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default cocktailReducer;
