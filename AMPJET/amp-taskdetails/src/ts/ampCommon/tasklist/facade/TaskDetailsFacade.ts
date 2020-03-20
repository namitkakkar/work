import { ActivityPayload } from "../../../model/ActivityPayload";
import * as tp from "../taskInterfaces/TaskPayload";
import * as WorkUnitPayload from "../taskInterfaces/WorkUnitPayload";

export class TaskDetailsFacade {

  public serviceurl: string = "http://amp-ate1-soa.assessor.lacounty.gov";
  public ohsUrl:string="http://iampwtt101.assessor.lacounty.gov:7778";
  public osbVipUrl: string="http://amp-ate1-osb.assessor.lacounty.gov";


  getWorkUnitDetails(wuId: string, callback: Function, url: string = this.serviceurl): void {
    var request = {
      "url": url + "/soa-infra/resources/amp/WorkUnitDetailsAPI/WorkUnitDetailsProcessAPI/wu?rtcodesinstid=&clientid=TEST_GET_WU_DETAILS&wu=YES&wuinstid=" + wuId + "&wunumber=&ao=YES&activities=YES&activityinstid=&buseventid=&determiniationinstid=&determiniations=YES&instlogid=&instlog=NO&rtcodes=YES&routinginstid=&routing=&version=V1&ain=&caseNumber=&rowCount=&sortOrderType=",
      "method": "GET",
      "timeout": 0,
      "crossDomain": true,
      "cache": false,
      "headers": {
        "Authorization": "Basic " + btoa('C178662' + ":" + 'Password123'),
        "Accept":"application/json"
      }
    };
    $.ajax(request).done(function (response) {
      console.log(response);
      callback(<WorkUnitPayload.WorkUnitPayload.IWorkUnitDetails>response.WU_DETAILS);
    }).catch(function (error) {
      console.log(error);
    });
  }

  saveWorkUnitDetails(data, callback: Function, url: string = this.serviceurl): void {
    const payload: WorkUnitPayload.WorkUnitPayload.IWU_DETAILS = {
      "WU_DETAILS": data
    }

    console.log(JSON.stringify(payload));

    let settings = {
      "url": url + "/soa-infra/resources/amp/WorkUnitDetailsAPI/WorkUnitDetailsProcessAPI/wuapi",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Basic T0FfTlJQSUMxOlBhc3N3b3JkMTIz"
      },
      "data": JSON.stringify(payload),
    };

    $.ajax(settings).done(function (response) {
      callback(<WorkUnitPayload.WorkUnitPayload.IWorkUnitDetails>response);
    }).catch(function (ex) {
      console.log(ex);
    });

  }

  saveWUActivityPayload(payload, success: Function, onError: Function, url: string = this.serviceurl): void {
    let settings = {
      "url": url + "/soa-infra/resources/amp/WorkUnitDetailsAPI/WorkUnitDetailsProcessAPI/wuapi",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Basic T0FfTlJQSUMxOlBhc3N3b3JkMTIz",
        "Accept": "application/json"
      },
      "data": JSON.stringify(payload),
    };
    $.ajax(settings).done(response => success(response)).catch(error => onError(error));
  }


  getTask(taskId: string, success: Function, error: Function, url: string = this.osbVipUrl) {
  
    var settings = {
      "url": url + "/OracleBPMRestAPIWrapperServices/TaskQueryRestAPI/getTaskDetailsById",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Basic T0FfTlJQSUMxOlBhc3N3b3JkMTIz"
      },
      "data": JSON.stringify({ "taskId": taskId })
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      success(<tp.TaskPayload.ITaskPayload>response);
    }).catch(function (ex) {
      error(ex);
    });
  }
 
  filterActivities(stageName: string, activityList: WorkUnitPayload.WorkUnitPayload.IWuActivityDetails[]): Array<any> {
    let filterActivity: Array<any> = new Array();
    if (activityList !== undefined && activityList.length > 0) {
      activityList.forEach((activity) => {
        if (activity !== null && activity.STAGE == stageName) {
          const { ACTIVITY, ACTIVITY_INST_ID, UI_RESOURCE_ID, ACTIVITY_CREATED_DATE, ROW_ID } = activity;
          filterActivity.push({
            ACTIVITY: (ACTIVITY_INST_ID!==undefined) ? ACTIVITY+' - '+ACTIVITY_INST_ID : ACTIVITY+'',
            ACTIVITY_INST_ID: ACTIVITY_INST_ID,
            UI_RESOURCE_ID: UI_RESOURCE_ID,
            ACTIVITY_CREATED_DATE: ACTIVITY_CREATED_DATE,
            ROW_ID: ROW_ID
          });
        }
      });
      return filterActivity;
    }
  }

  addRemark(remarksInputObj, success: Function, onError: Function, url: string = this.ohsUrl): void {
    //this.getORDSToken().then(response => {
      
      let request = {
        "url": url + "/ords/amp_core/wu/wu_notes",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
          //"Authorization": "Bearer " + response.access_token
        },
        "data": JSON.stringify(remarksInputObj)
      };
      $.ajax(request).done(response => success(response)).catch(error => console.log(error));
  //  }).catch(error => onError(error));
  }

  getRemarksByRemarkId(remarksId, success: Function, onError: Function, url: string = this.ohsUrl): void {
   // this.getORDSToken().then(response => {
  //  url="http://iampwtt101.assessor.lacounty.gov:7778";
      let request = {
        "url": url + "/ords/amp_core/wu/wu_notes?P_CLIENT_ID=TEST_WU_NOTES&P_REMARKS_PARENT_ID=" + remarksId + "&P_MODULE_NAME=GCM_WU_INST",
        "method": "GET"
        // "headers": {
        //   "Authorization": "Bearer " + response.access_token
        // }
      };
      $.ajax(request).done(response => success(response)).catch(error => onError(error));
   // }).catch(error => onError(error));
  }

  updateTaskoutCome(taskObj:tp.TaskPayload.ITaskPayload, taskId:string, outcome: string, success:Function, error:Function, url: string = this.osbVipUrl):void{
    let payload:any;
    payload={
      "task":taskObj,
      "taskId":taskId,
       "outcome":outcome
    }
    console.log("Payload::",payload);
    var settings = {
      "url": url + "/OracleBPMRestAPIWrapperServices/TaskServiceRestAPI/updateTaskOutcome",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Basic T0FfTlJQSUMxOlBhc3N3b3JkMTIz"
      },
      "data":JSON.stringify(payload)
    }

    $.ajax(settings).done(function (response) {
      success(response);     
    }).catch(function (ex) {
      error(ex);
    });
  }
}

