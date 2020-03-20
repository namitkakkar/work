define(['knockout', 'ojs/ojrouter', 'text!casedetails.json', 'ojs/ojanimation', 'text!activity.json', 'ojs/ojarraydataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojknockout-keyset', 'ojs/ojmodule-element-utils', 'store/index', 'store/actions', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojpopup', 'ojs/ojselectcombobox', 'ojs/ojlabel', 'ojs/ojcheckboxset', 'ojs/ojdialog'],
    function (ko, Router, caseDetails, AnimationUtils, activityDetails, ArrayDataProvider, KnockoutTemplateUtils, keySet, ModuleElementUtils, store, actions) {
        function viewModel(param) {
            var self = this;
            self.activityDetails = ko.observable();
            self.router = Router.rootInstance;

            self.activityArray = ko.observableArray([]);
            self.recordMaintainance = ko.observableArray();
            self.dataProvider = ko.observable();
            self.activity = ko.observableArray();
            self.activityName = ko.observable();
            self.activityNumber = ko.observable(91030);
            self.category = ko.observable();
            self.subCategory = ko.observable();
            self.selectedActivity = ko.observable();
            self.selectedNewActivity = ko.observable();
            self.activityPopupModuleConfig = ko.observable({ 'view': [], 'viewModel': null });
            self.selectedChoice = ko.observable();
            self.selectedItem = ko.observable();
            self.actDetails = ko.observable();
            self.activityDataProvider = ko.observable();
            self.activityValue = ko.observable();
            self.completeLov = store.getState().lovs.Lov;
            self.selectedItems = new keySet.ObservableKeySet();

            self.connected = function () {

               // store.dispatch(actions.loadCaseActivities());
                //store.subscribe(() => {
                    //console.log("On load");
                    let caseActivities = store.getState().caseActivities;
                    let recordActivities = store.getState().recordActivities;
                    console.log("Case Activities:::",caseActivities);
                    console.log("Tab Name:::", param.tabName);
                    switch (param.tabName) {
                        case 'CASE_MANAGEMENT':
                            self.actDetails(self.completeLov.caseManagementActivityLov.Activity);
                            self.activityDetails(self.completeLov.caseManagementActivityLov);
                            console.log("RELOAD before:::", caseActivities.length);
                            if(caseActivities!==undefined && caseActivities.length!==undefined){
                               console.log("Reload true");
                               self.activityArray(caseActivities);
                               
                            }
                            break;
                        case 'RECORD_MAINTANANCE':  
                            self.actDetails(self.completeLov.recordMaintananceLov.Activity);
                            self.activityDetails(self.completeLov.recordMaintananceLov);
                            console.log("record Activities::::", recordActivities);
                            if(recordActivities!==undefined && recordActivities.length!==undefined){
                                self.activityArray(recordActivities);
                            }
                            break;
                        case 'eligibilityDetermination':
                            self.activityDetails = JSON.parse(activityDetails);

                            break;
                        default:
                            self.activityDetails = JSON.parse(activityDetails);
                    }
                    self.activityDataProvider = new ArrayDataProvider(self.activityArray, { keyAttributes: 'id' });
                //});

            };

            // mapList = {
            //     "mapValues": [{
            //         "id": "create work unit",
            //         "value": "createWorkUnit"
            //     },
            //     {
            //         "id": "permit data entry",
            //         "value": "permitDateEntry"
            //     },
            //     {
            //         "id": "update costs",
            //         "value": "updateCosts"
            //     },
            //     {
            //         "id": "electronic permits",
            //         "value": "electronicPermits"
            //     }]
            // }


            self.moduleConfig = null;
            self.activityDataProvider = new ArrayDataProvider(self.activityArray, { keyAttributes: 'id' });
            //Map<String, string> 
            //Map.put('ADD_WORKUNIT', 'createWorkUnit');
            /* if (param == 'Case management') {
                self.dataProvider(new ArrayDataProvider(self.casemanagementActivity));
            } else if (param == 'Record Maintainance') {
                self.dataProvider(new ArrayDataProvider(self.recordMaintainance));
            } */
            /* function onclick(event){
                map.get(event.id);
                moduleconfig
            } */
           
            self.addActivityListner = function () {
                var popup = document.getElementById('addActivityPopup');
                popup.open('#btnGo');
            }
            self.handleCheckbox = function (context, id) {
                let selectedStatus = null;
                if(self.activityArray()!==undefined && self.activityArray().length!==undefined){
                self.activityArray().forEach(function (item) {
                    if (item.id == context) {
                        selectedStatus = item.completed;
                    }
                });
                if (selectedStatus == "Yes") {
                    return ["Yes"];
                }
                }
            }

            function toCamelCase(str) {
                // Lower cases the string
                return str.toLowerCase()
                    // Replaces any - or _ characters with a space 
                    .replace(/[-_]+/g, ' ')
                    // Removes any non alphanumeric characters 
                    .replace(/[^\w\s]/g, '')
                    // Uppercases the first character in each group immediately following a space 
                    // (delimited by spaces) 
                    .replace(/ (.)/g, function ($1) { return $1.toUpperCase(); })
                    // Removes spaces 
                    .replace(/ /g, '');
            }

            self.popupListener = function (data) {
                if (event == undefined || event.target.id !== "activityPopup")
                    return;
                console.log("inside popup listener");
                let actData = data[0];
                let act = actData[0].split("-");
                self.activityName(act[0]);

                let selActivity = act[0].trim();
                self.selectedNewActivity = toCamelCase(selActivity);

                self.activityValue(act[1]);
                self.selectedActivity(act[0]);
                self.activityPopupModuleConfig({ 'view': [], 'viewModel': null });
                var viewPath = 'views/' + self.selectedNewActivity + '.html';
                var modelPath = 'viewModels/' + self.selectedNewActivity;

                var activityModulePromise = Promise.all([
                    ModuleElementUtils.createView({ 'viewPath': viewPath }),
                    ModuleElementUtils.createViewModel({ 'viewModelPath': modelPath })
                ]);
                activityModulePromise.then(
                    function (values) {
                        console.log("inside promise");
                        self.activityPopupModuleConfig({ 'view': values[0], 'viewModel': values[1] });
                    }
                )

                let activityPopup = document.getElementById('popupactivity');
                activityPopup.open('#activityPopup');

            }
            /* self.popupOpenListener = function() {
               console.log("Inside Popup Listener");
               
            } */
            self.openPopup = function () {

                var node = document.querySelector("#createWork");
                var busyContext = oj.Context.getContext(node).getBusyContext();
                busyContext.whenReady().then(function () {
                    /* var component = document.querySelector("#myInput");
                    component.value = "foo";
                    component.validate().then(function (isValid) {
                        if (!isValid)
                            component.value = "foobar";
                    }); */
                    let activityPopup = document.getElementById('popupactivity');
                    activityPopup.open('#activityPopup');
                });
            }

            self.startPopupListener = function (event) {

                if (event == undefined || event.target.id !== "popupactivity")
                    return;
                var ui = event.detail;
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
            self.checkboxListener = function (event) {
                if (event.detail != null) {
                    var value = event.detail.value;

                    // need to convert to Number to match the DepartmentId key type
                    var key = event.target.dataset.rowKey;

                    if (value !== undefined && value.length > 0 && !self.selectedItems().has(key)) {
                        self.selectedItems.add([key]);
                    }
                    else if (value !== undefined && value.length === 0 && self.selectedItems().has(key)) {
                        self.selectedItems.delete([key]);
                    }
                }
            }
            self.add = function () {
               console.log("Selected Items::", self.selectedItem());
               

                let data = {
                    "id": self.activityNumber(),
                    "activity": self.selectedItem() + " - " + self.activityNumber() + 1,
                    "comments": "",
                    "DateCompleted": "",
                    "Duration": "",
                    "overTime": "",
                    "completed": "Yes"
                }
                console.log(data);
                self.activityNumber(self.activityNumber() + 1);
                self.activityArray().push(data);
                console.log(self.activityArray());
                switch (param.tabName) {
                    case 'CASE_MANAGEMENT':
                        store.dispatch(actions.loadCaseActivities(self.activityArray()));
                        self.activityArray(store.getState().caseActivities);
                        break;
                    case 'RECORD_MAINTANANCE':
                        store.dispatch(actions.loadRecordActivities(self.activityArray()));
                        self.activityArray(store.getState().recordActivities);
                        break;

                    case 'eligibilityDetermination':
                        self.activityDetails = JSON.parse(activityDetails);

                        break;
                    default:
                        self.activityDetails = JSON.parse(activityDetails);
                }


                console.log("Get Activity State::::", store.getState());
                let popup = document.getElementById('addActivityPopup');
                popup.close();
            }
            // self.actDetails = self.activityDetails.Activity;
            // console.log(self.activityDetails);
            // console.log(self.actDetails);
            self.cancel = function () {
                let popup = document.getElementById('addActivityPopup');
                popup.close();
            }
            self.close = function () {
                let popup = document.getElementById('popupactivity');
                popup.close();
            }
            self.filteredItems = ko.computed(function () {
                let filter = self.selectedChoice();

                if (!filter) {
                    if (!self.activityDetails()) return [];
                    return self.activityDetails().ActivityList.subActivity[0];
                } else {
                    let filtered;
                    let filterPromise=Promise.all([
                        filtered=ko.utils.arrayFilter(self.activityDetails().ActivityList.subActivity, function (item) {
                            return (item.id === filter);
                        })
                    ]);
                   filterPromise.then(function(){
                    self.selectedItem(filtered[0].value);
                   });
                   return filtered;
                }
            })
            self.startAnimationListener = function (event) {
                var ui = event.detail;
                if (event.target.id !== "addActivityPopup")
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
            self.columnArray = [
                {
                    "headerText": "",
                    "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_erase", true)
                },
                {
                    "headerText": "",
                    "field": "", "renderer": KnockoutTemplateUtils.getRenderer("activity_edit", true)
                },
                {
                    "headerText": "Activity",
                    "field": "activity", "renderer": KnockoutTemplateUtils.getRenderer("activity_name", true)
                },
                {
                    "headerText": "Comments",
                    "field": "comments", "renderer": KnockoutTemplateUtils.getRenderer("activity_comment", true)
                },
                {
                    "headerText": "Date Completed",
                    "field": "DateCompleted", "renderer": KnockoutTemplateUtils.getRenderer("activity_datecompleted", true)
                },
                {
                    "headerText": "Duration",
                    "field": "Duration", "renderer": KnockoutTemplateUtils.getRenderer("activity_duration", true)
                },
                {
                    "headerText": "overTime",
                    "field": "overTime", "renderer": KnockoutTemplateUtils.getRenderer("activity_overtime", true)
                },
                {
                    "headerText": "Completed",
                    "field": "completed",  
                }];
        }

        return viewModel;
    });