define(['redux', 'store/reducers/loadingReducer',
    'store/reducers/lovReducer', 'store/reducers/caseDetailsReducer',
    'store/reducers/caseActivityReducer', 'store/reducers/recordActivityReducer',
    'store/reducers/workUnitReducer', 'store/middlewares'],
    function (redux, loadingReducer, lovReducer, caseDetailsReducer, caseActivityReducer, recordActivityReducer, workUnitReducer, middlewares) {
        const store = redux.createStore(
            redux.combineReducers({
                loading: loadingReducer,
                lovs: lovReducer,
                caseDetails: caseDetailsReducer,
                caseActivities: caseActivityReducer,
                recordActivities: recordActivityReducer,
                workUnit: workUnitReducer
            }),
            redux.applyMiddleware(middlewares.apiMiddleware, middlewares.logger)
        );

        return store;
    });