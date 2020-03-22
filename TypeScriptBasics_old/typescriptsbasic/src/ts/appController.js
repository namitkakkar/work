define(["require", "exports", "knockout", "ojs/ojmodule-element-utils", "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojoffcanvas", "ojs/ojrouter", "ojs/ojarraydataprovider", "ojs/ojknockout", "ojs/ojmodule-element"], function (require, exports, ko, ModuleUtils, ResponsiveUtils, ResponsiveKnockoutUtils, OffcanvasUtils, Router, ArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FooterLink {
        constructor({ name, id, linkTarget }) {
            this.name = name;
            this.id = id;
            this.linkTarget = linkTarget;
        }
    }
    class NavDataItem {
        constructor({ id, name, iconClass }) {
            this.id = id;
            this.name = name;
            this.iconClass = iconClass;
        }
    }
    class RootViewModel {
        constructor() {
            // called by navigation drawer toggle button and after selection of nav drawer item
            this.toggleDrawer = () => {
                return OffcanvasUtils.toggle(this.drawerParams);
            };
            // media queries for repsonsive layouts
            let smQuery = ResponsiveUtils.getFrameworkQuery("sm-only");
            if (smQuery) {
                this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            }
            let mdQuery = ResponsiveUtils.getFrameworkQuery("md-up");
            if (mdQuery) {
                this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
            }
            // router setup
            this.router = Router.rootInstance;
            this.router.configure({
                "dashboard": { label: "Dashboard", isDefault: true },
                "incidents": { label: "Incidents" },
                "customers": { label: "Customers" },
                "about": { label: "About" },
                "sample": { label: "Sample" }
            });
            Router.defaults.urlAdapter = new Router.urlParamAdapter();
            // module config
            this.moduleConfig = ko.observable({ "view": [], "viewModel": null });
            // navigation setup
            let navData = [
                new NavDataItem({ name: "Dashboard", id: "dashboard", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24" }),
                new NavDataItem({ name: "Incidents", id: "incidents", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24" }),
                new NavDataItem({ name: "Customers", id: "customers", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24" }),
                new NavDataItem({ name: "About", id: "about", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24" }),
                new NavDataItem({ name: "Sample", id: "sample", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24" })
            ];
            this.navDataSource = new ArrayDataProvider(navData, { idAttribute: "id" });
            // drawer
            this.drawerParams = {
                displayMode: "push",
                selector: "#navDrawer",
                content: "#pageContent"
            };
            // close offcanvas on medium and larger screens
            this.mdScreen.subscribe(() => {
                OffcanvasUtils.close(this.drawerParams);
            });
            // add a close listener so we can move focus back to the toggle button when the drawer closes
            let navDrawerElement = document.querySelector("#navDrawer");
            navDrawerElement.addEventListener("ojclose", () => {
                let drawerToggleButtonElment = document.querySelector("#drawerToggleButton");
                drawerToggleButtonElment.focus();
            });
            // header
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
        }
        loadModule() {
            ko.computed(() => {
                let name = this.router.moduleConfig.name();
                let viewPath = `views/${name}.html`;
                let modelPath = `viewModels/${name}`;
                let masterPromise = Promise.all([
                    ModuleUtils.createView({ "viewPath": viewPath }),
                    ModuleUtils.createViewModel({ "viewModelPath": modelPath })
                ]);
                masterPromise.then((values) => {
                    this.moduleConfig({ "view": values[0], "viewModel": values[1].default });
                });
            });
        }
    }
    exports.default = new RootViewModel();
});
//# sourceMappingURL=appController.js.map