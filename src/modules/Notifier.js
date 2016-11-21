/* eslint no-undef: "off" */
/* eslint no-new: "off" */
/* eslint no-alert: "off" */

class Notifier {

    constructor() {
        this.isGranted = false

        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                this.isGranted = true
            }
        })
    }

    alert(msg) {
        if (this.isGranted) {
            new Notification('Hacking Timer', { body: msg })
        } else {
            alert(msg)
        }
    }
}

export default Notifier
