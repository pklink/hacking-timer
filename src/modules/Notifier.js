/* eslint no-undef: "off" */
/* eslint no-new: "off" */
/* eslint no-alert: "off" */

class Notifier {

    constructor() {
        if (window.Notification) {
            Notification.requestPermission()
        }
    }

    alert(msg) {
        if (window.Notification && Notification.permission === 'granted') {
            new Notification('Hacking Timer', { body: msg })
        } else {
            alert(msg)
        }
    }
}

export default Notifier
