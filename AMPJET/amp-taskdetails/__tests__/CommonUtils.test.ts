import {CommonUtils} from "../src/ts/util/CommonUtils";

describe('CommonUtils', function() {
    it('parseQueryString', function() {
        let params = {};
        params = CommonUtils.parseQueryString("xyz=123&abc=456");
        console.log(params);
        expect(params).not.toBeNull();
    });

    it('parseQueryStringNull', function() {
        let params = {};
        params = CommonUtils.parseQueryString();
        console.log(params);
        expect(params).not.toBeNull();
    });
});