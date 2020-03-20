define(['knockout', 'ojs/ojrouter', 'text!casedetails.json', 'ojs/ojanimation', 'text!activity.json', 'ojs/ojpagingdataproviderview', 'ojs/ojarraydataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojknockout-keyset', 'ojs/ojmodule-element-utils', 'store/index', 'store/actions', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojlabel', 'ojs/ojpopup', 'ojs/ojselectcombobox', 'ojs/ojlabel', 'ojs/ojcheckboxset'], function (ko, Router, caseDetails, AnimationUtils, activityDetails, PagingDataProviderView, ArrayDataProvider, KnockoutTemplateUtils, keySet, ModuleElementUtils, store, actions) {
    function caseDetailsModel() {
        var self = this;
        self.filter = ko.observable();
        self.caseArray = ko.observableArray([]);
        self.caseDetails = ko.observableArray([]);

        self.caseTblPgDataProvider = ko.observable(new PagingDataProviderView(new oj.ArrayDataProvider(self.caseArray, { keyAttributes: 'Case_Number' })));

        self.connected = function () {
            store.dispatch(actions.loadCaseDetails());
        };
        
        store.subscribe(() => {
            self.caseDetails(store.getState().caseDetails.allCases);
            self.caseArray(generateCaseArray());
            self.caseTblPgDataProvider(new PagingDataProviderView(new oj.ArrayDataProvider(self.caseArray, { keyAttributes: 'Case_Number' })));
        });

        function generateCaseArray(num) {
            return self.caseDetails().map(item => ({
                Case_Number: item.Case_Number,
                Case_Name: item.Case_Name,
                Status: item.Status,
                Created_Date: item.Created_Date,
                Work_units: item.Work_units,
                Remarks: item.Remarks
            }));
        };

        self.highlightChars = [];

        self.handleValueChanged = function () {
            self.highlightChars = [];
            var filter = document.getElementById('filter').rawValue;
            console.log('Inside handleValueChanged, filter:', filter);

            if (filter.length == 0) {
                self.clearClick();
                return;
            }
            var caseArrayFiltered = [];
            var i, id;

            for (i = self.caseArray().length - 1; i >= 0; i--) {
                id = (self.caseArray())[i].Case_Number;

                Object.keys((self.caseArray())[i]).forEach(function (field) {
                    if ((self.caseArray())[i][field].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                        this.highlightChars[id] = this.highlightChars[id] || {};
                        this.highlightChars[id][field] = getHighlightCharIndexes(filter, (self.caseArray())[i][field]);
                        if (caseArrayFiltered.indexOf(this.caseArray[i]) < 0) {
                            caseArrayFiltered.push((self.caseArray())[i]);
                        }
                    }
                }.bind(this));
            }
            caseArrayFiltered.reverse();

            // self.caseTblData(new oj.ArrayDataProvider(caseArrayFiltered, { keyAttributes: 'Case_Number' }));
            self.caseTblPgDataProvider(new PagingDataProviderView(new oj.ArrayDataProvider(caseArrayFiltered, { keyAttributes: 'Case_Number' })));

            function getHighlightCharIndexes(highlightChars, text) {
                var highlightCharStartIndex = text.toString().toLowerCase().indexOf(highlightChars.toString().toLowerCase());
                return { startIndex: highlightCharStartIndex, length: highlightChars.length };
            }
        }.bind(this);

        self.clearClick = function (event) {
            self.filter('');
            // self.caseTblData(new oj.ArrayDataProvider(self.caseArray, { keyAttributes: 'Case_Number' }));
            self.caseTblPgDataProvider(new PagingDataProviderView(new oj.ArrayDataProvider(self.caseArray, { keyAttributes: 'Case_Number' })));

            this.highlightChars = [];
            document.getElementById('filter').value = "";
            return true;
        }.bind(this);

        this.highlightingCellRenderer = function (context) {
            var id = context.row.Case_Number;
            var startIndex = null;
            var length = null;
            var field = null;
            if (context.columnIndex === 0) {
                field = 'Case_Number';
            }
            else if (context.columnIndex === 1) {
                field = 'Case_Name';
            }
            else if (context.columnIndex === 2) {
                field = 'Status';
            }
            else if (context.columnIndex === 3) {
                field = 'Created_Date';
            } else if (context.columnIndex === 4) {
                field = 'Work_units';
            } else if (context.columnIndex === 5) {
                field = 'Remarks';
            }

            var data = context.row[field].toString();
            if (this.highlightChars[id] != null &&
                this.highlightChars[id][field] != null) {
                startIndex = this.highlightChars[id][field].startIndex;
                length = this.highlightChars[id][field].length;
            }

            if (startIndex != null && length != null) {
                var highlightedSegment = data.substr(startIndex, length);
                data = data.substr(0, startIndex) + '<b>' + highlightedSegment + '</b>' + data.substr(startIndex + length, data.length - 1);
            }
            context.cellContext.parentElement.innerHTML = data;

        }.bind(this);

        this.columnArrayDetails = [{
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
        self.wrkUntFilter = ko.observableArray();

        function generateWorkUnitArray(num) {
            var workUnitArray = [];
            var i, j, count = 0;
            for (j = 0; j < self.wrkUnitsArray().length; j++) {
                // console.log("self.wrkUnitsArray().length:", self.wrkUnitsArray().length);
                // console.log("self.wrkUnitsArra()[j]:", self.wrkUnitsArray()[j]);         
                workUnitArray[count] = {};
                workUnitArray[count].Work_Unit_Number = self.wrkUnitsArray()[j].Work_Unit_Number;
                workUnitArray[count].Work_unit_Type = self.wrkUnitsArray()[j].Work_unit_Type;
                workUnitArray[count].Business_Event_Date = self.wrkUnitsArray()[j].Business_Event_Date;
                workUnitArray[count].Property_IDs = self.wrkUnitsArray()[j].Property_IDs;
                count++;
            }
            return workUnitArray;
        };

        function getHighlightCharIndexesWrkUnits(highlightChars, text) {
            var highlightedWorkUnitCharStartIndex = text.toString().toLowerCase().indexOf(highlightChars.toString().toLowerCase());
            return { startIndex: highlightedWorkUnitCharStartIndex, length: highlightChars.length };
        }

        self.handleWrkUnitValueChanged = function (evt, context) {
            let srchVal = evt.target.rawValue;
            console.log("handleWrkUnitValueChanged called ", srchVal);
            self.highlightChars = [];
            var wrkUntFilter = srchVal;

            if (wrkUntFilter !== undefined) {
                if ((wrkUntFilter !== undefined) && (wrkUntFilter.length == 0)) {
                    self.clearWrkUnitClick();
                    return;
                }
                var workUnitArray = [];
                var i, id;

                for (i = self.workUnitArray.length - 1; i >= 0; i--) {
                    id = self.workUnitArray[i].Work_Unit_Number;

                    Object.keys(self.workUnitArray[i]).every(function (field, index) {
                        if (self.workUnitArray[i][field].toString().toLowerCase().indexOf(wrkUntFilter.toLowerCase()) >= 0) {
                            // self.highlightChars[id] = self.highlightChars[id] || {};
                            // self.highlightChars[id][field] = getHighlightCharIndexesWrkUnits(wrkUntFilter, self.workUnitArray[i][field]);
                            // if (workUnitArray.indexOf(self.workUnitArray[i]) < 0){
                            //   workUnitArray.push(self.workUnitArray[i]);
                            // }
                            workUnitArray.push(self.workUnitArray[i]);
                            return false;
                        }
                        else return true;
                    });
                }
                workUnitArray.reverse();
                self.wrkUnitsTblData(new oj.ArrayDataProvider(workUnitArray, { keyAttributes: 'Work_Unit_Number' }));

            }

        };

        self.clearWrkUnitClick = function (event) {
            console.log("clearWrkUnitClick called ", event);
            self.wrkUntFilter('');
            self.wrkUnitsTblData(new oj.ArrayDataProvider(self.workUnitArray, { keyAttributes: 'Work_Unit_Number' }));
            this.highlightChars = [];
            document.getElementById('wrkUntFilter').value = "";
            return true;
        }.bind(this);

        this.highlightingCellRenderer = function (context) {
            var id = context.row.Work_Unit_Number;
            var startIndex = null;
            var length = null;
            var field = null;

            if (context.columnIndex === 0) {
                field = 'Work_Unit_Number';
            }
            else if (context.columnIndex === 1) {
                field = 'Work_unit_Type';
            }
            else if (context.columnIndex === 2) {
                field = 'Business_Event_Date';
            }
            else if (context.columnIndex === 3) {
                field = 'Property_IDs';
            }

            var data = context.row[field].toString();
            if (this.highlightChars[id] != null &&
                this.highlightChars[id][field] != null) {
                startIndex = this.highlightChars[id][field].startIndex;
                length = this.highlightChars[id][field].length;
            }

            if (startIndex != null &&
                length != null) {
                var highlightedSegment = data.substr(startIndex, length);
                data = data.substr(0, startIndex) + '<b>' + highlightedSegment + '</b>' + data.substr(startIndex + length, data.length - 1);
            }
            context.cellContext.parentElement.innerHTML = data;

        }.bind(this);

        self.openWrkUntDialog = function (caseNumber, data, event) {
            event.preventDefault();
            console.log("ROW KEY:", caseNumber);

            let childData = new Promise(function (resolve, reject) {
                console.log("IN PROMISE");
                let slctdCaseDetails = self.caseDetails().filter(obj => obj.Case_Number === caseNumber);

                if (slctdCaseDetails) {
                    self.wrkUnitsArray([]);
                    //The below observable Array will help to get the property_lists for the selected work unit
                    Array.prototype.push.apply(self.wrkUnitsArray(), slctdCaseDetails[0].work_unit);

                    self.workUnitArray = generateWorkUnitArray();
                    console.log("workUnitArray:", self.workUnitArray);

                    self.wrkUnitsTblData(new oj.ArrayDataProvider(self.workUnitArray, { keyAttributes: 'Work_Unit_Number' }));

                    self.highlightChars = [];

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

        self.propListArray = ko.observableArray([]);
        self.propListFilter = ko.observableArray();

        function generatePropListArray(num) {
            var propertyListArray = [];
            var i, j, count = 0;
            for (j = 0; j < self.propListArray().length; j++) {
                propertyListArray[count] = {};
                propertyListArray[count].Property_ID = self.propListArray()[j].Property_ID;
                propertyListArray[count].Property_Type = self.propListArray()[j].Property_Type;
                propertyListArray[count].Property_Status = self.propListArray()[j].Property_Status;
                count++;
            }
            return propertyListArray;
        };

        function getHighlightCharIndexesPropLists(highlightChars, text) {
            var highlightedPropListCharStartIndex = text.toString().toLowerCase().indexOf(highlightChars.toString().toLowerCase());
            return { startIndex: highlightedPropListCharStartIndex, length: highlightChars.length };
        }

        self.handlePropListFilterValueChanged = function (evt, context) {
            let srchVal = evt.target.rawValue;
            console.log("handlePropListFilterValueChanged called ", srchVal);
            self.highlightChars = [];
            var propListFilter = srchVal;

            if (propListFilter !== undefined) {
                if ((propListFilter !== undefined) && (propListFilter.length == 0)) {
                    self.clearPropListClick();
                    return;
                }
                var propertyListArray = [];
                var i, id;

                for (i = self.propertyListArray.length - 1; i >= 0; i--) {
                    id = self.propertyListArray[i].Property_ID;

                    Object.keys(self.propertyListArray[i]).every(function (field, index) {
                        if (self.propertyListArray[i][field].toString().toLowerCase().indexOf(propListFilter.toLowerCase()) >= 0) {
                            // self.highlightChars[id] = self.highlightChars[id] || {};
                            // self.highlightChars[id][field] = getHighlightCharIndexesPropLists(propListFilter, self.propertyListArray[i][field]);
                            // if (propertyListArray.indexOf(self.propertyListArray[i]) < 0){
                            //   propertyListArray.push(self.propertyListArray[i]);
                            // }
                            propertyListArray.push(self.propertyListArray[i]);
                            return false;
                        }
                        else return true;
                    });
                }
                propertyListArray.reverse();
                self.proplistTblData(new oj.ArrayDataProvider(propertyListArray, { keyAttributes: 'Property_ID' }));

            }

        };

        self.clearPropListClick = function (event) {
            console.log("clearPropListClick called ", event);
            self.propListFilter('');
            self.proplistTblData(new oj.ArrayDataProvider(self.propertyListArray, { keyAttributes: 'Property_ID' }));
            this.highlightChars = [];
            document.getElementById('propListFilter').value = "";
            return true;
        }.bind(this);


        this.openPropDetailsDialog = function (workUnitNumber, data, event) {
            event.preventDefault();
            console.log("ROW KEY ", workUnitNumber);

            new Promise(function (resolve, reject) {
                let wUnitObj = self.wrkUnitsArray().filter(wObj => wObj.Work_Unit_Number === workUnitNumber);
                console.log(wUnitObj[0].property_list);

                self.propListArray([]);
                Array.prototype.push.apply(self.propListArray(), wUnitObj[0].property_list);

                self.propertyListArray = generatePropListArray();
                console.log("propertyListArray:", self.propertyListArray);

                // self.proplistTblData(new oj.ArrayDataProvider(wUnitObj[0].property_list));
                self.proplistTblData(new oj.ArrayDataProvider(self.propertyListArray, { keyAttributes: 'Property_ID' }));

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
    return caseDetailsModel;

});