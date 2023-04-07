//tokenを初期値nullで定義
const state = {
    token: null,
}

//ログイン状態を判定するためのgettersを定義
const getters = {
    isLogined: (state) => !!state.token,
}