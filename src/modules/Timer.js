const onComplete = Symbol('on complete callback')
const onRefresh = Symbol('on refresh callback')
const intervalId = Symbol('interval id')
const end = Symbol('end timestamp')

class Timer {

    constructor() {
        this[end] = 0
        this[intervalId] = null
        this[onComplete] = () => null
        this[onRefresh] = () => null
    }

    cancel() {
        clearInterval(this[intervalId])
    }

    start(seconds) {
        this[end] = Date.now() + (seconds * 1000)

        this[intervalId] = setInterval(() => {
            this[onRefresh]()

            if (Date.now() >= this[end]) {
                this.cancel()
                this[onComplete]()
            }
        }, 100)
    }

    set onComplete(callback) {
        this[onComplete] = callback
    }

    set onRefresh(callback) {
        this[onRefresh] = callback
    }

    get end() {
        return this[end]
    }

    get remaining() {
        return Math.round(this[end] - Date.now())
    }

}

export default Timer
