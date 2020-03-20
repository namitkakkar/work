define(["require", "exports", "knockout", "ojL10n!./resources/nls/amp-selectone-choice-strings", "ojs/ojcontext", "ojs/ojarraydataprovider", "ojs/ojknockout", "ojs/ojselectcombobox"], function (require, exports, ko, componentStrings, Context, ArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewModel = /** @class */ (function () {
        function ViewModel(context) {
            this.lovDataProvider = ko.observable();
            //At the start of your viewModel constructor
            var elementContext = Context.getContext(context.element);
            this.properties = context.properties;
            console.log(this.properties);
            this.res = componentStrings["amp-selectone-choice"];
        }
        ViewModel.prototype.connected = function (context) {
            var _this = this;
            var url = "http://iampwtd201.assessor.lacounty.gov:7780/ords/amp_core/wu/retrieve_lov?P_CLIENT_ID=C185109&P_CODE_NAMES=" + this.properties.lovkey;
            fetch(url, { method: 'GET' }).then(function (response) { return response.json(); })
                .then(function (response) {
                var data = response.LIST_OF_VALUES;
                var lovData = data.map(function (item) { return ({ value: item.CODE_KEY, label: item.CODE_LEGEND }); });
                _this.lovDataProvider(new ArrayDataProvider(lovData, { idAttribute: 'CODE_KEY' }));
            })
                .catch(function (error) {
                console.log(error);
                _this.lovDataProvider(new ArrayDataProvider([], { idAttribute: 'CODE_KEY' }));
            });
        };
        ;
        return ViewModel;
    }());
    exports.default = ViewModel;
    ;
});
//# sourceMappingURL=amp-selectone-choice-viewModel.js.map