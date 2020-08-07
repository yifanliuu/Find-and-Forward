<template>
    <div class="home">
        <Default>
            <el-input
                size="medium"
                v-model="input"
                placeholder="请输入被邀请者"
            ></el-input>
            <el-button type="text" @click="invite">点击邀请</el-button>
        </Default>
    </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
export default {
    name: "Work",
    components: {
        Default,
    },

    data() {
        return {
            input: "",
        };
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
