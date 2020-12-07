const Discord = require("discord.js");
const Underline = require("../Underline");

class CommandBase {

    /** @type {String} */
    name;

    /** @type {String} */
    description;

    /** @type {String?} */
    path;

    /** @type {String[]} */
    aliases = ["*"];

    doNotUnload = false;

    /** @type {Underline} */
    underline;

    constructor(underline) {
        this.underline = underline;
    }

    /**
     * @param {{msg: Discord.Message, args: Array<String>}} param0 
     */
    async onCommand({ msg, args }) {
        throw "Blank command."
    }

    async onLoad() {

    }

    async onUnload() {

    }

}

module.exports = CommandBase;