const EventBase = require("../EventBase");
const { GuildMember } = require("discord.js");

class Event extends EventBase {

    constructor(underline) { super(underline) };

    name = "Example";

    eventName = "guildMemberAdd";

    /**
     * @param {GuildMember} member 
     */
    onEvent(member) {

        let ch = member.guild.channels.cache.filter(i => i.type == "text" && i.permissionsFor(this.underline.user).has("SEND_MESSAGES")).first();
        if (!ch) return;

        ch.send(`${member} suncuya girdi.`);
    }

}

module.exports = Event;