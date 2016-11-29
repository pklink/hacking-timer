<template>
    <div class="container">
        <div class="columns is-mobile" v-show="!editMode">
            <div class="column is-narrow">
                <h2 class="title">{{ portal.name }}</h2>
            </div>
            <div class="column">
                <a class="button is-link is-hidden-touch" @click="enableEditMode()">
                    <span class="icon is-small">
                      <i class="fa fa-pencil"></i>
                    </span>
                    <span>Edit</span>
                </a>
                <a class="button is-hidden-desktop" @click="enableEditMode()">
                    <span class="icon is-small">
                      <i class="fa fa-pencil"></i>
                    </span>
                    <span>Edit</span>
                </a>
                <a class="button is-link" @click="remove()" v-show="isDeletable">
                    <span class="icon is-small">
                      <i class="fa fa-trash"></i>
                    </span>
                    <span>Delete</span>
                </a>
            </div>
        </div>
        <div class="columns">
            <edit-form v-show="editMode" v-on:cancel="disableEditMode()" v-on:save="disableEditMode()" v-model="portal.name"></edit-form>
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
                        <i class="fa fa-play"></i>
                    </span>
                </a>
                <a class="button is-primary is-medium is-fullwidth" @click="cancel()" v-show="isRunning">
                    <span class="icon">
                        <i class="fa fa-stop"></i>
                    </span>
                </a>
            </div>
        </div>
        <div class="columns is-gapless is-multiline" v-show="isRunning">
            <div class="column is-12">
                <progress class="progress is-medium" :value="Math.abs(timer.remaining / 1000 - portal.cooldown)" :max="portal.cooldown">{{ timer / countdown / 100 }}%</progress>
            </div>
            <div class="column is-12 has-text-right">
                <span>{{ remaining() }} remaining</span>
            </div>
        </div>
    </div>
</template>

<script>
    import prettyMs from 'pretty-ms'
    import Notifier from '../modules/Notifier'
    import EditForm from './portal/Form'
    import Mod from './portal/Mod'
    import Timer from '../modules/Timer'

    export default {
        components: {
            EditForm, Mod
        },
        data() {
            return {
                isRunning: false,
                notifier: new Notifier(),
                editMode: false,
                name: this.portal.name,
                timer: new Timer()
            }
        },
        methods: {
            cancel() {
                // flag timer as not running
                this.isRunning = false

                // stop timer
                this.timer.cancel()
            },
            disableEditMode() {
                this.editMode = false
            },
            enableEditMode() {
                this.editMode = true
            },
            remaining() {
                if (this.timer.remaining > 1000) {
                    return prettyMs(this.timer.remaining, { secDecimalDigits: 0 })
                }

                return '1s'
            },
            remove() {
                this.$emit('remove')
            },
            start() {
                // show notification and hide progress bar on complete
                this.timer.onComplete = () => {
                    this.cancel()
                    this.notifier.alert('Portal is cooled down!')
                }

                // refresh UI with every tick
                this.timer.onRefresh = () => {
                    this.$forceUpdate()
                }

                // start timer
                this.timer.start(this.portal.cooldown)

                // flag timer as running
                this.isRunning = true
            }
        },
        props: {
            isDeletable: {
                type: Boolean,
                default: true
            },
            portal: {
                type: Object,
                required: true
            }
        }
    }
</script>
