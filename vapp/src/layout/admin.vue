<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link to="/admin/tasks">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>所有任务</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/manage">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>任务管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/invite">
          <v-list-item-action>
            <v-icon>mdi-plus-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>邀请好友</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red darken-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>发现♥ Forward 管理平台</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer app color="red darken-4" dark>
      <span>
        {{ new Date().getFullYear() }}&copy;1GUO3LIU. All CopyRight
        Reserved.
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created() {
    //this.$vuetify.theme.dark = true;
  },
};
</script>
