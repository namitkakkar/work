import * as ko from "knockout";
import * as WorkUnitPayload from "../src/ts/ampCommon/tasklist//taskInterfaces/WorkUnitPayload";
import {TaskDetailsFacade} from '../src/ts/ampCommon/tasklist/facade/TaskDetailsFacade';
import {AdvancedActivityConstants} from "../src/ts/util/AdvancedActivityConstants";
import * as TaskPayload from "../src/ts/ampCommon/tasklist//taskInterfaces/TaskPayload";
import {IRemarks} from '../src/ts/viewModels/Remarks';
import {WU_NOTES} from '../src/ts/viewModels/Remarks';
import { Task } from "../src/ts/ampCommon/tasklist/Task";
import * as properties from "../props.json";

describe('TaskDetails', function() {
    let timestart = new Date().getTime();
    var workUnitDetailsList = ko.observableArray<WorkUnitPayload.WorkUnitPayload.IWorkUnitDetails>();
    var taskCopy: TaskPayload.TaskPayload.ITaskPayload; 
 
    const serviceUrlPrefix = properties.serviceurl;
    console.log(serviceUrlPrefix);
    const wuid = properties.wuid;
    console.log(wuid);
    const remarksid = properties.remarksid;
    console.log(remarksid);
    const taskid = properties.taskid;
    console.log(taskid);
    const serviceUrlfalsePrefix = properties.falseserviceurl;
    console.log(serviceUrlfalsePrefix);
    const osbUrl = properties.osburl;
    console.log(osbUrl);
    const falseOsbUrl = properties.falseosburl;
    console.log(falseOsbUrl);
    const ordsUrl = properties.ordsurl;
    console.log(ordsUrl);
    const falseOrdsUrl = properties.falseordsurl;
    console.log(falseOrdsUrl);

    it('properties test', function() {
        expect(wuid).not.toBeNull();
    });
    
    it('workUnitDetailsFail', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
       taskDetailsFacade.getWorkUnitDetails(wuid, function(data){
            let workUnitDetailsList =  data;
            let difftime = new Date().getTime() - timestart;
            expect(difftime).toBeLessThanOrEqual(AdvancedActivityConstants.EXECUTION_TIME_CHECK);
            expect(workUnitDetailsList).not.toBeNull();
            done();
        }, serviceUrlfalsePrefix);
    });

    it('workUnitDetails', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
       taskDetailsFacade.getWorkUnitDetails(wuid, function(data){
            workUnitDetailsList =  data;
            let difftime = new Date().getTime() - timestart;
            expect(difftime).toBeLessThanOrEqual(AdvancedActivityConstants.EXECUTION_TIME_CHECK);
            expect(workUnitDetailsList).not.toBeNull();
            done();
        }, serviceUrlPrefix);
    });

    it('workUnitDetailsSecond', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
       taskDetailsFacade.getWorkUnitDetails(wuid, function(data){
            workUnitDetailsList =  data;
            let difftime = new Date().getTime() - timestart;
            expect(difftime).toBeLessThanOrEqual(AdvancedActivityConstants.EXECUTION_TIME_CHECK);
            expect(workUnitDetailsList).not.toBeNull();
            done(); 
        });
    });    

    it('saveWorkUnitDetails', done=> {
        let taskDetailsFacade = new TaskDetailsFacade();
        console.log("TEST NT "+workUnitDetailsList[0].WU_AO[0].WU_ACTIVITIES);
        taskDetailsFacade.saveWorkUnitDetails(workUnitDetailsList, function (data) {
            expect(workUnitDetailsList).not.toBeNull();
            done();
        }, serviceUrlPrefix);
    });

    it('saveWorkUnitDetailsFail', done=> {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.saveWorkUnitDetails(workUnitDetailsList, function (data) {
            done();
        }, serviceUrlfalsePrefix);
        expect(workUnitDetailsList).not.toBeNull();
    });

    it('filterActivities', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.filterActivities("Appraisal", workUnitDetailsList[0].WU_AO[0].WU_ACTIVITIES);
        expect(workUnitDetailsList).not.toBeNull();
        done();
    });

    it('filterActivitiesNull', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        let activityList: WorkUnitPayload.WorkUnitPayload.IWuActivityDetails[];
        taskDetailsFacade.filterActivities("Case Management", activityList);
        expect(workUnitDetailsList).not.toBeNull();
        done();
    });

    it('task', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.getTask(taskid, function (response) {
            taskCopy = (response);
            expect(taskCopy).not.toBeNull();
            done();
        }, function (error) {
            console.log(error);
            done();
        }, osbUrl);
    });

    it('taskFail', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.getTask(taskid, function (response) {
            console.log(response);
            done();
        }, function (error) {
            console.log(error);
            done();
        }, falseOsbUrl);
        expect(taskCopy).not.toBeNull();
    });

    it('taskSecond', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.getTask(taskid, function (response) {
            console.log(response);
            done();
        }, function (error) {
            console.log(error);
            done();
        });
        expect(taskCopy).not.toBeNull();
    });

    it('addRemark', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        var remarksObservableArray : IRemarks[];
        let CREATED_BY = "C139993";
        let CREATED_DATE = "2020-01-22T00:00:00Z";
        let remarksId = "";
        let REMARKS = "";
        let CREATED_USER = "C139993";
        let REMARKS_SUBJECT= "Add Remarks Testing";
        let moduleName = "GCM_WU_INST";
        let remarksTxtVal = "";
        var remarksInputObj = {
            WU_NOTES: [{
                CREATED_BY: CREATED_BY,
                CREATED_DATE: CREATED_DATE,
                REMARKS_PARENT_ID: remarksId,
                MODULE_NAME: moduleName,
                REMARKS_SUBJECT: REMARKS_SUBJECT,
                REMARKS: remarksTxtVal
            }]
        };
        taskDetailsFacade.addRemark(remarksInputObj,
            (response) => {
                const resResult: IRemarks[] = <IRemarks[]>response.WU_NOTES;
                remarksObservableArray = response.WU_NOTES;
                remarksTxtVal = ('');
                done();
            },
            (error) => {
                console.log(error)
                done();
            }, ordsUrl);
        expect(remarksInputObj).not.toBeNull();
    });

    it('getRemarksByRemarkId', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        var remarksObservableArray : IRemarks[];
        taskDetailsFacade.getRemarksByRemarkId(remarksid,
        (res) => {
            const resResult: IRemarks[] = <IRemarks[]>res.WU_NOTES;
            remarksObservableArray = resResult;
            done();
        },
        (error) => {
            console.log(error);
             done();
        }, ordsUrl);
        expect(remarksObservableArray).not.toBeNull();
    });

    it('getRemarksByRemarkIdFail', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        var remarksObservableArray : IRemarks[];
        taskDetailsFacade.getRemarksByRemarkId("ABCD",
        (res) => {
            const resResult: IRemarks[] = <IRemarks[]>res.WU_NOTES;
            remarksObservableArray = resResult;
            done();
        },
        (error) => {
            console.log(error);
            done();
        }, falseOrdsUrl);
        expect(remarksObservableArray).not.toBeNull();
    });

    it('saveWUpayload', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        let payload = {
            "WU_DETAILS": [
                {
                    "WU_INST_ID": workUnitDetailsList[0].WU_INST_ID,
                    "WU_NUMBER": workUnitDetailsList[0].WU_NUMBER,
                    "WU_AO": {
                        "PROPERTY_TYPE": workUnitDetailsList[0].WU_AO[0].PROPERTY_TYPE,
                        "WU_INST_ID": workUnitDetailsList[0].WU_INST_ID,
                        "WU_INST_AO_ID": workUnitDetailsList[0].WU_AO[0].WU_INST_AO_ID,
                        "ASMT_OBJ_ID": workUnitDetailsList[0].WU_AO[0].ASMT_OBJ_ID,
                        "AIN": workUnitDetailsList[0].WU_AO[0].AIN
                    },
                    "BUSINESS_EVENT_DATE": workUnitDetailsList[0].BUSINESS_EVENT_DATE
                }
            ]
        }
        console.log("payload::", JSON.stringify(payload));
        taskDetailsFacade.saveWUActivityPayload(payload,
            (response) => {
                console.log(response);
                workUnitDetailsList(response.WU_DETAILS);
                done();
            },
            (error) => {
                console.log(error);
                done();
            }, osbUrl);
        expect(workUnitDetailsList).not.toBeNull();
    }); 

    it('updateTaskOutcome', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.updateTaskoutCome(taskCopy,taskid, "Submit", function(response){
            console.log(taskCopy);
            done();
        }, function(ex){
            alert("Please contact to administrator");
            done();
        }, osbUrl);
    });

    it('updateTaskOutcomeFail', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.updateTaskoutCome(taskCopy,taskid, "Submit", function(response){
            console.log(taskCopy);
            done();
        }, function(ex){
            alert("Please contact to administrator");
            done();
        }, falseOsbUrl);
    });

    it('saveWUpayloadFail', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        let payload = {
            "WU_DETAILS": [
                {
                    "WU_INST_ID": workUnitDetailsList[0].WU_INST_ID,
                    "WU_NUMBER": workUnitDetailsList[0].WU_NUMBER,
                    "WU_AO": {
                        "PROPERTY_TYPE": workUnitDetailsList[0].WU_AO[0].PROPERTY_TYPE,
                        "WU_INST_ID": workUnitDetailsList[0].WU_INST_ID,
                        "WU_INST_AO_ID": workUnitDetailsList[0].WU_AO[0].WU_INST_AO_ID,
                        "ASMT_OBJ_ID": workUnitDetailsList[0].WU_AO[0].ASMT_OBJ_ID,
                        "AIN": workUnitDetailsList[0].WU_AO[0].AIN
                    },
                    "BUSINESS_EVENT_DATE": workUnitDetailsList[0].BUSINESS_EVENT_DATE
                }
            ]
        }
        console.log("payload::", JSON.stringify(payload));
        taskDetailsFacade.saveWUActivityPayload(payload,
            (response) => {
                console.log(response);
                workUnitDetailsList(response.WU_DETAILS);
                done();
            },
            (error) => {
                console.log(error);
                done();
            }, falseOsbUrl);    
        expect(workUnitDetailsList).not.toBeNull();
        done();
    }); 
  });