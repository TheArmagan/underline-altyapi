const path = require("path");
module.exports = (inp = "") => {
    return path.relative(".", inp).replace(RegExp(path.sep.replace(/\\/gm, "\\\\"), "gim"), "/");

}