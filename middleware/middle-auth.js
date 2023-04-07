export default function ({ redirect, store, route }) {
    const isLogined = store.getters["auth/isLogined"]

    if (!isLogined && route.path !== '/login') {
        redirect('/login');
    }
}