<template>
  <div>
    <Admin>
      <v-card v-if="is_login" class="fill-height" width="7000" color="red lighten-2" shaped>
        <v-row class="pl-3 pr-3">
          <v-col md="4" v-for="item in tasks" :key="item.id">
            <v-card class="mx-auto" max-width="344" light shaped>
              <v-img src="../../assets/logo.png" height="200px"></v-img>

              <v-card-title>{{ item.title }}</v-card-title>

              <v-card-subtitle>{{ item.summary }}</v-card-subtitle>

              <v-card-actions>
                <v-btn text to="/admin/invite">Share</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <Login v-else></Login>
    </Admin>
  </div>
</template>

<script>
// @ is an alias to /src
import Admin from "../../layout/admin";
import Login from "../../components/Login";
import { mapState } from "vuex";

export default {
  name: "AdminTasks",
  components: {
    Admin,
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
  async mounted() {
    const res = await this.$axios.get("/api/task", {
      params: {
        user_id: this.user_id,
      },
    });
    //console.log(res.data.payload);
    this.tasks = res.data.payload;
  },
};
</script>
