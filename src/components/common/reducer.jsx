export const initialState = { favoriteGames: [], user: null, prevUser : null };

const reducer = (state, action) => {
  //console.log(state, action);
  switch (action.type) {
    case "SET_PREVUSER":
      return { ...state, prevUser: action.user };
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_LIST":
      return { ...state, favoriteGames: action.item };
    case "ADD_TO_LIST":
      // Logic for adding item to favoriteGames
      console.log('from reducer', state.user.email)
      localStorage.setItem(
        `userGames${action.user}`,
        JSON.stringify([...state.favoriteGames, action.item])
      );

      return { ...state, favoriteGames: [...state.favoriteGames, action.item] };
    case "REMOVE_FROM_LIST":
      // Logic for removing item from favoriteGames
      let newFavoriteGames = [...state.favoriteGames];
      const index = state.favoriteGames.findIndex(
        (Game) => Game.id === action.id
      );

      if (index >= 0) {
        // Item exist in favoriteGames, remove it...
        newFavoriteGames.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id:${action.id}) as its not in favorite games list`
        );
      }
      console.log('from reducer', state.user.email)
      localStorage.setItem(
        `userGames${action.user}`,
        JSON.stringify(newFavoriteGames)
      );

      return { ...state, favoriteGames: newFavoriteGames };
    default:
      return state;
  }
};

export default reducer;
