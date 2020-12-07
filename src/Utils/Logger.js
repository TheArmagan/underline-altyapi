const util = require("util");
const path = require("path");
const callsites = require("callsites");
const Underline = require("../Underline");
const chalk = require("chalk");
const clearPath = require("./clearPath");
const { minecraftToConsole } = require("mccolorstoconsole");

class Logger {

    /** @type {Underline} */
    underline;

    constructor(underline) {
        this.underline = underline;
        console.log(chalk.whiteBright("|"));

        global.log = this.log;
    };

    #formatArgs(args, defaultColor = "whiteBright") {
        return args.map(i => {
            if (typeof i != "string") {
                return util.inspect(i, true, 6, true);
            } else {
                return minecraftToConsole(chalk[defaultColor](i), "&", true, defaultColor);
            }
        });
    }

    raw(stackOffset = 1, ...args) {
        args = this.#formatArgs(args);
        let v0 = callsites()[stackOffset];
        let v1 = v0.getFileName();
        let parsed = path.parse(v1);
        let dir = clearPath(parsed.dir);
        let v3 = `${chalk.blackBright(dir + "/" + parsed.base + `:${v0.getColumnNumber()}`)}`;
        let v4 = `| ${chalk.blackBright((new Date()).toLocaleTimeString())} ${v3}`;
        let v5 = `${v4}\n| ${chalk.blackBright(">")} ${args.join(" ")}\n${chalk.whiteBright("|")}`;

        console.log(v5);
    }

    log(...args) {
        this.raw(2, ...args);
    }

    warn(...args) {
        this.raw(2, "&6[WARN]", ...args);
    }

    error(...args) {
        this.raw(2, "&4[ERROR]", ...args);
    }

    silly(...args) {
        this.raw(2, "&5[SILLY]", ...args);
    }
}

module.exports = Logger;