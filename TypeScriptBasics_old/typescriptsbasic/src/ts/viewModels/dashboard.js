define(["require", "exports", "knockout", "ojs/ojinputtext", "ojs/ojlabel", "ojs/ojbutton  "], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DashboardViewModel {
        constructor() {
            let self = this;
            let something = ko.observable("This parapgraph uses content from it's own 'DashboardViewModel' Class. The module is found in the /ts folder");
            let data = ko.observableArray();
            self.txtval = ko.observable("namit");
            self.txtval.subscribe(function (data) {
                console.log(self.txtval());
            });
            console.log(self.txtval());
            self.callAction = (event) => {
                console.log(new Greeter("World"));
            };
            function greeter(person) {
                return person.greet();
            }
            /*
             * Your viewModel code goes here
             */
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
    class Greeter {
        constructor(message) {
            this.greeting = message;
            console.log(message);
        }
        greet() {
            console.log("Hello" + this.greeting);
            return "Hello" + this.greeting;
        }
    }
    exports.default = DashboardViewModel;
});
//# sourceMappingURL=dashboard.js.map