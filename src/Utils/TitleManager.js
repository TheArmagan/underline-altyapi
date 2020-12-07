const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
const Underline = require("../Underline");

class TitleManager {

    #interval;
    createdAt = 0;

    /** @type {Underline} */
    underline;

    #title = ""

    constructor(underline) {
        this.underline = underline;
        this.createdAt = Date.now();
    }

    start() {
        if (!this.#interval) {
            this.#interval = setInterval(() => {
                this.tick()
            }, 1000);
        }
    }

    tick() {
        let uptimeText = dayjs.duration(Date.now() - this.createdAt, "ms").format("HH:mm:ss");
        process.title = `> UL | UPTIME: ${uptimeText}${this.title ? ` | ${this.title}` : ""}`;
    }

    stop() {
        clearInterval(this.#interval);
        this.#interval = null;
        process.title = "";
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
        this.tick();
    }

}

module.exports = TitleManager;