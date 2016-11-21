class Portal {

    constructor() {
        this.name = 'Unknown Portal'
        this.mods = [0, 0, 0, 0]
    }

    get cooldown() {
        const mods = this.mods.slice(0)
        const bonus = mods.sort().reverse().reduce((pre, cur, index) => {
            if (index === 0) {
                return 1 - (cur / 100)
            }

            return pre * (1 - (cur / 100 / 2))
        }, 0)

        return Math.ceil(300 * bonus)
    }

}

export default Portal
