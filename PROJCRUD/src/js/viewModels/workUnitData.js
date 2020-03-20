define(['knockout', 'ojs/ojrouter', 'ojs/ojanimation', 'ojs/ojarraydataprovider', 'ojs/ojcollectiondataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojknockout-keyset', 'ojs/ojmodule-element-utils', 'store/index', 'store/actions', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojpopup', 'ojs/ojselectcombobox', 'ojs/ojlabel', 'ojs/ojcheckboxset', 'ojs/ojdialog'],
    function (ko, Router, AnimationUtils, ArrayDataProvider, CollectionDataProvider, KnockoutTemplateUtils, keySet, ModuleElementUtils, store, actions) {
        function workUnitViewModel(param) {
            var self = this;

            self.wuArray = ko.observableArray([]);
            self.workUnitDataProvider = ko.observable(new ArrayDataProvider(self.wuArray(), { keyAttributes: 'WORK_UNIT_TYPE' }));
            self.workUnitCollection = ko.observable();
            self.workUnitNumber = ko.observable();
            self.urlWorkUnitNum = getUrlVars()['wu_number'];

            self.workUnitColumnArray = [
                { "headerText": "Business Event Date", "field": "CREATED_DATE" },
                { "headerText": "Category", "field": "CATEGORY" },
                { "headerText": "Sub Category", "field": "SUBCATEGORY" },
                { "headerText": "Work Unit Type", "field": "WORK_UNIT_TYPE" },
                { "headerText": "Work Unit Status", "field": "STATUS" },
                { "headerText": "Assignment Pool", "field": "ASSIGNMENT_POOL" },
                { "headerText": "AAU Name", "field": "" },
                { "headerText": "AAU Relationship Type", "field": "" },
            ];

            self.connected = function () {
                store.dispatch(actions.fetchWorkUnit(self.urlWorkUnitNum));
                store.subscribe(() => {
                    let items = store.getState().workUnit;
                   
                   console.log("wu_number::",items);
                   
                    if(items!==undefined && items.length>0){
                        console.log("items::", items);
                        self.wuArray(items);
                        self.workUnitNumber(items[0].WU_NUMBER);
                        self.workUnitDataProvider(new ArrayDataProvider(self.wuArray(), { keyAttributes: 'WORK_UNIT_TYPE' }));
                        console.log("provider::",self.workUnitDataProvider());
                    }   
                });
            };
          
            self.buttonClick = function (event) {
                self.clickedButton(event.currentTarget.id);
                return true;
            }

            function getUrlVars() {
                var vars = {};
                var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                    vars[key] = value;
                });
                return vars;
            }
        }

        return workUnitViewModel;
    });
