define(['knockout', 'ojs/ojrouter', 'ojs/ojknockout-keyset', 'ojs/ojknockouttemplateutils', 'ojs/ojmodule-element-utils', 'store/index', 'store/actions', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojdialog'],
  function (ko, Router, keySet, KnockoutTemplateUtils, ModuleElementUtils, store, actions) {
    function rcViewModel() {
      var self = this;
      activityModuleConfig = ModuleElementUtils.createConfig({ name: 'activity', params: { 'tabName': 'RECORD_MAINTANANCE' } });
      self.router = Router.rootInstance;
      console.log("router", self.router);

      self.caseDetails = ko.observableArray([]);
      // self.caseTblData = new oj.ArrayDataProvider(self.caseDetails().allCases);
      self.caseTblData = new oj.ArrayDataProvider(self.caseDetails, { keyAttributes: 'Case_Number' });

      this.columnArray = [{
        "headerText": "Case Number",
        "sortable": "enabled",
        "renderer": KnockoutTemplateUtils.getRenderer("Case_Number", true),
        "sortProperty": "Case_Number"
      }
        , {
        "headerText": "Case Name",
        "sortable": "enabled",
        "field": "Case_Name",
        "sortProperty": "Case_Name"
      }
        , {
        "headerText": "Status",
        "sortable": "enabled",
        "field": "Status",
        "sortProperty": "Status"
      }
        , {
        "headerText": "Created Date",
        "sortable": "enabled",
        "field": "Created_Date",
        "sortProperty": "Created_Date"
      }
        , {
        "headerText": "Work units",
        "sortable": "enabled",
        "field": "Work_units",
        "sortProperty": "Work_units"
      }
        , {
        "headerText": "Remarks",
        "sortable": "enabled",
        "field": "Remarks",
        "sortProperty": "Remarks"
      }
      ];

      self.connected = function () {
        store.dispatch(actions.loadCaseDetails());
        store.subscribe(() => self.caseDetails(store.getState().caseDetails));
      };

      this.selectedChangedListener = function (event, data) {
      }

      self.selectedRow = new keySet.ObservableKeySet();

      this.wrkunittblcolumnArray = [
        {
          "headerText": "Work Unit Number",
          "sortable": "enabled",
          "renderer": KnockoutTemplateUtils.getRenderer("workUnitNumber", true),
          "sortProperty": "Work_Unit_Number"
        },
        {
          "headerText": "Work Unit Type",
          "sortable": "enabled",
          "field": "Work_unit_Type",
          "sortProperty": "Work_unit_Type"
        }, {
          "headerText": "Business Event Date",
          "sortable": "enabled",
          "field": "Business_Event_Date",
          "sortProperty": "Business_Event_Date"
        }, {
          "headerText": "Property IDs",
          "sortable": "enabled",
          "field": "Property_IDs",
          "sortProperty": "Property_IDs"
        }
      ];

      self.wrkUnitsTblData = ko.observable();
      self.wrkUnitsArray = ko.observableArray([]);

      this.openWrkUntDialog = function (caseNumber, data, event) {
        event.preventDefault();
        console.log("ROW KEY ", caseNumber);
        let childData = new Promise(function (resolve, reject) {
          let slctdCaseDetails = self.caseDetails().allCases.filter(obj => obj.Case_Number === caseNumber);
          if (slctdCaseDetails) {
            console.log(slctdCaseDetails[0]);

            //The below observable Array will help to get the property_lists for the selected work unit
            Array.prototype.push.apply(self.wrkUnitsArray(), slctdCaseDetails[0].work_unit);

            self.wrkUnitsTblData(new oj.ArrayDataProvider(slctdCaseDetails[0].work_unit));
            resolve();
          }
          else {
            reject();
          }
        });

        childData.then(function (res) {
          document.querySelector("#wrkUntDlg").open();
        });

        childData.catch(function (err) {
          alert("There was some error while getting work units");
        })
      };

      this.selectedWrkUntChangedListener = function (event, data) {
      }

      self.selectedWrkUntRow = new keySet.ObservableKeySet();

      this.proplisttblcolumnArray = [
        {
          "headerText": "Property ID",
          "sortable": "enabled",
          "field": "Property_ID",
          "sortProperty": "Property_ID"
        },
        {
          "headerText": "Property Type",
          "sortable": "enabled",
          "field": "Property_Type",
          "sortProperty": "Property_Type"
        }, {
          "headerText": "Property Status",
          "sortable": "enabled",
          "field": "Property_Status",
          "sortProperty": "Property_Status"
        }
      ];

      self.proplistTblData = ko.observable();

      this.openPropDetailsDialog = function (workUnitNumber, data, event) {
        event.preventDefault();
        console.log("ROW KEY ", workUnitNumber);

        new Promise(function (resolve, reject) {
          let wUnitObj = self.wrkUnitsArray().filter(wObj => wObj.Work_Unit_Number === workUnitNumber);
          console.log(wUnitObj[0].property_list);
          self.proplistTblData(new oj.ArrayDataProvider(wUnitObj[0].property_list));
          resolve();
        }).then(function (resp) {
          document.querySelector("#proplistDlg").open();
        }).catch(function (err) {
          alert("There was some error while getting property lists ", err);
        })
      };

      this.handleOKClose = function () {
        document.querySelector("#wrkUntDlg").close();
      };
      this.handlePropTblOKClose = function () {
        document.querySelector("#proplistDlg").close();
      };
    }



    return rcViewModel;
  });