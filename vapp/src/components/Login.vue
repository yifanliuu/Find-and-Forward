<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
            <v-card v-if="show_login" class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text
                    >Give us your user name to check your address.</v-card-text
                >
                <v-card-text>
                    <v-form>
                        <v-text-field
                            label="User Name"
                            name="username"
                            prepend-icon="mdi-account"
                            type="text"
                            v-model="user_name"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="change_show_login()"
                        >No Account? Sign up</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn @click="login()" color="primary">Login</v-btn>
                </v-card-actions>
            </v-card>
            <v-card v-else class="elevation-12">
                <v-toolbar light flat>
                    <v-toolbar-title>Sign Up</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>Give us your user name to sign up.</v-card-text>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            label="User Name"
                            name="User Name"
                            prepend-icon="mdi-account"
                            type="text"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="change_show_login()"
                        >Have Account? Login</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn @click="signup()" light>Sign Up</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            icon: "mdi-flag",
            item: 1,
            show_login: true, //是否显示登陆页面，否则显示注册页面
            user_name: "",
        };
    },
    computed: {
        ...mapState(["username", "user_id", "address", "balance", "is_login"]),
    },
    methods: {
        change_show_login() {
            this.show_login = !this.show_login;
        },
        signup() {},
        login() {
            const address = "0x22222222";
            if (address == -1) {
                this.$message({
                    type: "error",
                    message: "登陆失败",
                });
            } else {
                const user_id = 1;
                const username = "yifan";
                this.user_name = username;
                const balance = 7;
                this.$message({
                    type: "success",
                    message: "登陆成功",
                });
                this.$store.dispatch("setUsername", username);
                this.$store.dispatch("setUserId", user_id);
                this.$store.dispatch("setAddress", address);
                this.$store.dispatch("setBalance", balance);
                this.$store.dispatch("setIsLogin", true);
                if (username == "admin") {
                    this.$route.push("/admin/tasks");
                }
            }
        },
    },
};
</script>
