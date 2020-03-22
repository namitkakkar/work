define(["require", "exports", "knockout", "./calculator", "ojs/ojarraydataprovider", "ojs/ojinputtext", "ojs/ojinputnumber", "ojs/ojcore", "ojs/ojlabel", "ojs/ojbutton", "ojs/ojtable", "ojs/ojbutton", "ojs/ojarraytabledatasource", "ojs/ojarraydataprovider"], function (require, exports, ko, calculator_1, ArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SampleViewModel {
        constructor() {
            this.num1 = ko.observable(0);
            this.num2 = ko.observable(0);
            this.dataprovider = ko.observable();
            this.deptArray = ko.observableArray([]);
            this.inputDepartmentId = ko.observable(0);
            this.inputLocationId = ko.observable(0);
            this.inputManagerId = ko.observable(0);
            this.groupValid = ko.observable(0);
            this.callActionSum = (event, oper) => {
                console.log(this.num1());
                console.log(this.num2());
                console.log(oper);
                if (oper == 'sum') {
                    this.finalNum(new calculator_1.default().addition(this.num1(), this.num2()));
                }
                if (oper == 'sub') {
                    this.finalNum(new calculator_1.default().subtraction(this.num1(), this.num2()));
                }
                if (oper == 'mul') {
                    this.finalNum(new calculator_1.default().multiplication(this.num1(), this.num2()));
                }
                if (oper == 'div') {
                    this.finalNum(new calculator_1.default().division(this.num1(), this.num2()));
                }
                return true;
            };
            // next task 
            this.addRow = (event) => {
                console.log("ADD ROW :");
                let dept = {
                    DepartmentId: this.inputDepartmentId(),
                    DepartmentName: this.inputDepartmentName(),
                    LocationId: this.inputLocationId(),
                    ManagerId: this.inputManagerId()
                };
                // this.deptArray().push(dept);
                console.log(dept);
                this.deptArray.push(dept);
            };
            this.updateRow = (event) => {
                console.log("update ROW :");
            };
            this.removeRow = (event) => {
                console.log("Delete ROW :");
            };
            this.removeAllRows = (event) => {
                console.log("Remove ALL ROW :");
            };
            // var oj = require('ojs/ojcore');
            let self = this;
            self.finalNum = ko.observable(0);
            this.buttonSumText = "SUM";
            self.num1.subscribe(function (data) {
                console.log(self.num1());
            });
            self.num2.subscribe(function (data) {
                console.log(self.num2());
            });
            self.inputDepartmentId = ko.observable();
            self.inputDepartmentName = ko.observable();
            self.inputLocationId = ko.observable();
            self.inputManagerId = ko.observable();
            self.groupValid = ko.observable();
            var deptArray = ([{ inputDepartmentId: 3, inputDepartmentName: 'ADFPM 1001 neverending', inputLocationId: 200, inputManagerId: 300 },
                { inputDepartmentId: 5, inputDepartmentName: 'BB', inputLocationId: 200, inputManagerId: 300 },
                { inputDepartmentId: 10, inputDepartmentName: 'Administration', inputLocationId: 200, inputManagerId: 300 },
                { inputDepartmentId: 10011, inputDepartmentName: 'Administration12', inputLocationId: 200, inputManagerId: 300 },
                { inputDepartmentId: 11011, inputDepartmentName: 'Marketing13', inputLocationId: 200, inputManagerId: 300 },
                { inputDepartmentId: 313022, inputDepartmentName: 'Human Resources15', inputLocationId: 200, inputManagerId: 300 }]);
            this.dataProvider = new ArrayDataProvider(deptArray, { keyAttributes: 'inputDepartmentId' });
        }
        ;
        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        connected() {
            // implement if needed
        }
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        disconnected() {
            // implement if needed
        }
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        transitionCompleted() {
            // implement if needed
        }
    }
    exports.default = SampleViewModel;
});
//# sourceMappingURL=sample.js.map