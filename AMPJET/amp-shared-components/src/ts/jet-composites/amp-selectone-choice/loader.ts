import Composite = require("ojs/ojcomposite");
import * as view from "text!./amp-selectone-choice-view.html";
import viewModel from "./amp-selectone-choice-viewModel";
import * as metadata from "text!./component.json";
import "css!./amp-selectone-choice-styles";

Composite.register("amp-selectone-choice", {
  view: view,
  viewModel: viewModel,
  metadata: JSON.parse(metadata)
});