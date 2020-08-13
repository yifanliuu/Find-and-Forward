<template>
  <div class="home">
    <Default>
      <v-card v-if="is_login" class="fill-height" width="7000" color="red lighten-2" dark shaped>
        <v-card-title class="headline red lighten-3">创建任务</v-card-title>
        <v-card light shaped></v-card>
      </v-card>
      <Login v-else></Login>
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
  name: "Create",
  components: {
    Default,
    Login,
  },
  data() {
    return {
      // status: 0未处理，1已接受，2已拒绝
      item: null,
      icon: "mdi-flag",
      messages: [],
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  async mounted() {
    const res = await this.$axios.get("/api/message", {
      params: { user_id: this.user_id },
    });
    console.log(res);
    this.messages = res.data.payload.invite_list;
  },
  methods: {
    accept(id) {
      console.log(id);
      this.$confirm("此操作将接受邀请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const res = this.$axios.patch("/api/message", {
            invite_id: id,
            result: 1,
          });
          console.log(res.data);
          if (res.status == 404) {
            this.$message({
              type: "error",
              message: "接受邀请失败!",
            });
          } else {
            this.$message({
              type: "success",
              message: "接受邀请成功!",
            });
            this.update();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    reject(id) {
      console.log(id);
      this.$confirm("此操作将拒绝邀请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const res = this.$axios.patch("/api/message", {
            invite_id: id,
            result: 2,
          });
          console.log(res.data);
          if (res.status == 404) {
            this.$message({
              type: "error",
              message: "拒绝邀请失败!",
            });
          } else {
            this.$message({
              type: "success",
              message: "拒绝邀请成功!",
            });
            this.update();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async update() {
      const res = await this.$axios.get("/api/message", {
        params: { user_id: this.user_id },
      });
      console.log(res);
      this.messages = res.data.payload.invite_list;
    },
  },
};
</script>
