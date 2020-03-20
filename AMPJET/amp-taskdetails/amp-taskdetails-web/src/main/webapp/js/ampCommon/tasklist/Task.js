define(["require","exports","knockout","./facade/TaskDetailsFacade"],(function(require,t,s,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function t(){this.serviceurl="http://amp-ate1-soa.assessor.lacounty.gov",this.ohsUrl="http://iampwtt101.assessor.lacounty.gov:7778",this.osbVipUrl="http://amp-ate1-osb.assessor.lacounty.gov";this.workUnitDetailsList=s.observableArray([]),this.activityStageArray=s.observableArray([]),this.bpmTaskId=s.observable(),this.task=s.observable(),this.taskDetailsFacade=new a.TaskDetailsFacade}return t.prototype.getTask=function(t,s){void 0===s&&(s=this.osbVipUrl);var a=this;console.log("get task called"),a.taskDetailsFacade.getTask(t,(function(s){a.task(s),a.bpmTaskId(t)}),(function(t){console.log(t)}),s)},t.prototype.getWorkUnitDetails=function(t,s){void 0===s&&(s=this.serviceurl);var a=this;a.taskDetailsFacade.getWorkUnitDetails(t,(function(t){a.workUnitDetailsList(t),a.filterActivities("Case Management")}),s)},t.prototype.saveWorkUnitDetails=function(){this.taskDetailsFacade.saveWorkUnitDetails(this.workUnitDetailsList(),(function(t){}))},t.prototype.saveWUActivityPayload=function(t,s,a,i){void 0===i&&(i=this.serviceurl),this.taskDetailsFacade.saveWUActivityPayload(t,s,a,i)},t.prototype.filterActivities=function(t){void 0!==this.workUnitDetailsList()&&this.workUnitDetailsList().length>0&&this.activityStageArray(this.taskDetailsFacade.filterActivities(t,this.workUnitDetailsList()[0].WU_AO[0].WU_ACTIVITIES))},t.prototype.addRemark=function(t,s,a){this.taskDetailsFacade.addRemark(t,s,a)},t.prototype.getRemarksByRemarkId=function(t,s,a){this.taskDetailsFacade.getRemarksByRemarkId(t,s,a)},t.prototype.updateTaskOutcome=function(t,s,a,i){void 0===i&&(i=this.osbVipUrl);this.taskDetailsFacade.updateTaskoutCome(this.task(),this.bpmTaskId(),t,(function(t){s(t)}),(function(t){a(t)}),i)},t.prototype.loadTaskDetails=function(t,s){var a=this;void 0===s&&(s=this.osbVipUrl);var i=this;void 0!==t&&(i.getTask(t,s),i.task.subscribe((function(){i.getWorkUnitDetails(i.task().payload.GCMWorkTask.WorkUnitInstanceId,a.serviceurl)})))},t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t}();t.Task=i}));