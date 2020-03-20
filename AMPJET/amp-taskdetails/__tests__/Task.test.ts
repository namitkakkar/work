import { Task } from '../src/ts/ampCommon/tasklist/Task';
import { IRemarks } from '../src/ts/viewModels/Remarks';
import { WU_NOTES } from '../src/ts/viewModels/Remarks';
import * as ko from "knockout";
import * as properties from "../props.json";
import * as WorkUnitPayload from "../src/ts/ampCommon/tasklist//taskInterfaces/WorkUnitPayload";
import { TaskDetailsFacade } from '../src/ts/ampCommon/tasklist/facade/TaskDetailsFacade';

describe('Task', function () {
    let task = Task.getInstance();
    var workUnitDetailsList = ko.observableArray<WorkUnitPayload.WorkUnitPayload.IWorkUnitDetails>();

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

    it('workUnitDetails', done => {
        task.getWorkUnitDetails(wuid, serviceUrlPrefix);
        console.log("workUnitDetailsList = "+task.workUnitDetailsList);
      expect(task.workUnitDetailsList).not.toBeNull();
      done();
    });

    it('getTask', done => {
        task.getTask(taskid, osbUrl);
        console.log("task = "+task.task);
        expect(task.task).not.toBeNull();
        done();
    }); 

    it('getTaskFail', done => {
        task.getTask(taskid, falseOsbUrl);
        console.log("task = "+task.task);
        expect(task.task).not.toBeNull();
        done();
    }); 

    it('loadTaskDetails', done => {
        task.loadTaskDetails(taskid, osbUrl);
        console.log("task = " + task.task);
        expect(task.task).not.toBeNull();
        done();
    });

    it('updateTaskOutcome', done => {
        task.updateTaskOutcome("Submit", function (response) {
            console.log(task.task);
            done();
        }, function (ex) {
            alert("Please contact to administrator");
            done();
        }, osbUrl);
        console.log("task = " + task.task);
        expect(task.task).not.toBeNull();
    });

    it('updateTaskOutcomeFail', done => {
        task.updateTaskOutcome("Submit", function (response) {
            console.log(task.task);
            done();
        }, function (ex) {
            alert("Please contact to administrator");
            done();
        }, falseOsbUrl);
        console.log("task = " + task.task);
        expect(task.task).not.toBeNull();
    });

    it('filterActivities', done => {
        task.filterActivities("Case Management");
        console.log("filterActivities = " + task.activityStageArray);
        expect(task.activityStageArray).not.toBeNull();
        done();
    });

    it('saveWUPayload', done => {
        let taskDetailsFacade = new TaskDetailsFacade();
        taskDetailsFacade.getWorkUnitDetails(wuid, function (data) {
            workUnitDetailsList = data;
            expect(workUnitDetailsList).not.toBeNull();
            done();
        }, serviceUrlPrefix);
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
        task.saveWUActivityPayload(payload,
            (response) => {
                console.log(response);
                workUnitDetailsList(response.WU_DETAILS);
                done();
            },
            (error) => {
                console.log(error);
                done();
            }, osbUrl);
        expect(task.activityStageArray).not.toBeNull();
    });


    it('saveWorkUnitDtls', done => {
        task.saveWorkUnitDetails();
        console.log("workUnitDetailsList = " + task.workUnitDetailsList);
        expect(task.workUnitDetailsList).not.toBeNull();
        done();
    });

    task = Task.getInstance();

    it('getRemarksByRemarkId', done => {
        var remarksObservableArray: IRemarks[];
        task.getRemarksByRemarkId(remarksid,
            (res) => {
                console.log(res);
                console.log(res.WU_NOTES);
                const resResult: IRemarks[] = <IRemarks[]>res.WU_NOTES;
                remarksObservableArray = resResult;
                console.log(resResult);
                console.log(remarksObservableArray);
            },
            (error) => console.log(error));
        expect(remarksObservableArray).not.toBeNull();
        done();
    });

    it('addRemarks', done => {
        var remarksObservableArray: IRemarks[];
        let CREATED_BY = "C139993";
        let CREATED_DATE = "2020-01-22T00:00:00Z";
        let remarksId = "";
        let REMARKS = "";
        let CREATED_USER = "C139993";
        let REMARKS_SUBJECT = "Add Remarks Testing";
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
        var remarksInputObservableArray: ko.ObservableArray<WU_NOTES> = ko.observableArray<WU_NOTES>([]);
        remarksInputObservableArray.push(remarksInputObj.WU_NOTES[0]);
        task.addRemark(remarksInputObj,
            (response) => {
                const resResult: IRemarks[] = <IRemarks[]>response.WU_NOTES;
                console.log(resResult);
                remarksObservableArray = response.WU_NOTES;
                remarksTxtVal = ('');
            },
            (error) => console.log(error));
        expect(remarksObservableArray).not.toBeNull();
        done();
    });
});