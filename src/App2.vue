<template>
    <v-app light class="main" style="min-height: 100%">
        <section class="top-banner">
            <v-layout column>
                <v-flex xs6 sm4>
                    <v-img
                            contain
                            max-height="315"
                            aspect-ratio="2.701"
                            :src="require('@/assets/hs-top-logo.png')">
                    </v-img>
                </v-flex>
            </v-layout>
        </section>

        <v-content>
            <SnQuery/>

            <v-footer
                    height="auto"
                    class="footer"
            >
                <v-layout
                        justify-center
                        row
                        wrap
                        class="footer-top"
                >
                    <v-btn
                            v-for="link in links"
                            :key="link.name"
                            flat
                            round
                            sm6
                            :href="link.href"
                            target="_blank"
                    >
                        {{ link.name }}
                    </v-btn>

                    <v-flex
                            py-3
                            text-xs-center
                            white--text
                            xs12
                            class="footer-bottom"
                    >
                        Copyright © HOUND 13. All Rights Reserved. <br> <a href="https://hundred-soul.tw/event/20190621/privacy.html" class="white--text" target="_blank">隱私權政策</a>
                    </v-flex>
                </v-layout>
            </v-footer>
        </v-content>
    </v-app>
</template>

<script>
    import SnQuery from './components/SnQuery';

    export default {
        name: 'App',
        components: {
            SnQuery
        },
        data: () => ({
            links: [
                {
                    name: '官方網站',
                    href: 'https://hundred-soul.tw/'
                },
                {
                    name: '官方粉絲團',
                    href: 'https://www.facebook.com/hundredsoul.tw'
                },
            ]
        })
    }
</script>
<style>
    .main {
        background: #9e8d84
    }

    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .footer-top {
        background: #CFD8DC;
    }

    .footer-bottom {
        background: #353c42;
    }

    .top-banner {
        background: url('assets/hs-cover-bg.jpg');
        background-size: cover;
        opacity:0.95;
    }

</style>
