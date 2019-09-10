<template>
    <v-container>
        <v-layout
                column
                wrap
                justify-center
                align-center
                fill-height
                :style="{paddingBottom: paddingBottomSize + 'em'}"
        >
            <v-flex xs12 sm4 xs4>
                <h3 class="display-1 mb-4 font-weight-black text-xs-center">騎士團專屬卡序號兌換</h3>
                <v-form v-model="valid">
                    <v-text-field
                            label="Solo"
                            placeholder="請輸入你的序號"
                            solo
                            append-icon="search"
                            v-model="snCode"
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
                                color="blue-grey darken-4"
                                dark
                        >
                            <v-card-text class="white--text">
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

            <v-flex xs12 sm4 :style="{paddingBottom: '1em'}">
                <v-card>
                    <v-container
                            fluid
                            grid-list-lg
                            fill-height
                            v-if="codes && !alert"
                    >
                        <v-layout row wrap align-center justify-center>
                            <v-flex xs12>
                                <h3 class="text-xs-center blue-grey--text darken-4">點選序號會自動複製起來</h3>

                                <v-list subheader>
                                    <v-subheader class="white--text title text-xs-center green darken-4">團長虛寶序號 - 綠寶石1,000顆</v-subheader>
                                    <v-divider></v-divider>
                                    <template>
                                        <v-list-tile
                                                @click=""
                                                v-clipboard:copy="captain"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                        >
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="captain"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-divider></v-divider>
                                    </template>
                                </v-list>

                                <v-list subheader>
                                    <v-subheader class="white--text title text-xs-center teal accent-4">團員虛寶序號 - 綠寶石500顆</v-subheader>
                                    <template v-for="(code, index) in codes">
                                        <v-list-tile
                                                :key="code"
                                                @click=""
                                                v-clipboard:copy="code"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                v-if="index !== '0'"
                                        >
                                            <v-list-tile-content>
                                                <v-list-tile-title v-text="code" :id="'code-' + code"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-divider></v-divider>
                                    </template>

                                </v-list>

                                <v-flex text-xs-center v-if="depositLink === '#'">
                                    <v-btn large color="primary" target="_blank" v-on:click.prevent="goDeposit" :href="depositLink">序號兌換功能將於遊戲上市後開放</v-btn>
                                </v-flex>

                                <v-flex text-xs-center v-if="depositLink !== '#'">
                                    <v-btn large color="primary" target="_blank" :href="depositLink">前往兌換</v-btn>
                                </v-flex>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>

            <v-flex xs12>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0 black--text">注意事項說明</h3>
                            <div>
                                <blockquote class="blockquote">
                                    <ul class="subheading" id="announce-text">
                                        <li>騎士團專屬虛寶卡序號兌換之虛寶序號僅限於台港澳伺服器使用。</li>
                                        <li>本活動所贈送之虛寶序號只能使用一次。</li>
                                        <li>每一帳號只能分別使用一次團長序號及團員序號。</li>
                                        <li>虛寶序號可於遊戲上市後至遊戲官網虛寶兌換頁兌換遊戲內虛寶。</li>
                                        <li>虛寶序號須於 <b class="body-2">2019.9.30 23:59</b> 前兌換完畢，逾期失效不另行補發。</li>
                                        <li>序號均不得轉讓、折換現金或其它等值商品，拒絕領取則視同放棄。</li>
                                        <li>其他未盡事宜將於官方粉絲團公告，不另行通知。</li>
                                        <li>主辦單位保有修改、變更及終止活動之所有權利。</li>
                                    </ul>
                                </blockquote>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import {firebaseApp} from '../plugins/firebase';

    const db = firebaseApp.db;

    const nowTime = Math.floor(Date.now() / 1000);
    const publishDate = '1563163200';

    const link = nowTime > publishDate ? 'https://h-soul.tw/GiftCode/SGSeventserial' : '#';

    export default {
        data: () => ({
            lastUpdate: document.querySelector("meta[name='lastUpdate']").getAttribute("content"),
            valid: false,

            snCode: '',
            codes: false,
            captain: '',

            alert: false,
            alertMessage: "",

            rules: {
                required: value => !!value || '請填入序號',
            },
            dialog: false,

            paddingBottomSize: 0,

            depositLink: link,
        }),
        methods: {
            queryRank: function () {
                if (this.snCode) {
                    this.dialog = true;
                    const UserRef = db.collection("hsSNCode2019").doc(this.snCode);
                    UserRef.get()
                        .then(doc => {
                            if (!doc.exists) {
                                this.alert = true;
                                this.alertMessage = '找不到該序號，請確認輸入的序號是否正確';
                            } else {
                                this.alert = false;
                                this.codes = doc.data();
                                this.captain = doc.data()[0];
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

            onResize() {
                this.paddingBottomSize = window.innerWidth < 600 ? 15 : 8;
            },

            onCopy: function () {
                alert('已經將您的序號複製起來了喔!');
            },

            onError: function () {
                alert('複製失敗，請手動複製');
            },

            goDeposit: function () {
                alert('序號兌換功能將於遊戲上市後開放');
            }
        },

        beforeDestroy() {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', this.onResize, {passive: true})
            }
        },

        mounted() {
            this.onResize();
            window.addEventListener('resize', this.onResize, {passive: true})
        },
    }
</script>

<style>
    #announce-text {
        list-style-type:decimal;
    }
</style>
