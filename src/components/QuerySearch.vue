<template>
    <v-container style="margin-bottom: 10em">
        <v-layout
                column
                text-xs-center
                wrap
                justify-center
                align-content-center
                fill-height
        >
            <v-flex xs12 sm4 xs4>
                <h3 class="display-1 mb-3">英雄交鋒賽積分查詢</h3>
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
                    ></v-text-field>
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

            <v-flex xs12 sm4 >
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
                                            <h2 class="font-weight-regular data-card-value">{{ UserId }}</h2>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>

                            <v-flex xs6>
                                <v-card color="purple" class="white--text" :elevation="8">
                                    <v-card-title primary-title class="data-card">
                                        <div class="small-card">
                                            <div class="data-card-title">排名</div>
                                            <h2 class="font-weight-black data-card-value">{{ rank }}</h2>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>

                            <v-flex xs6>
                                <v-card color="green darken-2" class="white--text" :elevation="8">
                                    <v-card-title primary-title class="data-card">
                                        <div class="small-card">
                                            <div class="data-card-title">積分</div>
                                            <h2 class="font-weight-black data-card-value">{{ score }}</h2>
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
    import { db } from '../plugins/firebase';

    export default {
        data: () => ({
            valid:false,

            UserId: "",
            alert: false,
            alertMessage: "",
            score: 0,
            rank: 0,

            battleTag: '',
            rules: {
                required: value => !!value || '請填入 Battle Tag.',
            },
        }),
        methods: {
            queryRank: function () {
                if (this.battleTag) {
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
                                this.UserId = this.battleTag;
                            }
                        })
                        .catch(() => {
                            this.alert = true;
                            this.alertMessage = '連線錯誤，請稍後再試';
                        });
                }
            }
        },
    }
</script>

<style>
.small-card {
    margin:0px auto;
}
.data-card {
    background: #1a325e;
}
.data-card-title {
    color: #ffffff;
    font-size: 1.3em;
}
.data-card-value {
    color: #ff9c00;
    font-size: 3.2em;
}
</style>
