define([], function () {
    return function (state = {}, action) {
        switch (action.type) {
            case 'LOAD_WORK_UNIT':
                return action.payload.WU_DETAILS;
            default:
                return state;
        }
    };
});
