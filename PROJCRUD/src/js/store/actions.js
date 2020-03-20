define(['text!lov.json', 'text!casedetails.json', 'text!activity.json', 'text!record.json'], function (mockLovPayload, mockCaseDetailsPayload, mockCaseActivitiesPayload, mockRecordActivitiesPayload) {

    return {
        loadLovs: () => {
            let jsondata = JSON.parse(mockLovPayload);
            return {
                type: 'LOAD_LOVS',
                payload: jsondata
            }
        },

        loadCaseDetails: () => {
            let jsondata = JSON.parse(mockCaseDetailsPayload);
            return {
                type: 'LOAD_CASE_DETAILS',
                payload: jsondata
            };
        },

        loadCaseActivities: (caseActivity) => {
            //let jsondata = JSON.parse(mockCaseActivitiesPayload);
            
            return {
                type: 'LOAD_CASE_ACTIVITIES',
                payload: caseActivity
            }
        },

        loadRecordActivities: (caseActivity) => {
           // let jsondata = JSON.parse(mockRecordActivitiesPayload);
           
            return {
                type: 'LOAD_RECORD_ACTIVITIES',
                payload: caseActivity
            };
        },

        fetchWorkUnit: (wuNumber) => ({
            type: 'API',
            payload: {
                url: '/ords/amp_core/wu/wu_test?P_CLIENT_ID=TEST_GET_WU_DETAILS&P_GET_WU_ACT=YES&P_GET_WU_DETR=YES&P_GET_RTCODES=YES&P_GET_ROUT_REC=YES&P_GET_WU_INST_LOG=YES&P_GET_WU_AO=YES&P_WU_INST_ID=&P_WU_NUMBER='+wuNumber+'&P_WU_ROUTING_INST_ID=&P_WU_ACT_INST_ID=&P_WU_DETR_INST_ID=&P_WU_RTCODE_INST_ID=&P_WU_INST_LOG_ID=',
                method: 'GET',
                success: 'LOAD_WORK_UNIT'
            }
        })
    };
});
