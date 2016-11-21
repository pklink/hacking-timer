/* eslint no-undef: "off" */
/* eslint no-new: "off" */
/* eslint no-alert: "off" */

class Notifier {

    constructor() {
        Notification.requestPermission()
    }

    alert(msg) {
        if (Notification.permission === 'granted') {
            new Notification('Hacking Timer', { body: msg })
        } else {
            alert(msg)
        }
    }
}

export default Notifier
