const Underline = require("./src/Underline");

(async () => {

    let bot = new Underline({
        authors: [
            "707309693449535599"
        ],
        token: "",
        prefix: "?"
    });

    await bot.init();

})();