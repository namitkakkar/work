define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AboutViewModel {
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
        connected() {
            // implement if needed
        }
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        disconnected() {
            // implement if needed
        }
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        transitionCompleted() {
            // implement if needed
        }
    }
    exports.default = AboutViewModel;
});
//# sourceMappingURL=about.js.map