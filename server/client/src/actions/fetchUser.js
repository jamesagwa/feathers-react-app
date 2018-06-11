import { FETCH_USER } from "./events";

const fetchUser = (user) => ({
    type: FETCH_USER,
    user
});

export default fetchUser;