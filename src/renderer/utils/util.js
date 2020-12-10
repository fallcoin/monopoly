const fs = require('fs');

function throttle(fn, wait = 1000) {
    let previous = 0
    return (...args) => {
        let now = Date.now()
        if (now - previous > wait) {
            fn(args)
            previous = now
        }
    }
}

function fileParse(file, transferType = "base64", validate) {
    return new Promise((resolve, reject) => {
        let { type, size } = file;
        let valid = validate(type, size);
        if (!valid) {
            reject("校验失败");
        }
        let fileReader = new FileReader();
        if (transferType === "base64") {
            fileReader.readAsDataURL(file);
        } else if (transferType === "buffer") {
            fileReader.readAsArrayBuffer(file);
        }
        fileReader.onload = (ev) => {
            resolve(ev.target.result);
        }
    })
}

function getQueryVariable(variable) {
    let query = window.location.search.substring(1)
    let vars = query.split("&")
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=")
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return false
}

function readFile(path, format = "utf8") {
    return new Promise((resolve, reject) => {
        fs.readFile(path, format, (err, data) => {
            if (err) {
                reject();
                return;
            }
            resolve(data);
        })
    })
}

function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject();
                return;
            }
            resolve(200);
        })
    })
}

export {
    throttle,
    fileParse,
    getQueryVariable,
    readFile,
    writeFile
}