<template>
    <div class="container">
        <div class="columns" v-show="showHeader && !editMode">
            <div class="column is-narrow">
                <h2 class="title">{{ portal.name }}</h2>
            </div>
            <div class="column">
                <a class="button is-link" @click="enableEditMode()">
                    <span class="icon is-small">
                      <i class="fa fa-pencil"></i>
                    </span>
                    <span>Edit</span>
                </a>
                <a class="button is-link" @click="deletePortal()">
                    <span class="icon is-small">
                      <i class="fa fa-trash"></i>
                    </span>
                    <span>Delete</span>
                </a>
            </div>
        </div>
        <div class="columns" v-show="editMode">
            <edit-form v-on:cancel="disableEditMode()" v-on:save="disableEditMode()" v-model="portal.name"></edit-form>
        </div>
        <div class="columns">
            <div class="column">
                <mod title="Heat Sink #1" v-model="portal.mods[0]"></mod>
            </div>
            <div class="column">
                <mod title="Heat Sink #2" v-model="portal.mods[1]"></mod>
            </div>
            <div class="column">
                <mod title="Heat Sink #3" v-model="portal.mods[2]"></mod>
            </div>
            <div class="column">
                <mod title="Heat Sink #4" v-model="portal.mods[3]"></mod>
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
    import EditForm from './portal/Form'
    import Mod from './portal/Mod'

    export default {
        components: {
            EditForm, Mod
        },
        computed: {
            remaining() {
                return prettyMs((this.countdown - this.timer) * 1000)
            }
        },
        data() {
            return {
                timer: 0,
                countdown: 300,
                isRunning: false,
                notifier: new Notifier(),
                heart: heartbeats.createHeart(1000),
                editMode: false,
                name: this.initName
            }
        },
        methods: {
            calculate() {
                this.countdown = this.portal.cooldown
            },
            cancel() {
                // stop timer
                this.heart.killAllEvents()

                // flag timer as not running
                this.isRunning = false

                // reset timer
                this.timer = 0
            },
            deletePortal() {
                this.$emit('delete')
            },
            disableEditMode() {
                this.editMode = false
            },
            enableEditMode() {
                this.editMode = true
            },
            start() {
                // calculate countdown
                this.calculate()

                // start timer
                this.heart.createEvent(1, () => {
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
        },
        props: {
            portal: {
                type: Object,
                requred: true
            },
            showHeader: {
                type: Boolean,
                default: false
            }
        }

    }
</script>
