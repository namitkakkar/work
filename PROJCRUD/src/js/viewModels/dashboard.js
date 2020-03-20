define(['knockout', 'ojs/ojbootstrap', 'ojs/ojanimation', 'signals', 'ojs/ojmodule-element-utils', 'ojs/ojrouter', 'ojs/ojcollectiondataprovider', 'appController', 'store/index', 'store/actions', 'js-logger', 'ojs/ojpagingdataproviderview', 'ojs/ojflattenedtreedataproviderview', 'ojs/ojarraydataprovider', 'ojs/ojmodel', 'ojs/ojcollectiondataprovider', 'text!TableData.json', 'jquery', 'ojs/ojknockouttemplateutils', 'ojs/ojarraytreedataprovider', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojvalidationgroup', 'ojs/ojinputtext', 'ojs/ojknockout', 'ojs/ojmodule', 'ojs/ojbutton', 'ojs/ojpopup', 'ojs/ojnavigationlist', 'ojs/ojmodule-element', 'ojs/ojselectcombobox', 'jquery'],
  function (ko, Bootstrap, AnimationUtils, signals, ModuleElementUtils, Router, CollectionDataProvider, app, store, actions, Logger) {
    var self;
    function dashbardViewModel() {
      self = this;
      self.property = ko.observable();
      self.appController = app;
      self.holdButtonText = "Hold";
      self.rescheduleButtonText = "Reschedule";
      self.routeToButtonText = "Route To";
      var userInfoSignal = new signals.Signal();
      self.workUnitConfig = ModuleElementUtils.createConfig({ name: 'workUnitData' });
      self.popupModuleConfig = ModuleElementUtils.createConfig({ name: 'ain', params: { 'userInfoSignal': userInfoSignal } });
      self.selectedTab = ko.observable();
      self.ainRecArray = ko.observableArray();
      self.ainListArray = ko.observableArray();
      self.propertyType = ko.observable();
      self.workUnitCollection = ko.observable();
      self.submitButtonText = "Submit";
      self.saveButtonText = "Save";
      self.unclaimButtonText = "Unclaim";
      self.closeButtonText = "Close";
      self.ainLength = ko.observable();

      store.dispatch(actions.loadLovs());
      userInfoSignal.add(function (ain) {
        self.ainRecArray(ain);
        self.ainListArray.removeAll();
        self.ainLength(0);
        self.propertyType(ain[0].UseType);
        self.property(ain[0].Ain);
        self.ainRecArray().forEach(function (entry) {
          let data = {
            label: entry.Ain,
            value: entry.Ain
          }
          self.ainListArray.push(data);
          self.ainLength(self.ainLength() + 1);
         
        });
      });
      self.openListener = function (event) {
        var popup = document.getElementById('popup1');
        popup.open('#btnGo');
      }
      self.ainValueChangeHandler = function (event) {
        self.ainRecArray().forEach(function (entry) {
          if (entry.Ain == self.property()) {
            self.propertyType(entry.UseType);
          }
        });
      }
      self.buttonClick = function (event) {
        self.clickedButton(event.currentTarget.id);
        return true;
      }
      self.startAnimationListener = function (event) {
        var ui = event.detail;
        if (event.target.id !== "popup1")
          return;
        if ("open" === ui.action) {
          event.preventDefault();
          var options = { "direction": "top" };
          AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
        }
        else if ("close" === ui.action) {
          event.preventDefault();
          ui.endCallback();
        }
      }
      self.onSaveClick = function (event) {
        let savedData = {};
        let lovSavedData = {};
        let caseActivityData = {};
        let completeData = store.getState();
        let lovData = completeData.lovs.Lov;
        let caseDetailsData = completeData.caseDetails;
        let recordActivityData = completeData.recordActivities;
        caseActivityData['caseDetailsData'] = caseDetailsData;
        caseActivityData['recordActivityData'] = recordActivityData;
        caseActivityData['caseActivity'] = completeData.caseActivities;
        lovSavedData['lovs'] = lovData;
        savedData['CaseData'] = caseActivityData;
        savedData['lovSavedData'] = lovSavedData;
        console.log(savedData);
        console.log(JSON.stringify(savedData));
        /* let businessDate = self.workUnitDetails().WorkUnitDetail[0].BusinessEventDate;
        let category = self.workUnitDetails().WorkUnitDetail[0].Category;
        let subcategory = self.workUnitDetails().WorkUnitDetail[0].SubCategory;
        let workUnitType = self.workUnitDetails().WorkUnitDetail[0].WorkUnitType;
        let workUnitStatus = self.workUnitDetails().WorkUnitDetail[0].WorkUnitStatus;
        let assignmentPool = self.workUnitDetails().WorkUnitDetail[0].AssignmentPool;
        let workUnitNumber = self.workUnitDetails().WorkUnitDetail[0].WorkUnitNumber;

        savedData.businessDate = businessDate;
        savedData.category = category;
        savedData.subcategory = subcategory;
        savedData.workUnitType = workUnitType;
        savedData.workUnitStatus = workUnitStatus;
        savedData.assignmentPool = assignmentPool;
        savedData.workUnitNumber = workUnitNumber;
        savedData.businessDate = businessDate;
 */
        //savedData.ainData = ainData;
        /*   savedData.ainData = self.ainListArray();
          console.log(self.ainListArray()); */
        console.log(savedData);
        console.log(JSON.stringify(savedData));
        //self.clickedButton(event.currentTarget.id);

      }



    }
    return dashbardViewModel;
  });