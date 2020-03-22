
import * as ko from "knockout";
import "ojs/ojtable";
import "ojs/ojmodel";
import { oj } from "@oracle/oraclejet/dist/types";
import {KeySet} from "ojs/ojkeyset";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import {ObservableKeySet} from "ojs/ojknockout-keyset";
class DashboardViewModel {

  public deptObservableArray: ko.ObservableArray<any> = ko.observableArray([]);
  dataprovider: ko.Observable = ko.observable();
  currentSelection : ko.Observable<any>= ko.observable("0");
  selectedItem : ko.Observable<String> = ko.observable("0");;
  selectedRows = ko.observable();
  constructor() {
    var self = this;
    var deptArray = [{ DepartmentId: 3, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 5, DepartmentName: 'BB', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 40, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 50, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 90, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 100, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300 },
        { DepartmentId: 26022, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 27022, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 28022, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 29022, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 310022, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 311022, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 312022, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300 },
    { DepartmentId: 313022, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300 }];
    self.deptObservableArray(deptArray);
    self.dataprovider(new ArrayDataProvider(self.deptObservableArray(), { keyAttributes: 'DepartmentId' }));

console.log(self.deptObservableArray());

ko.computed(() => {
  console.log(self.currentSelection());
  if (self.currentSelection()) {
      
      //We've set selection to single. If you want to support multiple 
      // you would change the code below to get both start and end index
      var value = this.deptObservableArray[self.currentSelection()[0].startIndex];
      return JSON.stringify(value);
      console.log(value);
      self.selectedItem(value);
  } else {
      return "Nothing Selected";
  }
});

//this.selectedRows = new KeySet.ObservableKeySet();

}



  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  connected(): void {
    // implement if needed
  }

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  disconnected(): void {
    // implement if needed
  }

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  transitionCompleted(): void {
    // implement if needed
  }
}

export default DashboardViewModel;
