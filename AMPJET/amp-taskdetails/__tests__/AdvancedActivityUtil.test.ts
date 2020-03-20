import {AdvancedActivityUtil} from "../src/ts/util/AdvancedActivityUtil";
import {AdvancedActivityConstants} from "../src/ts/util/AdvancedActivityConstants";

describe('Task', function() {
    it('getKetVal', function() {
        let eventType : String;
        AdvancedActivityUtil.getKeyValueObj(AdvancedActivityConstants.EVENT_TYPE, eventType);
        console.log("eventType = "+eventType);
      expect(eventType).not.toBeNull();
    });
});



