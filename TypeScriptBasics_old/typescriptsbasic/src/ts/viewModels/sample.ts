
import * as ko from "knockout";

import "ojs/ojinputtext";
import "ojs/ojinputnumber"
import "ojs/ojcore"
import "ojs/ojlabel";
import "ojs/ojbutton";
import "ojs/ojtable";
import * as Bootstrap from 'ojs/ojbootstrap';
import { ojButtonEventMap } from 'ojs/ojbutton';
import 'ojs/ojbutton';
import Calculator from "./calculator";
import "ojs/ojarraytabledatasource";
import "ojs/ojarraydataprovider";
import * as ArrayDataProvider from 'ojs/ojarraydataprovider';
import { oj } from "@oracle/oraclejet/dist/types";
declare var require: any;

class SampleViewModel {


  public num1: ko.Observable<number> = ko.observable(0);
  public num2: ko.Observable<number> = ko.observable(0);;
  public finalNum: ko.Observable<number>;
  public dataprovider: ko.Observable<any> = ko.observable();
  public deptArray: ko.ObservableArray<any> = ko.observableArray([{ DepartmentId: 3, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 5, DepartmentName: 'BB', inputLocationId: 200, LocationId: 300, ManagerId: 880 },
  { DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 10011, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 11011, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 313022, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300 }]);

  public inputDepartmentId: ko.Observable<number> = ko.observable(0);
  public inputDepartmentName: ko.Observable<String>;
  public inputLocationId: ko.Observable<number> = ko.observable(0);
  public inputManagerId: ko.Observable<number> = ko.observable(0);
  public groupValid: ko.Observable<number> = ko.observable(0);
  public rowData: ko.Observable<any> = ko.observable();
  
  buttonSumText: string;
  // public selectedItem : ko.Observable<string>;

  deptDataProvider: ArrayDataProvider<string, string>;

  constructor() {
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
    this.deptDataProvider = new ArrayDataProvider(this.deptArray, { keyAttributes: 'inputDepartmentId' });
    console.log(this.deptDataProvider);
  }


  public callAction = (event: ojButtonEventMap['ojAction'], oper) => {
    console.log(this.num1());
    console.log(this.num2());
    console.log(oper);
    if (oper == 'sum') {
      this.finalNum(new Calculator().addition(this.num1(), this.num2()));
    }
    if (oper == 'sub') {
      this.finalNum(new Calculator().subtraction(this.num1(), this.num2()));
    }
    if (oper == 'mul') {
      this.finalNum(new Calculator().multiplication(this.num1(), this.num2()));
    }
    if (oper == 'div') {
      this.finalNum(new Calculator().division(this.num1(), this.num2()));
    }

    return true;
  };

  // next task 

  public addRow = (event: ojButtonEventMap['ojAction']) => {
    console.log("ADD ROW :")
    let dept = {
      DepartmentId: this.inputDepartmentId(),
      DepartmentName: this.inputDepartmentName(),
      LocationId: this.inputLocationId(),
      ManagerId: this.inputManagerId()
    };
    console.log(dept);
    this.deptArray.push(dept);
  }

  public updateRow = (event: ojButtonEventMap['ojAction']) => {
    console.log("update ROW :")
    console.log(this.inputDepartmentName());
    this.rowData().DepartmentName = this.inputDepartmentName();
    this.rowData().LocationId = this.inputLocationId();
    this.rowData().ManagerId = this.inputManagerId();
    console.log(this.rowData());
    const upatedArr = this.deptArray().map(item => {
      if (item.DepartmentId === this.rowData().DepartmentId) return this.rowData();
      else return item;
    });
    console.log(upatedArr);
    this.deptArray(upatedArr);
  }

  public selectionHandler = (event) => {

    console.log(JSON.stringify(event.detail.value.data));
    this.rowData((event.detail.value.data));
    this.inputDepartmentId(this.rowData().DepartmentId);
    this.inputDepartmentName(this.rowData().DepartmentName);
    this.inputLocationId(this.rowData().LocationId);
    this.inputManagerId(this.rowData().ManagerId);
  }


  public removeRow = (event: ojButtonEventMap['ojAction']) => {
    console.log("Delete ROW :")
    this.deptArray.remove(this.rowData());
  }

  public removeAllRows = (event: ojButtonEventMap['ojAction']) => {
    console.log("Remove ALL ROW :")
    this.deptArray.removeAll();
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

export default SampleViewModel;
