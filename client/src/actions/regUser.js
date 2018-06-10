import { REG_USER } from "./events";

const regUser = (payload) => ({
    type: REG_USER,
    payload
});

export default regUser;