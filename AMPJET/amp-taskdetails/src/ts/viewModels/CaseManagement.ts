import * as ko from "knockout";
import "ojs/ojnavigationlist";
import "ojs/ojknockout";
import { Task } from "../ampCommon/tasklist/Task";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { ojModule } from "ojs/ojmodule-element";
import "ojs/ojmodule-element";
import * as ModuleUtils from "ojs/ojmodule-element-utils";
import { ojNavigationList } from 'ojs/ojnavigationlist';

class caseManagementViewModel {
    stage: ko.Observable<string>=ko.observable('Case Management');
    stageLinks: ko.ObservableArray<any>;
    task: ko.Observable<Task>;
    activityModuleConfig: ko.Observable<ojModule["config"]>;
    nextAssignmentPool:string;
    stageChangeAction:(event: ojNavigationList.selectionChanged<string, string>) => any;
    
    constructor() {
        let self=this;
        self.task=ko.observable(Task.getInstance());
        self.activityModuleConfig=ko.observable({ "view": [], "viewModel": null });
        self.stageLinks=ko.observableArray([
            {id: 'CaseManagement', label: 'Case Management'},
            {id: 'RecordMaintainance', label:'Records Maintenance'},
            {id: 'EligibilityDetermination', label: 'Eligibility Determination'},
            {id: 'Appraisal', label: 'Appraisal'},
            {id: 'Assessment', label: 'Assessment'}
        ]);
       
        let activityPromise: Promise<any> = Promise.all([
            ModuleUtils.createView({ "viewPath": "views/Activity.html" }),
            ModuleUtils.createViewModel({ "viewModelPath": "viewModels/Activity" })
        ]);

        activityPromise.then((values)=>{
            self.activityModuleConfig({ "view": values[0], "viewModel": values[1].default });
        });

        self.stageChangeAction = (event:ojNavigationList.selectionChanged<string, string>) => {
            self.task().filterActivities(self.stage());
        }
        
    }

}
export default caseManagementViewModel;