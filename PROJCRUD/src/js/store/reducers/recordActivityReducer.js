define([], function () {
    return function (state = {}, action) {
        switch (action.type) {
            case 'LOAD_RECORD_ACTIVITIES':
                return action.payload;
            default:
                return state;
        }
    };
});
