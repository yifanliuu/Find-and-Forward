<template>
    <div class="pa-3">
        <Default>
            <v-row v-if="is_login">
                <v-col md="4" v-for="item in tasks" :key="item.id">
                    <v-card class="mx-auto" max-width="344" shaped>
                        <v-img src="../assets/logo.png" height="200px"></v-img>

                        <v-card-title>{{ item.title }}</v-card-title>

                        <v-card-subtitle>{{ item.summary }}</v-card-subtitle>

                        <v-card-actions>
                            <v-btn text>Share</v-btn>

                            <v-btn color="purple" :to="`/${item.id}`"
                                >Explore</v-btn
                            >

                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <Login v-else> </Login>
        </Default>
    </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
    name: "Home",
    components: {
        Default,
        Login,
    },
    data() {
        return {
            tasks: [],
        };
    },
    computed: {
        ...mapState(["username", "user_id", "address", "balance", "is_login"]),
    },
    mounted() {
        this.tasks = [
            {
                id: 0,
                title: "task1",
                img: "../assets/logo.png",
                summary: "good1",
            },
            {
                id: 1,
                title: "task2",
                img: "../assets/logo.png",
                summary: "good2",
            },
            {
                id: 2,
                title: "task3",
                img: "../assets/logo.png",
                summary: "good3",
            },
            {
                id: 3,
                title: "task4",
                img: "../assets/logo.png",
                summary: "good4",
            },
            {
                id: 4,
                title: "task5",
                img: "../assets/logo.png",
                summary: "good5",
            },
            {
                id: 5,
                title: "task6",
                img: "../assets/logo.png",
                summary: "good6",
            },
        ];
        console.log(this.username);
    },
};
</script>
