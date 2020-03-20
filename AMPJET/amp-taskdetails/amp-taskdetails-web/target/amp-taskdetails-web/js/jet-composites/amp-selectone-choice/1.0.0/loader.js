define(["require", "exports", "ojs/ojcomposite", "text!./amp-selectone-choice-view.html", "./amp-selectone-choice-viewModel", "text!./component.json", "css!./amp-selectone-choice-styles"], function (require, exports, Composite, view, amp_selectone_choice_viewModel_1, metadata) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Composite.register("amp-selectone-choice", {
        view: view,
        viewModel: amp_selectone_choice_viewModel_1.default,
        metadata: JSON.parse(metadata)
    });
});
//# sourceMappingURL=loader.js.map