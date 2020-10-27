function throttle(fn, wait) {
    let timeout
    return (...args) => {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                fn(args)
            }, wait)
        }
    }
}

export {
    throttle
}