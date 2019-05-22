<template>
    <v-app light class="main">
        <v-content>
            <section>
                <v-layout column>
                    <v-flex xs6 sm4>
                        <v-img
                                :src="require('@/assets/banner.jpg')"
                        ></v-img>
                    </v-flex>
                </v-layout>
            </section>

            <QuerySearch/>

            <v-footer
                    height="auto"
            >
                <v-layout
                        justify-center
                        row
                        wrap
                        class="footer-top"
                >
                    <v-btn
                            v-for="link in links"
                            :key="link"
                            flat
                            round
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
                        Copyright © 2019 MCL, All Rights Reserved. | 本賽事由 HyperX 贊助
                    </v-flex>
                </v-layout>
            </v-footer>
        </v-content>
    </v-app>
</template>

<script>
    import QuerySearch from './components/QuerySearch'

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
                {
                    name: 'HyperX',
                    href: 'https://www.hyperxgaming.com/tw'
                },
            ]
        })
    }
</script>
<style>
    .main {
        background: #9e8d84
    }

    .footer-top {
        background: #ff9c00;
    }

    .footer-bottom {
        background: #353c42;
    }
</style>
