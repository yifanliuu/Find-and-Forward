<template>
    <div class="pa-3">
        <v-card class="mx-auto" shaped>
            <v-list rounded>
                <v-subheader>
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-row>
                        <v-col md="2">任务</v-col>
                        <v-col>截止时间</v-col>
                        <v-col>奖励</v-col>
                    </v-row>
                </v-subheader>
                <v-list-item-group v-model="item" color="primary">
                    <v-list-item v-for="item in rewards" :key="item.task_id">
                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-row>
                                <v-col md="2">{{ item.task_title }}</v-col>
                                <v-col>{{ item.deadline }}</v-col>
                                <v-col>{{ item.reward }}</v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "MyReward",
    data() {
        return {
            icon: "mdi-flag",
            item: 1,
            user_id: -1,
            rewards: [],
        };
    },
    computed: {
        ...mapState(["username", "user_id", "address", "balance", "is_login"]),
    },
    mounted() {
        this.rewards = [
            {
                task_id: 1,
                task_title: "task1",
                deadline: "2020-08-20 16:00",
                reward: "未发放",
            },
            {
                task_id: 2,
                task_title: "task2",
                deadline: "2020-08-2 16:00",
                reward: 31,
            },
            {
                task_id: 3,
                task_title: "task3",
                deadline: "2020-08-3 16:00",
                reward: 27,
            },
        ];
    },
    methods: {},
};
</script>
