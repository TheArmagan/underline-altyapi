const Underline = require("../Underline");
const fs = require("fs");
const path = require("path");
const eventNames = require("./EventNames");
const readdirRecursive = require("recursive-readdir");
const clearPath = require("../Utils/clearPath");

class EventManager {

    /**
    * @type {Underline}
    */
    underline;

    /** @type {Map<string, import('./EventBase')>} */
    #listeners = new Map();

    /**
    * @param {Underline} underline 
    */
    constructor(underline) {
        this.underline = underline;
        for (let i = 0; i < eventNames.length; i++) {
            const eventName = eventNames[i];
            this.underline.on(eventName, (...eventArgs) => {
                this.#mainListener(eventName, eventArgs);
            });
        }
    }

    #mainListener(eventName, eventArgs) {
        this.#listeners.forEach((evt) => {
            if (evt.eventName == eventName) {
                evt.onEvent(...eventArgs);
            }
        })
    }

    /**
     * @param {import('./EventBase')} event 
     */
    loadEvent(event) {
        try {
            if (typeof event.name == "string") {
                if (!this.#listeners.has(event.name)) {
                    this.#listeners.set(event.name, event);
                    event.onLoad();
                    this.underline.logger.log(`&b${event.name}&f adlı olay yüklendi!`);
                } else {
                    throw `${event.name} adlı olay zaten yüklenmiş!`;
                }
            } else {
                if (event.path) {
                    throw `${clearPath(event.path)} konumundaki olay için hiç bir isim belirlenmemiş.`
                } else {
                    throw `İsimsiz bir olay yüklenmeye çalışıldı!`
                }
            }
        } catch (err) {
            this.underline.logger.error(err);
        }
    }



    async init() {
        this.underline.logger.log(`Olay Yöneticisi başlatılıyor..`);

        let eventFiles = await readdirRecursive(__dirname + "/Events", ["*.ignore.js"]);

        for (let i = 0; i < eventFiles.length; i++) {
            const eventFile = eventFiles[i];
            const EvtClass = require(eventFile);
            /** @type {import('./EventBase.js')} */
            const event = new EvtClass(this.underline);
            event.path = eventFile;
            this.loadEvent(event);
        }

        this.underline.logger.log(`Olay yöneticisi başlatıldı!`);

        if (this.#listeners.size != 0) {
            this.underline.logger.log(`Toplamda &b${this.#listeners.size}&f olay yüklendi!`);
        } else {
            this.underline.logger.warn(`Hiç bir olay yüklenmedi, bu normal mi?`);
        }
    }



    async uninit() {

    }
}

module.exports = EventManager;