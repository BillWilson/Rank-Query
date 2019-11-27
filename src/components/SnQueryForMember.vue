<template>
    <v-container>
        <v-layout
                column
                nowrap
                justify-center
                align-center
                fill-height
                :style="{paddingBottom: paddingBottomSize + 'em'}"
        >
            <v-flex xs12 sm12>
                <h3 class="display-1 mb-4 font-weight-black text-xs-center">活動獎項領取</h3>
                <v-form v-model="valid">
                    <v-text-field
                            label="Solo"
                            placeholder="請填寫你的專屬 ID"
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

            <v-flex xs12 sm12 :style="{paddingBottom: '1em'}">
                <v-card>
                    <v-container
                            fluid
                            grid-list-lg
                            fill-height
                            v-if="codes && !alert"
                    >
                        <v-layout row wrap align-center :style="{padding: '0em 4em 0em 4em', minWidth: '25em'}">
                            <v-flex xs12>
                                <h3 class="text-xs-center blue-grey--text darken-4">點選序號會自動複製起來</h3>

                                <v-list subheader>
                                    <v-subheader class="white--text title text-xs-center blue darken-3 text-center">角色暱稱</v-subheader>
                                    <v-divider></v-divider>
                                    <template>
                                        <v-list-tile
                                                @click=""
                                                v-clipboard:copy="captain.nickname"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                        >
                                            <v-list-tile-content :style="{paddingLeft: '1em'}">
                                                <v-list-tile-title v-html="captain.nickname"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-divider></v-divider>
                                    </template>
                                </v-list>

                                <v-list subheader>
                                    <v-subheader class="white--text title text-xs-center green darken-4 text-center">實況主序號</v-subheader>
                                    <v-divider></v-divider>
                                    <template>
                                        <v-list-tile
                                                @click=""
                                                v-clipboard:copy="captain.streamerSN"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                        >
                                            <v-list-tile-content :style="{paddingLeft: '1em'}">
                                                <v-list-tile-title v-html="captain.streamerSN"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-divider></v-divider>
                                    </template>
                                </v-list>

                                <v-list subheader>
                                    <v-subheader class="white--text title text-xs-center teal accent-4">觀眾序號</v-subheader>
                                    <template v-for="(code, index) in codes">
                                        <v-list-tile
                                                :key="code"
                                                @click=""
                                                v-clipboard:copy="code"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                v-if="index !== '0'"
                                        >
                                            <v-list-tile-content :style="{paddingLeft: '1em'}">
                                                <v-list-tile-title v-text="code" :id="'code-' + code"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </template>

                                </v-list>

                                <v-flex text-xs-center>
                                    <v-btn large color="primary" target="_blank" href="https://mycard.hundredsoul.com/coupon.php">前往兌換</v-btn>
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
                                        <li>經由本活動頁領取之序號僅限於台港澳伺服器使用。</li>
                                        <li>專屬 ID 屬個人隱私資料應妥善保管且不隨意提供給他人。</li>
                                        <li>若因個人因素導致無法領取序號或遭冒領，序號將不另行補發。</li>
                                        <li>每一序號僅能使用一次；相同類型序號每一帳號僅能使用一次。</li>
                                        <li>序號均不得要求轉讓、折換現金或其他等值商品，拒絕領取視同放棄。</li>
                                        <li>序號領取期限與使用期限依官方粉絲團公告為主。</li>
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

    export default {
        data: () => ({
            lastUpdate: document.querySelector("meta[name='lastUpdate']").getAttribute("content"),
            valid: false,

            snCode: '',
            codes: false,
            captain: {},

            alert: false,
            alertMessage: "",

            rules: {
                required: value => !!value || '請填入你的專屬 ID',
            },
            dialog: false,

            paddingBottomSize: 0,
        }),
        methods: {
            queryRank: function () {
                if (this.snCode) {
                    this.dialog = true;
                    const UserRef = db.collection("hsSNCode2019Fall").doc(this.snCode);
                    UserRef.get()
                        .then(doc => {
                            if (!doc.exists) {
                                this.alert = true;
                                this.alertMessage = '此專屬 ID 並未符合任何活動領獎資格，請確認輸入的專屬 ID 是否正確';
                            } else {
                                this.alert = false;
                                this.codes = doc.data().audience;
                                this.captain = {
                                    nickname: doc.data().nickname,
                                    streamerSN: doc.data().streamerSN
                                };
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
