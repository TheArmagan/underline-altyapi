const EventBase = require("../EventBase");

class Event extends EventBase {

    name = "Anan";

    eventName = "message"

    constructor(underline) { super(underline); }


}

module.exports = Event;