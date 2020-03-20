import * as ko from "knockout";
import * as ModuleUtils from "ojs/ojmodule-element-utils";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import Router = require("ojs/ojrouter");
import "ojs/ojmodule-element";
import { ojModule } from "ojs/ojmodule-element";

class FooterLink {
  name: string;
  id: string;
  linkTarget: string;
  constructor({ name, id, linkTarget }: {
    name: string;
    id: string;
    linkTarget: string;
  }) {
    this.name = name;
    this.id = id;
    this.linkTarget = linkTarget;
  }
}

class RootViewModel {
  smScreen: ko.Observable<boolean>;
  appName: ko.Observable<string>;
  userLogin: ko.Observable<string>;
  footerLinks: ko.ObservableArray<FooterLink>;
  router: Router;
  moduleConfig: ko.Observable<ojModule["config"]>;
  pageName: ko.Observable<string>;
  urlParams: any;
  constructor() {
    // media queries for repsonsive layouts
    let smQuery: string | null = ResponsiveUtils.getFrameworkQuery("sm-only");
    this.router = Router.rootInstance;
    if (smQuery) {
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    }
    // header
    this.urlParams = this.parseQueryString();
    this.pageName = ko.observable(this.urlParams['ActivityName']);
    console.log("urlparams::", this.urlParams['ActivityName']);
    this.router.configure({
      "CreateWorkUnit": { label: "Create Work Unit", isDefault: true },
      "PermitDataEntry": { label: "Permit Data Entry" }
    });
    Router.defaults.urlAdapter = new Router.urlParamAdapter();

    // module config
    this.moduleConfig = ko.observable({ "view": [], "viewModel": null });
    // application Name used in Branding Area
    this.appName = ko.observable("App Name");

    // user Info used in Global Navigation area
    this.userLogin = ko.observable("john.hancock@oracle.com");

    // footer
    this.footerLinks = ko.observableArray([
      new FooterLink({ name: "About Oracle", id: "aboutOracle", linkTarget: "http://www.oracle.com/us/corporate/index.html#menu-about" }),
      new FooterLink({ name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" }),
      new FooterLink({ name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" }),
      new FooterLink({ name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" }),
      new FooterLink({ name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" })
    ]);
    this.router.go(this.pageName());
  }
  loadModule(): void {
    ko.computed(() => {
      let name: string = this.router.moduleConfig.name();
      let viewPath: string = `views/${name}.html`;
      let modelPath: string = `viewModels/${name}`;
      let masterPromise: Promise<any> = Promise.all([
        ModuleUtils.createView({ "viewPath": viewPath }),
        ModuleUtils.createViewModel({ "viewModelPath": modelPath })
      ]);
      masterPromise.then((values) => {
        this.moduleConfig({ "view": values[0], "viewModel": values[1].default });
      }
      );
    });
  }
  parseQueryString(queryString?: string): any {
    // if the query string is NULL or undefined
    if (!queryString) {
      queryString = window.location.search.substring(1);
    }
    const params = {};
    const queries = queryString.split("&");
    queries.forEach((indexQuery: string) => {
      const indexPair = indexQuery.split("=");
      const queryKey = decodeURIComponent(indexPair[0]);
      const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");
      params[queryKey] = queryValue;
    });
    console.log("url params::",params);
    return params;
  }
}

export default new RootViewModel();