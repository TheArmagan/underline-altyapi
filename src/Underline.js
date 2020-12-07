const { Client } = require("discord.js");
const Discord = require("discord.js");
const CommandManager = require("./Command/CommandManager");
const EventManager = require("./Event/EventManager");
const Logger = require("./Utils/Logger");
const TitleManager = require("./Utils/TitleManager");

class Underline extends Client {

    /** @type {{clientConfig: Discord.ClientConfig, token: string, prefix: string, authors: string[]}} */
    config = {};

    /** @type {TitleManager} */
    titleManager;

    /** @type {CommandManager} */
    commandManager;

    /** @type {EventManager} */
    eventManager;

    other = {};

    /**
     * @param {{clientConfig: Discord.ClientConfig, token: string, prefix: string, authors: string[]}} param0 
     */
    constructor({ clientConfig, token, prefix }) {
        super(clientConfig);
        this.config = arguments[0];
        this.logger = new Logger(this);
        global.underline = this;
    }

    async init() {
        this.logger.log("Başlatılıyor...");
        process.title = "Starting..";
        await this.login(this.config.token);
        this.logger.log("Giriş yapıldı!", this.user.tag);

        this.commandManager = new CommandManager(this);
        await this.commandManager.init();

        this.eventManager = new EventManager(this);
        await this.eventManager.init();

        this.titleManager = new TitleManager(this);
        this.titleManager.start();

        this.logger.log("&a&nUnderline hazır!");
    }

}

module.exports = Underline;