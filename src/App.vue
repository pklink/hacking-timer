<template>
    <div>
        <section class="section">
            <portal></portal>
        </section>
        <info-footer></info-footer>
    </div>
</template>

<script>
    import InfoFooter from './components/InfoFooter'
    import Portal from './components/Portal'

    export default {
        name: 'app',
        components: {
            InfoFooter, Portal
        }
    }
</script>
