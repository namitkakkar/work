define(['jquery'], function ($) {
    const BASE_URL = 'http://iampwtd201.assessor.lacounty.gov:7780';

    apiMiddleware = ({ dispatch }) => next => action => {
        if (action.type !== 'API') return next(action);

        dispatch({ type: 'TOGGLE_LOADER' });
        const { url, success, method } = action.payload;
        return $.ajax({
            type: method,
            url: BASE_URL + url
        }).then(payload => {
            dispatch({ type: 'TOGGLE_LOADER' });
            dispatch({ type: success, payload });
        }).catch(error => {
            dispatch({ type: 'TOGGLE_LOADER' });
            dispatch({ type: API_ERROR, error });
        });
    };

    logger = store => next => action => {
        console.group(action.type);
        console.log('the action: ', action);
        const result = next(action);
        console.log('new state: ', store.getState());
        console.groupEnd();
        return result;
    };

    return { apiMiddleware, logger };
});
