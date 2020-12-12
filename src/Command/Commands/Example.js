const { Message } = require("discord.js");
const CommandBase = require("../CommandBase");
const Underline = require("../../Underline");

class Command extends CommandBase {
    constructor(underline) { super(underline) };

    aliases = ["test"]

    /**
     * @param {{msg: Message, args: Array<String>}} param0
     */
    async onCommand({ msg, args }) {
        msg.reply("test!");
    }

}

module.exports = Command;