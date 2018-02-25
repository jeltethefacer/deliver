const word = (state = "testing ok", action) => {
  switch (action.type) {
    case "CHANGE_WORD":
      return action.word;
    default:
      return state;
  }
};

export default word;
