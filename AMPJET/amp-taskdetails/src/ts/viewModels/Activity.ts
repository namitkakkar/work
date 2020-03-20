import { Task } from "../ampCommon/tasklist/Task";
import * as ko from "knockout";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojtable";
import "ojs/ojselectcombobox";
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import { ojButtonEventMap } from 'ojs/ojbutton';
import * as KnockoutTemplateUtils from "ojs/ojknockouttemplateutils";
import * as WorkUnitPayload from "../ampCommon/tasklist/taskInterfaces/WorkUnitPayload";

import "ojs/ojselectsingle";
import { ojModule } from "ojs/ojmodule-element";
import * as ModuleUtils from "ojs/ojmodule-element-utils";
import CostApproach from "../viewModels/CostApproach";
import { ActivityPayload } from "../model/ActivityPayload";


class ActivityViewModel {
    task: ko.Observable<Task>;
    activityDataProvider: ko.Observable<ArrayDataProvider<string, string>>;
    activityColumnArray: ko.ObservableArray<any>;

    groupDP: ko.Observable<ArrayDataProvider<string, string>>;
    activityDP: ko.Observable<ArrayDataProvider<string, string>>;
    group: ko.Observable<string> = ko.observable();
    activity: ko.Observable<string> = ko.observable();
    advActivityModuleConfig: ko.Observable<ojModule["config"]>;
    selectedActivity: WorkUnitPayload.WorkUnitPayload.IWuActivityDetails;
    routingInsId: ko.Observable<any> = ko.observable();

    constructor() {
        let self = this;
        self.task = ko.observable(Task.getInstance());
        self.activityDataProvider = ko.observable();
        self.activityColumnArray = ko.observableArray([
            { "headerText": "", "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_erase", true) },
            { "headerText": "", "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_edit", true) },
            { "headerText": "Activity", "field": "ACTIVITY", "renderer": KnockoutTemplateUtils.getRenderer("activity_name", true) },
            { "headerText": "Comments", "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_comment", true) },
            { "headerText": "Date Completed", "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_datecompleted", true) },
            { "headerText": "Duration", "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_duration", true) },
            { "headerText": "Overtime", "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_overtime", true) },
            { "headerText": "Completed", "field": "" }
        ]);

        self.groupDP = ko.observable();
        self.activityDP = ko.observable();

        let groups = [
            { value: 'Cost Approach', label: 'Cost Approach' }
        ];

        let activities = [
            { value: 'Cost Approach - Outcome', label: 'Cost Approach - Outcome' }
        ];

        self.groupDP(new ArrayDataProvider(groups, { idAttribute: 'value' }));
        self.activityDP(new ArrayDataProvider(activities, { idAttribute: 'value' }));

        ko.computed(() => {
            self.activityDataProvider(new ArrayDataProvider(self.task().activityStageArray(), { idAttribute: '' }));
            if (self.task().task() !== undefined) {
                self.task().task().payload.GCMWorkTask.EventParameterList.EventParameter.forEach((eventParam) => {
                    if (eventParam.Name != null && eventParam.Name == 'WURoutingInstanceID' && eventParam.Value !== undefined) {
                        self.routingInsId(eventParam.Value);
                    }
                });
            }
        });

        self.advActivityModuleConfig = ko.observable({ "view": [], "viewModel": null });
    }

    public openActivity(event: ojButtonEventMap['ojAction']) {
        (document.getElementById('addActivityDialog') as ojDialog).open();
    }

    public close(event: ojButtonEventMap['ojAction']) {
        (document.getElementById('addActivityDialog') as ojDialog).close();
    }

    public addActivity = (event: ojButtonEventMap['ojAction']) => {
        let self = this;
        const newActitvity: WorkUnitPayload.WorkUnitPayload.IWuActivityDetails = {
            ACTIVITY: self.activity(),
            STAGE: "Appraisal",
            WU_ROUTING_INST_ID: self.routingInsId(), //This field should be derived from BPM
            WU_INST_AO_ID: self.task().workUnitDetailsList()[0].WU_AO[0].WU_INST_AO_ID, //This field should be derived
            UI_RESOURCE_ID: "CostApproach",
            ACTIVITY_PAYLOAD: null,
            ACTIVITY_PAYLOAD_STR: null,
            ROW_ID: self.task().workUnitDetailsList()[0].WU_AO[0].WU_ACTIVITIES.length + 1
        };

        self.task().workUnitDetailsList()[0].WU_AO[0].WU_ACTIVITIES.push(newActitvity);
        self.task().filterActivities("Appraisal");

        (document.getElementById('addActivityDialog') as ojDialog).close();
    }

    public editAdvanceActivity = (actInstID: number, rowID: number) => {
        let self = this;

        let editIdentifier = (actInstID ? actInstID : rowID);
        console.log("edit identifier::",editIdentifier);
        console.log("actId::", actInstID, " rowId::", rowID);
        console.log("activity::", self.task().workUnitDetailsList()[0].WU_AO[0]);
        let activityName = '';
      
        self.selectedActivity = self.task().workUnitDetailsList()[0].WU_AO[0].WU_ACTIVITIES
            .filter(data => (data.ACTIVITY_INST_ID ? data.ACTIVITY_INST_ID : data.ROW_ID)
                === editIdentifier)[0];
        
       console.log("selected act::", self.selectedActivity);
        activityName = self.selectedActivity.UI_RESOURCE_ID;
        
        activityName = 'CostApproach';
        let view = "views/" + activityName + ".html";
        let model = "viewModels/" + activityName;

        let advActivityPromise: Promise<any> = Promise.all([
            ModuleUtils.createView({ "viewPath": view }),
            ModuleUtils.createViewModel({ "viewModelPath": model })
        ]);

        advActivityPromise.then((values) => {
            this.advActivityModuleConfig({ "view": values[0], "viewModel": values[1].default });
        });
        console.log("payload::", self.selectedActivity.ACTIVITY_PAYLOAD);
        if (self.selectedActivity !== undefined) {
            let obj = JSON.parse(self.selectedActivity.ACTIVITY_PAYLOAD_STR);
            self.selectedActivity.ACTIVITY_STR_PAYLOAD = obj;
            //self.selectedActivity.ACTIVITY_PAYLOAD=<ActivityPayload>obj;
            self.loadCostApproachPayload(self.selectedActivity.ACTIVITY_STR_PAYLOAD);
            console.log("object::", self.selectedActivity.ACTIVITY_STR_PAYLOAD);
        }
        else
            (document.getElementById('editAdvActivityDialog') as ojDialog).open();
    }

    public loadCostApproachPayload = (activityPayLoad: ActivityPayload) => {
        CostApproach.loadCostApproachDetails(activityPayLoad);
        (document.getElementById('editAdvActivityDialog') as ojDialog).open();
    }

    public prepareCostApproachPayload = () => {
        let self = this;
        let activityPayload: ActivityPayload

        activityPayload = CostApproach.prepareCostApproachPayload();
        console.log("activity payload::", activityPayload);
        self.selectedActivity.ACTIVITY_PAYLOAD = activityPayload;
        delete self.selectedActivity.ACTIVITY_STR_PAYLOAD;
        delete self.selectedActivity.ACTIVITY_PAYLOAD_STR;
        if (self.selectedActivity.GCM_ACTIVITY_ID !== undefined){
            self.selectedActivity.OPERATION_FLAG = 'U';
            self.selectedActivity.ROW_ID=(self.selectedActivity.ROW_ID==undefined) ? 0 : self.selectedActivity.ROW_ID;
        }
        else
            self.selectedActivity.OPERATION_FLAG = 'I';
        console.log("opr flag::", self.selectedActivity.OPERATION_FLAG);
        console.log("act id::", self.selectedActivity.GCM_ACTIVITY_ID);
        let payload = {
            "WU_DETAILS": [
                {
                    "WU_INST_ID": self.task().workUnitDetailsList()[0].WU_INST_ID,
                    "WU_NUMBER": self.task().workUnitDetailsList()[0].WU_NUMBER,
                    "WU_AO": [{
                        "WU_ACTIVITIES": [self.selectedActivity],
                        "PROPERTY_TYPE": self.task().workUnitDetailsList()[0].WU_AO[0].PROPERTY_TYPE,
                        "WU_INST_ID": self.task().workUnitDetailsList()[0].WU_INST_ID,
                        "WU_INST_AO_ID": self.task().workUnitDetailsList()[0].WU_AO[0].WU_INST_AO_ID,
                        "ASMT_OBJ_ID": self.task().workUnitDetailsList()[0].WU_AO[0].ASMT_OBJ_ID,
                        "AIN": self.task().workUnitDetailsList()[0].WU_AO[0].AIN
                    }],
                    "BUSINESS_EVENT_DATE": self.task().workUnitDetailsList()[0].BUSINESS_EVENT_DATE
                }
            ]
        }
        console.log("payload::", JSON.stringify(payload));
        self.task().saveWUActivityPayload(payload,
            (response) => {
                console.log(response);
                self.task().workUnitDetailsList(response.WU_DETAILS);
                self.task().filterActivities('Appraisal');
                console.log("activity stage array::", self.task().activityStageArray());
                self.activityDataProvider(new ArrayDataProvider(self.task().activityStageArray(), { idAttribute: '' }));
            },
            (error) => console.log(error));
            
        console.log("Activity Payload::", self.selectedActivity);
        (document.getElementById('editAdvActivityDialog') as ojDialog).close();
    }

    public closeAdvActivity = (event: ojButtonEventMap['ojAction']) => {
        (document.getElementById('editAdvActivityDialog') as ojDialog).close();
    }

    connected(): void {
    }

}


export default ActivityViewModel;