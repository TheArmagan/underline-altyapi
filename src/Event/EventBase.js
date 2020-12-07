const Underline = require("../Underline");

class EventBase {

    /** @type {Underline} */
    underline;

    /** @type {String} */
    eventName;

    /** @type {String} */
    name;

    /** @type {String?} */
    path;

    constructor(underline) {
        this.underline = underline
    };

    /**
     * @param  {...any} args
     */
    onEvent(...args) {

    }

    onLoad() {

    }

    onUnload() {

    }
}

module.exports = EventBase;