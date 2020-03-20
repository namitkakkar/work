define(['knockout', 'ojs/ojrouter', 'ojs/ojmodule-element-utils', 'store/index', 'ojs/ojprogress'], 
function (ko, Router, ModuleElementUtils, store) {
  var self;
  Router.defaults['urlAdapter'] = new Router.urlParamAdapter();
  function controllerModel() {
    self = this;
    self.router = ko.observable();
    self.router = Router.rootInstance;
    self.loaderFlag = ko.observable(false);
    store.subscribe(() => self.loaderFlag(store.getState().loading));
    self.router.configure(
      {
        'caseManagement': { label: 'Case Management', isDefault: true, value: { ain: self.property } },
        'recordMaintainance': { label: 'Record Maintainance', value: { ain: self.property } },
        'eligibilityDetermination': { label: 'Eligibility Determination', value: { ain: self.property } },
        'appraisal': { label: 'Appraisal', value: { ain: self.property } },
        'assessment': { label: 'Assessment', value: { ain: self.property } },
      });
    self.moduleConfig = ko.observable({ view: [], viewModel: null });
    self.mainModuleConfig = ModuleElementUtils.createConfig({ name: 'dashboard' });
    self.loadModule = function () {
      ko.computed(function () {
        var name = self.router.moduleConfig.name();
        var viewPath = 'views/' + name + '.html';
        var modelPath = 'viewModels/' + name;
        var masterPromise = Promise.all([
          ModuleElementUtils.createView({ 'viewPath': viewPath }),
          ModuleElementUtils.createViewModel({ 'viewModelPath': modelPath })
        ]);
        masterPromise.then(
          function (values) {
            self.moduleConfig({ 'view': values[0], 'viewModel': values[1] });
          }
        );
      });
    };
  }
  return new controllerModel();
});