<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <mod title="Heat Sink #1" v-model="heatSinks[0]"></mod>
            </div>
            <div class="column">
                <mod title="Heat Sink #2" v-model="heatSinks[1]"></mod>
            </div>
            <div class="column">
                <mod title="Heat Sink #3" v-model="heatSinks[2]"></mod>
            </div>
            <div class="column">
                <mod title="Heat Sink #4" v-model="heatSinks[3]"></mod>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <a class="button is-primary is-medium is-fullwidth" @click="start()" v-show="!isRunning">
                            <span class="icon">
                                <i class="fa fa-clock-o"></i>
                            </span>
                    <span>Start Timer</span>
                </a>
                <a class="button is-primary is-medium is-fullwidth" @click="cancel()" v-show="isRunning">
                            <span class="icon">
                                <i class="fa fa-clock-o"></i>
                            </span>
                    <span>Cancel Timer</span>
                </a>
            </div>
        </div>
        <div class="columns is-gapless is-multiline" v-show="isRunning">
            <div class="column is-12">
                <progress class="progress is-medium" :value="timer" :max="countdown">{{ timer / countdown / 100 }}%</progress>
            </div>
            <div class="column is-12 has-text-right">
                <span>{{ remaining }} remaining</span>
            </div>
        </div>
    </div>
</template>

<script>
    import heartbeats from 'heartbeats'
    import prettyMs from 'pretty-ms'
    import Notifier from '../modules/Notifier'
    import Mod from './portal/Mod'

    export default {
        components: {
            Mod
        },
        computed: {
            remaining() {
                return prettyMs((this.countdown - this.timer) * 1000)
            }
        },
        data() {
            return {
                heatSinks: [0, 0, 0, 0],
                timer: 0,
                countdown: 300,
                intervalId: 0,
                isRunning: false,
                notifier: new Notifier(),
                heart: heartbeats.createHeart(1000)
            }
        },
        methods: {
            calculate() {
                const heatSinks = this.heatSinks.slice(0)
                const bonus = heatSinks.sort().reverse().reduce((pre, cur, index) => {
                    if (index === 0) {
                        return 1 - (cur / 100)
                    }

                    return pre * (1 - (cur / 100 / 2))
                }, 0)

                this.countdown = Math.ceil(300 * bonus)
            },
            cancel() {
                // stop timer
                this.heart.killAllEvents()

                // flag timer as not running
                this.isRunning = false

                // reset timer
                this.timer = 0
            },
            start() {
                // calculate countdown
                this.calculate()

                // start timer
                this.intervalId = this.heart.createEvent(1, () => {
                    this.timer += 1

                    // check if portal is ready
                    if (this.timer === this.countdown) {
                        this.notifier.alert('Portal is cooled down!')
                        this.cancel()
                    }
                }, 1000)

                // flag timer as running
                this.isRunning = true
            }
        }
    }
</script>
