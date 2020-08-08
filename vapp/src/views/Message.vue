<template>
  <div class="home">
    <Default>
      <v-card v-if="is_login" class="fill-height" width="7000" shaped>
        <v-list rounded>
          <v-subheader>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-row>
              <v-col md="2">邀请人</v-col>
              <v-col>任务</v-col>
              <v-col md="3">邀请状态</v-col>
            </v-row>
          </v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="item in messages" :key="item.invite_id">
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-row>
                  <v-col md="2">{{ item.invitor_name }}</v-col>
                  <v-col>{{ item.task_title }}</v-col>
                  <v-col md="3" v-if="item.result === 0">
                    <v-row dense>
                      <v-col>
                        <v-chip color="success" @click="accept(item.invite_id)" small>
                          <v-icon left>mdi-right</v-icon>接受
                        </v-chip>
                      </v-col>
                      <v-col>
                        <v-chip color="error" @click="reject(item.invite_id)" small>
                          <v-icon left>mdi-close</v-icon>拒绝
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col md="3" v-if="item.result === 1">已接受</v-col>
                  <v-col md="3" v-if="item.result === 2">已拒绝</v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
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
  name: "Message",
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
