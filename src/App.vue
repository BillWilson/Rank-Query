<template>
    <v-app light class="main" style="min-height: 100%">
        <section class="top-banner">
            <v-layout column>
                <v-flex xs6 sm4>
                    <v-img
                            contain
                            max-height="315"
                            aspect-ratio="2.701"
                            :src="require('@/assets/banner.jpg')"
                    ></v-img>
                </v-flex>
            </v-layout>
        </section>

        <v-content>
            <QuerySearch/>

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
                            :href="link.href"
                            target="_blank"
                    >
                        {{ link.name }}
                    </v-btn>

                    <a href="https://www.hyperxgaming.com/tw" target="_blank"><img style="margin-top: 0.6em" :src="require('@/assets/HyperX-logo-white.png')" height="35"/></a>

                    <v-flex
                            py-3
                            text-xs-center
                            white--text
                            xs12
                            class="footer-bottom"
                    >
                        Copyright © 2019 MCL | 本賽事由 HyperX 贊助
                    </v-flex>
                </v-layout>
            </v-footer>
        </v-content>
    </v-app>
</template>

<script>
    import QuerySearch from './components/QuerySearch';

    export default {
        name: 'App',
        components: {
            QuerySearch
        },
        data: () => ({
            links: [
                {
                    name: '賽事官網',
                    href: 'http://mcl.game.tw/kingofow'
                },
                {
                    name: '官方粉絲團',
                    href: 'https://facebook.com/mcl.game.tw'
                },
                {
                    name: '鬥陣特攻',
                    href: 'https://playoverwatch.com/zh-tw/'
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
        background: #ff9c00;
    }

    .footer-bottom {
        background: #353c42;
    }

    .top-banner {
        background: url('assets/banner-blur.jpg');
        background-size: cover;
    }
</style>
