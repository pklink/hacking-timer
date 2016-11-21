<template>
    <div>
        <label class="label">{{ title }}</label>
        <div class="control">
            <span class="select is-fullwidth">
                <select v-bind:value="value" v-on:input="update($event.target.value)">
                    <option value="0">None</option>
                    <option value="20">Common</option>
                    <option value="50">Rare</option>
                    <option value="70">Very Rare</option>
                </select>
                <span>{{ model }}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            update(value) {
                this.$emit('input', Number(value))
            }
        },
        props: {
            value: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                default: 'Heat Sink'
            }
        }

    }
</script>
