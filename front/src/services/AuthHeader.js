export default function getAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return 'Bearer ' + user.accessToken;
    } else {
        return null;
    }
}
