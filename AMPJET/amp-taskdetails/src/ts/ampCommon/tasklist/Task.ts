import * as ko from "knockout";
import { TaskDetailsFacade } from "./facade/TaskDetailsFacade";
import * as WorkUnitPayload from "./taskInterfaces/WorkUnitPayload";
import * as TaskPayload from "./taskInterfaces/TaskPayload";
import * as taskInterface from "./taskInterfaces/TaskPayload";

export class Task {
    private static instance: Task;
    workUnitDetailsList: ko.ObservableArray<WorkUnitPayload.WorkUnitPayload.IWorkUnitDetails>;
    activityStageArray: ko.ObservableArray<any>;
    taskDetailsFacade : TaskDetailsFacade;
    task:ko.Observable<TaskPayload.TaskPayload.ITaskPayload>;
    bpmTaskId:ko.Observable<string>;
     
    public serviceurl: string = "http://amp-ate1-soa.assessor.lacounty.gov";
    public ohsUrl:string="http://iampwtt101.assessor.lacounty.gov:7778";
    public osbVipUrl: string="http://amp-ate1-osb.assessor.lacounty.gov";

    private constructor(){
        let self=this;
        self.workUnitDetailsList=ko.observableArray([]);
        self.activityStageArray= ko.observableArray([]);
        self.bpmTaskId=ko.observable();
        self.task=ko.observable();
        self.taskDetailsFacade=new TaskDetailsFacade();
    }
    getTask(taskId: string, url:string = this.osbVipUrl): void {
        let self = this;
        console.log("get task called");
        self.taskDetailsFacade.getTask(taskId, function (response) {
            self.task(response); self.bpmTaskId(taskId);
        }, function (error) {
            console.log(error);
        }, url);
    }

    getWorkUnitDetails(wuId: string, url: string = this.serviceurl): void {
        let self = this;
        self.taskDetailsFacade.getWorkUnitDetails(wuId, function (data) {
            self.workUnitDetailsList(data); self.filterActivities('Case Management');
        }, url);    
    }

    saveWorkUnitDetails(): void {
        let self = this;
        self.taskDetailsFacade.saveWorkUnitDetails(self.workUnitDetailsList(), function (data) {
        });
    }

    saveWUActivityPayload(payload, success: Function, onError: Function, url: string = this.serviceurl): void {
        this.taskDetailsFacade.saveWUActivityPayload(payload, success, onError, url);
    }

    filterActivities(stageName: string): void {
        let self = this;
        if (self.workUnitDetailsList() !== undefined && self.workUnitDetailsList().length > 0) {
            self.activityStageArray(self.taskDetailsFacade.filterActivities(stageName, self.workUnitDetailsList()[0].WU_AO[0].WU_ACTIVITIES));
        }
    }

    addRemark(remarksInputObj, success: Function, error: Function): void {
        this.taskDetailsFacade.addRemark(remarksInputObj, success, error);
    }

    getRemarksByRemarkId(parentId, success: Function, error: Function): void {
        this.taskDetailsFacade.getRemarksByRemarkId(parentId, success, error);
    }

    updateTaskOutcome(outcome: string, success:Function, error:Function, url:string = this.osbVipUrl):void{
        let self=this;
        self.taskDetailsFacade.updateTaskoutCome(self.task(),self.bpmTaskId(), outcome, function(response){
            success(response);
        }, function(ex){
            error(ex);
        }, url);
    }
    loadTaskDetails(taskId:string, url : string = this.osbVipUrl):void{
        let self=this;
        if (taskId !== undefined) {
            self.getTask(taskId, url);
            self.task.subscribe(() => {
                   self.getWorkUnitDetails(self.task().payload.GCMWorkTask.WorkUnitInstanceId, this.serviceurl);
            });
          }
    }

    public static getInstance(): Task{
        if(!Task.instance){
            Task.instance=new Task();
        }
        return Task.instance;
    }
    

}