<template>
    <v-container>
        <v-layout
                column
                text-xs-center
                wrap
                justify-center
                align-content-center
                fill-height
                :style="{paddingBottom: paddingBottomSize + 'em'}"
        >
            <v-flex xs12 sm4 xs4>
                <h3 class="display-1 mb-1 font-weight-black">英雄交鋒賽積分查詢</h3>
                <div class="mb-3">
                    <v-chip outline color="primary">
                        <v-icon left>list</v-icon>
                        積分資料提供：Blizzard Entertainment
                    </v-chip>
                    <v-chip outline color="green">
                        <v-icon left>update</v-icon>
                        最後更新時間：尚未更新
                    </v-chip>
                </div>
                <v-form v-model="valid">
                    <v-text-field
                            label="Solo"
                            placeholder="請輸入你的 Battle Tag"
                            solo
                            append-icon="search"
                            v-model="battleTag"
                            :rules="[rules.required]"
                            @click:append="queryRank"
                            v-on:keydown.enter.prevent="queryRank"
                            :disabled="dialog"
                            :loading="dialog"
                    ></v-text-field>
                    <v-dialog
                            v-model="dialog"
                            hide-overlay
                            persistent
                            width="300"
                    >
                        <v-card
                                color="orange"
                                dark
                        >
                            <v-card-text class="black--text">
                                請稍候...
                                <v-progress-linear
                                        indeterminate
                                        color="white"
                                        class="mb-0"
                                ></v-progress-linear>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-form>
            </v-flex>

            <v-flex xs12 sm12 v-if="alert">
                <v-alert
                        :value="true"
                        type="error"
                >
                    {{ alertMessage }}
                </v-alert>
            </v-flex>

            <v-flex xs12 sm4>
                <v-card>
                    <v-container
                            fluid
                            grid-list-lg
                            fill-height
                            v-if="rank && !alert"
                    >
                        <v-layout row wrap align-center justify-center>
                            <v-flex xs12>
                                <v-card class="white--text" :elevation="8">
                                    <v-card-title primary-title class="data-card">
                                        <div class="small-card">
                                            <div class="data-card-title">您的 Battle Tag</div>
                                            <h2 class="font-weight-regular data-card-value-long">{{ UserId }}</h2>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>

                            <v-flex xs12 md4 lg4>
                                <v-card color="purple" class="white--text" :elevation="8">
                                    <v-card-title primary-title class="data-card">
                                        <div class="small-card">
                                            <div class="data-card-title">排名</div>
                                            <h2 class="font-weight-black data-card-value">{{ rank }}</h2>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>

                            <v-flex xs12 md4 lg4>
                                <v-card color="green darken-2" class="white--text" :elevation="8">
                                    <v-card-title primary-title class="data-card">
                                        <div class="small-card">
                                            <div class="data-card-title">積分</div>
                                            <h2 class="font-weight-black data-card-value">{{ score }}</h2>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>

                            <v-flex xs12 md4 lg4>
                                <v-card color="green darken-2" class="white--text" :elevation="8">
                                    <v-card-title primary-title class="data-card">
                                        <div class="small-card">
                                            <div class="data-card-title">場數</div>
                                            <h2 class="font-weight-black data-card-value">{{ games }}</h2>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {db} from '../plugins/firebase';

    export default {
        data: () => ({
            valid: false,

            UserId: "",
            alert: false,
            alertMessage: "",
            score: 0,
            rank: 0,
            games: 0,

            battleTag: '',
            rules: {
                required: value => !!value || '請填入 Battle Tag.',
            },
            dialog: false,

            paddingBottomSize: 0,
        }),
        methods: {
            queryRank: function () {
                if (this.battleTag) {
                    this.dialog = true;
                    const UserRef = db.collection("Users").doc(this.battleTag.toLowerCase());
                    UserRef.get()
                        .then(doc => {
                            if (!doc.exists) {
                                this.alert = true;
                                this.alertMessage = '找不到積分資料，請確認輸入的 Battle tag 是否正確';
                            } else {
                                this.alert = false;
                                this.score = doc.data().score;
                                this.rank = doc.data().rank;
                                this.games = doc.data().games;
                                this.UserId = this.battleTag;
                            }
                            this.dialog = false;
                        })
                        .catch(() => {
                            this.alert = true;
                            this.alertMessage = '連線錯誤，請稍後再試';
                            this.dialog = false;
                        });
                }
            },

            onResize () {
                this.paddingBottomSize = window.innerWidth < 600 ? 11 : 8;
            }
        },

        beforeDestroy () {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', this.onResize, { passive: true })
            }
        },

        mounted () {
            this.onResize()
            window.addEventListener('resize', this.onResize, { passive: true })
        },
    }
</script>

<style>
    .small-card {
        margin: 0px auto;
    }

    .data-card {
        background: #1a325e;
    }

    .data-card-title {
        color: #ffffff;
        font-size: 2vh;
    }

    .data-card-value {
        color: #ff9c00;
        font-size: 4.8vh;
    }

    .data-card-value-long {
        color: #ff9c00;
        font-size: 3.5vh;
    }
</style>
