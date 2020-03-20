import * as ko from "knockout";
import Router = require("ojs/ojrouter");
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojknockout";
import "ojs/ojmodule-element";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { ojModule } from "ojs/ojmodule-element";
import "ojs/ojnavigationlist";
import "ojs/ojknockout";
import rootViewModel from "../appController";
import "ojs/ojselectcombobox";
import * as $ from "jquery";
import "ojs/ojtable";
import { Task } from "../ampCommon/tasklist/Task";
import * as ModuleUtils from "ojs/ojmodule-element-utils";
import * as signals from "signals";
import 'ojs/ojpopup';
import { ojPopup } from 'ojs/ojpopup';
import 'ojs/ojbutton';
import * as ModuleElementUtils from "ojs/ojmodule-element-utils";
import { ojButtonEventMap } from 'ojs/ojbutton';

class DashboardViewModel {
  navDataSource: ojNavigationList<string, NavDataItem>["data"];
  router: Router;
  moduleConfig: ko.Observable<ojModule["config"]>;
  ainArray: ko.ObservableArray<any>;
  ainDataSource: ko.ObservableArray<any>;
  workUnitColumnArray: ko.ObservableArray<ColumnArray>;
  workUnitNumber: any;
  workUnitDataProvider: ko.Observable<ArrayDataProvider<string, string>>;
  selectedAIN: ko.Observable<string>;
  task: ko.Observable<Task>;
  remarksPopupModuleConfig: ko.Observable<ojModule["config"]>;
  nextAssignmentPool:ko.Observable<string>;
  constructor() {
    let self = this;
    self.task = ko.observable(Task.getInstance());
    self.router = Router.rootInstance;
    self.workUnitNumber = "";
    self.selectedAIN = ko.observable();
    self.workUnitDataProvider = ko.observable();
    self.ainDataSource = ko.observableArray([]);
    self.ainArray = ko.observableArray();
    self.task = ko.observable(Task.getInstance());
    self.nextAssignmentPool=ko.observable();
    self.moduleConfig = ko.observable({ view: [], viewModel: null });
   
    let casePromise: Promise<any> = Promise.all([
      ModuleUtils.createView({ "viewPath": "views/CaseManagement.html" }),
      ModuleUtils.createViewModel({ "viewModelPath": "viewModels/CaseManagement" })
    ]);
    casePromise.then((values) => {
      self.moduleConfig({ "view": values[0], "viewModel": values[1].default });
    });
    let navData: NavDataItem[] = [
      new NavDataItem({ name: "Case Management", id: "CaseManagement", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24" }),
      new NavDataItem({ name: "Record Maintainance", id: "RecordMaintainance", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24" }),
      new NavDataItem({ name: "Eligibility Determination", id: "EligibilityDetermination", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24" }),
      new NavDataItem({ name: "Appraisal", id: "Appraisal", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24" }),
      new NavDataItem({ name: "Assessment", id: "Assessment", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24" }),
    ];
    self.navDataSource = new ArrayDataProvider(navData, { idAttribute: "id" });

    self.workUnitColumnArray = ko.observableArray([
      new ColumnArray({ "headerText": "Business Event Date", "field": "CREATED_DATE" }),
      new ColumnArray({ "headerText": "Category", "field": "CATEGORY" }),
      new ColumnArray({ "headerText": "Sub Category", "field": "SUBCATEGORY" }),
      new ColumnArray({ "headerText": "Work Unit Type", "field": "WORK_UNIT_TYPE" }),
      new ColumnArray({ "headerText": "Work Unit Status", "field": "STATUS" }),
      new ColumnArray({ "headerText": "Assignment Pool", "field": "ASSIGNMENT_POOL" }),
      new ColumnArray({ "headerText": "AAU Name", "field": "" }),
      new ColumnArray({ "headerText": "AAU Relationship Type", "field": "" })
    ]);

    ko.computed(() => {
      if(self.task().task()!==undefined){
      self.task().task().payload.GCMWorkTask.EventParameterList.EventParameter.forEach((eventParam)=>{
        if(eventParam.Name!=null && eventParam.Name=='NextAssignmentPool' && eventParam.Value!==undefined){
            self.nextAssignmentPool(eventParam.Value);
        }
     });
    }
      if (self.task().workUnitDetailsList() !== undefined && self.task().workUnitDetailsList().length > 0) {
        self.workUnitNumber=self.task().workUnitDetailsList()[0].WU_NUMBER;
        self.workUnitDataProvider(new ArrayDataProvider(self.task().workUnitDetailsList(), { idAttribute: "WU_NUMBER" }));
        self.ainArray(self.task().workUnitDetailsList()[0].WU_AO);
        self.ainArray().forEach((val) => {
          self.ainDataSource.push({ label: val.AIN, value: val.AIN });
        });
        self.selectedAIN(self.ainDataSource()[0].value);
      }
    });

    this.remarksPopupModuleConfig = ko.observable({ view: [], viewModel: null });
    let remarksPromise: Promise<any> = Promise.all([
      ModuleElementUtils.createView({ "viewPath": "views/Remarks.html" }),
      ModuleElementUtils.createViewModel({ "viewModelPath": "viewModels/Remarks" })
    ]);
    remarksPromise.then((values) => {
      this.remarksPopupModuleConfig({ "view": values[0], "viewModel": values[1].default });
    });
  }


  // public openListener() {
  //   let popup = document.getElementById('popup1') as ojPopup;
  //   popup.open('#btnGo');
  // };

  public addRemarks() {
    // let popup = document.getElementById('remarksPopup') as ojPopup;
    // popup.open('#btnAddRemarks');
    this.openRemarksPopUp();
  };

  cancelListener=()=>{
    let popup = document.getElementById('remarksPopup') as ojPopup;
    popup.close();
  }
  public onSubmit =(event: ojButtonEventMap['ojAction']) => {
    let self=this;
    self.task().updateTaskOutcome("Submit", function(response){
      window.close();
    }, function(ex){
      alert("Please contact to administrator");
    });
  }

  public openRemarksPopUp() {
    // alert("hello");
    let popup = document.getElementById('remarksPopup') as ojPopup;
    popup.open('#btnAddRemarks');
  }

  connected(): void {
  }

  onSave = () => {
    console.log("Calling Global Save");
    this.task().saveWorkUnitDetails(); 
  }

}

class NavDataItem {
  id: string;
  name: string;
  iconClass: string;
  constructor({ id, name, iconClass }: {
    id: string;
    name: string;
    iconClass: string;
  }) {
    this.id = id;
    this.name = name;
    this.iconClass = iconClass;
  }
}

class ColumnArray {
  headerText: string;
  field: string;
  resizable: string;
  constructor({ headerText, field }: {
    headerText: string;
    field: string;
  }) {
    this.headerText = headerText;
    this.field = field;
    this.resizable = "enabled";
  }
}
export default DashboardViewModel;
