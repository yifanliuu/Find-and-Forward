<template>
  <v-card class="fill-height" width="7000" shaped>
    <v-list rounded>
      <v-subheader>
        <v-list-item-icon>
          <v-icon></v-icon>
        </v-list-item-icon>
        <v-row>
          <v-col md="2">朋友名</v-col>
          <v-col>任务名</v-col>
          <v-col md="3">邀请状态</v-col>
        </v-row>
      </v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item v-for="item in messages" :key="item.id">
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-row>
              <v-col md="2">{{item.invitor}}</v-col>
              <v-col>{{item.task_title}}</v-col>
              <v-col md="3" v-if="item.status === 0">
                <v-row height="20">
                  <v-col>
                    <v-btn>接受</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn>拒绝</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col v-if="item.status === 1">已接受</v-col>
              <v-col v-if="item.status === 2">已拒绝</v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "Friends",
  data() {
    return {
      icon: "mdi-flag",
      item: 1,
      show_login: true, //是否显示登陆页面，否则显示注册页面
      is_login: false, //是否登录
    };
  },
};
</script>