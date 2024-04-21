const UserInfor = (state = [], action) => {
    if (action.type === "GET_USER_INFOR") {
        state = action.data;
    }

    return state;
};

export default UserInfor;
