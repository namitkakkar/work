import * as ko from "knockout";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import { ojModule } from "ojs/ojmodule-element";
import "ojs/ojmodule-element";
import { ojNavigationList } from "ojs/ojnavigationlist";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import * as ModuleUtils from "ojs/ojmodule-element-utils";
import "ojs/ojknockout";
import { Task } from "./ampCommon/tasklist/Task";
import 'jet-composites/amp-selectone-choice/1.0.0/loader';
import { CommonUtils } from './util/CommonUtils';

class RootViewModel {
  smScreen: ko.Observable<boolean>;
  appName: ko.Observable<string>;
  userLogin: ko.Observable<string>;
  moduleConfig: ko.Observable<ojModule["config"]>;
 // headerModuleConfig: ko.Observable<ojModule["config"]>;
  dashboardModuleConfig: ko.Observable<ojModule["config"]>;
  task: ko.Observable<Task>;
  propTypeLov: ko.Observable<string>;

  constructor() {
    // media queries for repsonsive layouts
    let self = this;
  //  this.propTypeLov = ko.observable('');
    self.task = ko.observable();
    // let smQuery: string | null = ResponsiveUtils.getFrameworkQuery("sm-only");
    // if (smQuery) {
    //   self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    // }

    // header
   // self.headerModuleConfig = ko.observable({ view: [], viewModel: null });
    self.dashboardModuleConfig = ko.observable({ view: [], viewModel: null });

    // application Name used in Branding Area
   // self.appName = ko.observable("Los Angeles Assessor County");

    // user Info used in Global Navigation area
   // self.userLogin = ko.observable("nikita.charakhawala@oracle.com");

    //Dashboard Module
    let dashboardPromise: Promise<any> = Promise.all([
      ModuleUtils.createView({ "viewPath": "views/Dashboard.html" }),
      ModuleUtils.createViewModel({ "viewModelPath": "viewModels/Dashboard" })
    ]);
    dashboardPromise.then((values) => {
      self.dashboardModuleConfig({ "view": values[0], "viewModel": values[1].default });
    });
    //Header Module
    // let headerPromise: Promise<any> = Promise.all([
    //   ModuleUtils.createView({ "viewPath": "views/Header.html" }),
    //   ModuleUtils.createViewModel({ "viewModelPath": "viewModels/Header" })
    // ]);
    // headerPromise.then((values) => {
    //   self.headerModuleConfig({ "view": values[0], "viewModel": values[1].default });
    // });
  }

  loadModule(): void {
    let self = this;
    self.task(Task.getInstance());
    let urlParams = CommonUtils.parseQueryString();
    let taskId = urlParams['bpmWorklistTaskId'];
    self.task().loadTaskDetails(taskId);
  }

}
export default new RootViewModel();