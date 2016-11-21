<template>
    <div>
        <section class="section is-hidden-mobile">
            <div class="container">
                <nav class="nav">
                    <div class="nav-left">
                        <a class="nav-item is-brand" href="#">
                            <h1 class="title">Hacking Timer for Ingress</h1>
                        </a>
                    </div>
                    <div class="nav-right nav-menu">
                        <span class="nav-item">
                            <a class="button" @click="addPortal()">
                                <span class="icon is-small">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span>Add Portal</span>
                            </a>
                        </span>
                    </div>
                </nav>
            </div>
        </section>
        <section class="section" v-for="(portal, index) in portals">
            <portal :show-header="portals.length > 1" :init-name="getPortalName(index+1)"></portal>
        </section>
        <info-footer></info-footer>
    </div>
</template>

<script>
    import numberConverter from 'number-to-words'
    import InfoFooter from './components/InfoFooter'
    import Portal from './components/Portal'

    export default {
        name: 'app',
        components: {
            InfoFooter, Portal
        },
        data() {
            return {
                portals: [0]
            }
        },
        methods: {
            addPortal() {
                this.portals.push(Symbol('portal'))
            },
            getPortalName(number) {
                return `${numberConverter.toOrdinal(number)} Portal`
            }
        }
    }
</script>
