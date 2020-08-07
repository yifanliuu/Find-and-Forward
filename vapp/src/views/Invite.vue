<template>
    <div class="invite">
        <Default>
            <Friends v-if="is_login"> </Friends>
            <Login v-else></Login>
        </Default>
    </div>
</template>

<script>
import Default from "../layout/default";
import Friends from "../components/Friends";
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
    name: "Invite",
    components: {
        Default,
        Friends,
        Login,
    },

    data() {
        return {
            input: "",
            friends: [
                {
                    id: 1,
                    username: "雅妮",
                },
            ],
        };
    },
    computed: {
        ...mapState(["username", "user_id", "address", "balance", "is_login"]),
    },
    methods: {
        invite() {
            this.$confirm("此操作将发送邀请, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "发送邀请成功!",
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消邀请",
                    });
                });
        },
    },
};
</script>
