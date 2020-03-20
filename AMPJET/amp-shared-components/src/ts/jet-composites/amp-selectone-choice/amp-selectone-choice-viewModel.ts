"use strict";

import * as ko from "knockout";
import * as componentStrings from "ojL10n!./resources/nls/amp-selectone-choice-strings";
import Context = require("ojs/ojcontext");
import Composite = require("ojs/ojcomposite");
import "ojs/ojknockout";
import 'ojs/ojselectcombobox';
import ArrayDataProvider = require("ojs/ojarraydataprovider");

export default class ViewModel implements Composite.ViewModel<Composite.PropertiesType> {
    busyResolve: (() => void);
    properties: Composite.PropertiesType;
    res: { [key: string]: string };
    lovDataProvider = ko.observable();

    constructor(context: Composite.ViewModelContext<Composite.PropertiesType>) {
        //At the start of your viewModel constructor
        const elementContext: Context = Context.getContext(context.element);
        this.properties = context.properties;
        console.log(this.properties);
        this.res = componentStrings["amp-selectone-choice"];

    }

    connected(context: Composite.ViewModelContext<Composite.PropertiesType>): void {

        const url = "http://iampwtd201.assessor.lacounty.gov:7780/ords/amp_core/wu/retrieve_lov?P_CLIENT_ID=C185109&P_CODE_NAMES=" + this.properties.lovkey;

        fetch(url, { method: 'GET' }).then(response => response.json())
            .then(response => {
                const data = response.LIST_OF_VALUES;
                const lovData = data.map(item => ({ value: item.CODE_KEY, label: item.CODE_LEGEND }));
                this.lovDataProvider(new ArrayDataProvider(lovData, { idAttribute: 'CODE_KEY' }));
            })
            .catch(error => {
                console.log(error);
                this.lovDataProvider(new ArrayDataProvider([], { idAttribute: 'CODE_KEY' }));
            });
    };

};