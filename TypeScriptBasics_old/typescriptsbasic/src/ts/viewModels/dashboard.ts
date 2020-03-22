
import * as ko from "knockout";
import "ojs/ojinputtext";
import "ojs/ojinputnumber"
import "ojs/ojcore"
import "ojs/ojlabel";
import "ojs/ojbutton";
import * as Bootstrap from 'ojs/ojbootstrap';
import { ojButtonEventMap } from 'ojs/ojbutton';
import 'ojs/ojbutton';
import Calculator from "./calculator";
import { oj } from "@oracle/oraclejet/dist/types";
declare var require: any;

class DashboardViewModel {
  public num1: ko.Observable<number> = ko.observable(0);
  public num2: ko.Observable<number> = ko.observable(0);;
  public finalNum: ko.Observable<number>= ko.observable(0);;
  constructor() {
 
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
