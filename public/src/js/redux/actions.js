import fetch from 'isomorphic-fetch';

/* ---------------- Fetch Game Actions ---------------- */

const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';

function fetchGameSuccess(game) {
  return {
    game,
    type: FETCH_GAME_SUCCESS,
  };
}

const FETCH_GAME_ERROR = 'FETCH_GAME_ERROR';

function fetchGameError(error) {
  return {
    error,
    type: FETCH_GAME_ERROR,
  };
}

// sends a fetch request with an accessCode to get the correct game back
function fetchGame(accessCode) {
  return (dispatch) => {
    const url = `/game/${accessCode}`;
    return fetch(url).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then((game) => {
      return dispatch(fetchGameSuccess(game));
    }).catch((err) => {
      return dispatch(fetchGameError(err));
    });
  };
}

/* ---------------- Add Chip Actions ---------------- */

const ADD_CHIP_SUCCESS = 'ADD_CHIP_SUCCESS';

function addChipSuccess(game) {
  return {
    game,
    type: ADD_CHIP_SUCCESS,
  };
}

const ADD_CHIP_ERROR = 'ADD_CHIP_ERROR';

function addChipError(err) {
  return {
    type: ADD_CHIP_ERROR,
    error: err,
  };
}

// Put requests to make changes to the current board in the backend
function addChip(game) {
  return (dispatch) => {
    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    };

    const url = '/game';
    return fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then((gameObj) => {
      return dispatch(addChipSuccess(gameObj));
    }).catch((err) => {
      return dispatch(addChipError(err));
    });
  };
}

/* ---------------- Reset Game Actions ---------------- */

const RESET_GAME_SUCCESS = 'RESET_GAME_SUCCESS';

function resetGameSuccess(game) {
  return {
    game,
    type: RESET_GAME_SUCCESS,
  };
}

const RESET_GAME_ERROR = 'RESET_GAME_ERROR';

function resetGameError(err) {
  return {
    type: RESET_GAME_ERROR,
    error: err,
  };
}

// Put request to reset the board in the db to all 0's
function resetGame(turn, accessCode) {
  return (dispatch) => {
    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(turn),
    };

    const url = `/game/${accessCode}`;
    return fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then((game) => {
      return dispatch(resetGameSuccess(game));
    }).catch((err) => {
      return dispatch(resetGameError(err));
    });
  };
}

/* ---------------- New Game Actions ---------------- */

const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';

function newGameSuccess(game) {
  return {
    game,
    type: NEW_GAME_SUCCESS,
  };
}

const NEW_GAME_ERROR = 'NEW_GAME_ERROR';

function newGameError(err) {
  return {
    type: NEW_GAME_ERROR,
    error: err,
  };
}

// creates a fresh page from the /new route and creates a brand new access code
function newGame(name) {
  return (dispatch) => {
    const init = {
      method: 'POST',
    };

    const url = `/game/${name}`;
    return fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then((game) => {
      return dispatch(newGameSuccess(game));
    }).catch((err) => {
      return dispatch(newGameError(err));
    });
  };
}

/* ---------------- Join Game Actions ---------------- */

const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS';

function joinGameSuccess(game) {
  return {
    type: JOIN_GAME_SUCCESS,
    game: game
  };
}

const JOIN_GAME_ERROR = 'JOIN_GAME_ERROR';

function joinGameError(err) {
  return {
    type: JOIN_GAME_ERROR,
    error: err,
  };
}

function joinGame(code, name) {
  return (dispatch) => {
    const init = {
      method: 'PUT',
    };

    const url = `/game/join/${code}/${name}`;
    return fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then((game) => {
      return dispatch(joinGameSuccess(game));
    }).catch((err) => {
      return dispatch(joinGameError(err));
    });
  };
}

const ADD_INPUT_BOX = 'ADD_INPUT_BOX';

function addInputBox() {
  return {
    type: ADD_INPUT_BOX,
  };
}

const SEND_CODE_SUCCESS = 'SEND_CODE_SUCCESS';

function sendCodeSuccess() {
  return {
    type: SEND_CODE_SUCCESS
  };
}

const SEND_CODE_ERROR = 'SEND_CODE_ERROR';

function sendCodeError(err) {
  return {
    type: SEND_CODE_ERROR,
    error: err,
  };
}

function sendCode(number, code) {
  return (dispatch) => {
    const init = {
      method: 'POST',
    };

    const url = `/game/share/${number}/${code}`;
    return fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then(() => {
      return dispatch(sendCodeSuccess());
    }).catch((err) => {
      return dispatch(sendCodeError(err));
    });
  };
}

exports.ADD_CHIP_SUCCESS = ADD_CHIP_SUCCESS;
exports.addChipSuccess = addChipSuccess;
exports.ADD_CHIP_ERROR = ADD_CHIP_ERROR;
exports.addChipError = addChipError;
exports.addChip = addChip;

exports.FETCH_GAME_SUCCESS = FETCH_GAME_SUCCESS;
exports.fetchGameSuccess = fetchGameSuccess;
exports.FETCH_GAME_ERROR = FETCH_GAME_ERROR;
exports.fetchGameError = fetchGameError;
exports.fetchGame = fetchGame;

exports.RESET_GAME_SUCCESS = RESET_GAME_SUCCESS;
exports.resetGameSuccess = resetGameSuccess;
exports.RESET_GAME_ERROR = RESET_GAME_ERROR;
exports.resetGameError = resetGameError;
exports.resetGame = resetGame;

exports.NEW_GAME_SUCCESS = NEW_GAME_SUCCESS;
exports.newGameSuccess = newGameSuccess;
exports.NEW_GAME_ERROR = NEW_GAME_ERROR;
exports.newGameError = newGameError;
exports.newGame = newGame;

exports.JOIN_GAME_SUCCESS = JOIN_GAME_SUCCESS;
exports.joinGameSuccess = joinGameSuccess;
exports.JOIN_GAME_ERROR = JOIN_GAME_ERROR;
exports.joinGameError = joinGameError;
exports.joinGame = joinGame;

exports.ADD_INPUT_BOX = ADD_INPUT_BOX;
exports.addInputBox = addInputBox;

exports.SEND_CODE_SUCCESS = SEND_CODE_SUCCESS;
exports.sendCodeSuccess = sendCodeSuccess;
exports.SEND_CODE_ERROR = SEND_CODE_ERROR;
exports.sendCodeError = sendCodeError;
exports.sendCode = sendCode;
