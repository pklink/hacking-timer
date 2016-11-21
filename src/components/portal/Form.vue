<template>
    <div class="column">
        <div class="control is-grouped">
            <p class="control is-expanded">
                <input class="input is-expanded" type="text" title="Name" v-model="name" @keyup.enter="save()" @keyup.esc="cancel()">
            </p>
            <p class="control">
                <a class="button is-danger" @click="cancel()">
                    <span class="icon">
                        <i class="fa fa-times"></i>
                    </span>
                    <span>Cancel</span>
                </a>
            </p>
            <p class="control">
                <a class="button is-primary" @click="save()">
                    <span class="icon">
                        <i class="fa fa-check"></i>
                    </span>
                    <span>Save</span>
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: this.value
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel')
                this.name = this.value
            },
            save() {
                this.$emit('input', this.name)
                this.$emit('save')
            }
        },
        props: {
            value: {
                type: String,
                required: true
            }
        }
    }
</script>
