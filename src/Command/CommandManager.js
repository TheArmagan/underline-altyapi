const Underline = require("../Underline");
const CommandBase = require("./CommandBase");
const readdirRecursive = require("recursive-readdir");
const clearPath = require("../Utils/clearPath");

class CommandManager {

    /** @type {Underline} */
    underline;

    /** @type {Map<String, CommandBase>} */
    #commands = new Map();

    /**
     * @param {Underline} underline 
     */
    constructor(underline) {
        this.underline = underline;

        this.underline.on("message", (msg) => {
            if (msg.author.id == this.underline.user.id || !msg.content) return;

            let args = msg.content.split(" ");

            this.#commands.forEach((cmd) => {
                if (
                    cmd.aliases[0] == "*" ||
                    cmd.aliases.some((a) => {
                        return `${this.underline.config.prefix}${a}` == args[0].toLowerCase();
                    })
                ) {
                    cmd.onCommand({
                        msg, args
                    });
                }
            })
        })
    }

    /**
     * @param {import('./CommandBase.js')} command
     */
    loadCommand(command) {

        try {
            if (typeof command.name == "string") {
                if (!this.#commands.has(command.name)) {
                    this.#commands.set(command.name, command);
                    command.onLoad();
                    this.underline.logger.log(`&b${command.name}&f adlı komut yüklendi!`);
                } else {
                    throw `${command.name} adlı komut zaten yüklenmiş!`
                }
            } else {
                if (command.path) {
                    throw `${clearPath(command.path)} konumundaki komut için hiç bir isim belirlenmemiş.`
                } else {
                    throw `İsimsiz bir komut yüklenmeye çalışıldı!`
                }
            }
        } catch (err) {
            this.underline.logger.error(err);
        }
    }

    async init() {
        this.underline.logger.log("Komut Yöneticisi başlatılıyor..");
        let commandFiles = await readdirRecursive(__dirname + "/Commands", ["*.ignore.js"]);

        for (let i = 0; i < commandFiles.length; i++) {
            const commandFile = commandFiles[i];
            const CmdClass = require(commandFile);
            /** @type {import('./CommandBase.js')} */
            const command = new CmdClass(this.underline);
            command.path = commandFile;
            this.loadCommand(command);
        }

        this.underline.logger.log(`Komut yöneticisi başlatıldı!`);

        if (this.#commands.size != 0) {
            this.underline.logger.log(`Toplamda &b${this.#commands.size}&f komut yüklendi!`);
        } else {
            this.underline.logger.warn(`Hiç bir komut yüklenmedi, bu normal mi?`);
        }
    }

    async uninit() {
        this.underline.logger.log("Komut Yöneticisi kapatılıyor..");
        let cmds = Array.from(this.#commands);

        for (let i = 0; i < cmds.length; i++) {
            const cmd = cmds[i];
            this.#commands.delete(cmd[0]);
            await cmd[1].onUnload();
            this.underline.logger.log(`&b${cmd[1].name}&r adlı komudun yüklemesi kaldırıldı!`);
        }

        this.underline.logger.log("Komut Yöneticisi kapatıldı!");
    }

    get commands() {
        return this.#commands;
    }

}

module.exports = CommandManager;