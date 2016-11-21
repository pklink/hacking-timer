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
        <section class="section" v-for="portal in portals">
            <portal :show-header="portals.length > 1" :portal="portal" @remove="remove(portal)"></portal>
        </section>
        <info-footer></info-footer>
    </div>
</template>

<script>
    import InfoFooter from './components/InfoFooter'
    import Portal from './components/Portal'
    import PortalModel from './models/Portal'

    export default {
        name: 'app',
        components: {
            InfoFooter, Portal
        },
        data() {
            return {
                portals: [new PortalModel()]
            }
        },
        methods: {
            addPortal() {
                this.portals.push(new PortalModel())
            },
            remove(portal) {
                this.portals = this.portals.filter(p => p !== portal)
            }
        }
    }
</script>
