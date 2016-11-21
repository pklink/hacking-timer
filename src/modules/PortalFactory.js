import store from 'store'
import Portal from '../models/Portal'

export default {
    get() {
        // load from storage
        const fromStorage = store.get('portals')

        // create empty portal if no portal in storage
        if (fromStorage === undefined) {
            return [new Portal()]
        }

        // create portals from storage
        return fromStorage.map((data) => {
            const portal = new Portal()
            portal.name = data.name
            portal.mods = data.mods
            return portal
        })
    }
}
