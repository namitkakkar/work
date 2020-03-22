
import * as ko from "knockout";

import "ojs/ojinputtext";
import "ojs/ojformlayout";
import "ojs/ojaccordion";


class Calculator {
  private $metadata: any;
  private $variables: any;

  firstNum: number;
  secondNum: number;
  finalCount: number;
  public callAction: Function;


  constructor() {
    let self = this;
  }
  /*
   * Your viewModel code goes here
   */
  addition(x: number, y: number): number {
    const s = parseInt(x.toString())+parseInt(y.toString());

    console.log(s );
    return (s);
  }

  subtraction(x: number, y: number): number {
    return (x.valueOf() - y.valueOf());
  }

  multiplication(x: number, y: number): number {
    return (x.valueOf() * y.valueOf());
  }

  division(x: number, y: number): number {
    return (x.valueOf() / y.valueOf());
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

export default Calculator;
