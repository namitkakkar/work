define([], function () {
    return function (state = [], action) {
        switch (action.type) {
            case 'LOAD_CASE_DETAILS':
                return action.payload;
            default:
                return state;
        }
    };
});
