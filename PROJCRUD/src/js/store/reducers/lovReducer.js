define([], function () {
    return function (state = {}, action) {
        switch (action.type) {
            case 'LOAD_LOVS':
                return action.payload;
            default:
                return state;
        }
    };
});
