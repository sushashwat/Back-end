(function (exports, require, module, __filename, __dirname) {

    const abc = {
        a: 10,
        b: 20,
    };

    console.log(exports);
    console.log(module);
    console.log(require);
    console.log(__filename);
    console.log(__dirname);

    module.exports = abc;

})(exports, require, module, __filename, __dirname);