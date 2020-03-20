import * as ko from "knockout";
import rootViewModel from "./appController";
import "ojs/ojknockout";
import "ojs/ojbutton";
import "ojs/ojtoolbar";
import "ojs/ojmenu";

export default class Root {
  constructor() {
    this.init();
  }

  init(): void {
    rootViewModel.loadModule();
    // bind your ViewModel for the content of the whole page body.
    ko.applyBindings(rootViewModel, document.getElementById("globalBody"));
  }
}