<template>
  <div class="pa-3">
    <Default>
      <v-container class="text-center">
        <v-row>
          <v-col>
            <v-chip class="ma-2" color="green" text-color="white">
              <v-avatar left class="green darken-4">{{ $route.params.id }}</v-avatar>号任务
            </v-chip>

            <v-card class="mx-auto" max-width="344" shaped>
              <v-img src="../assets/logo.png" height="200px"></v-img>

              <v-card-title>title</v-card-title>

              <v-card-subtitle>summary</v-card-subtitle>
            </v-card>
          </v-col>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-col>
            <v-row>
              <v-col md="12">
                <v-chip class="ma-2" color="indigo" text-color="white">
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>创建者
                </v-chip>
              </v-col>
              <v-divider class="mx-4"></v-divider>
              <v-col md="12">
                <v-chip class="ma-2" color="orange" text-color="white">
                  任务详情
                  <v-icon right>mdi-star</v-icon>
                </v-chip>
              </v-col>
              <v-divider class="mx-4"></v-divider>
              <v-col md="12">
                <v-chip class="ma-2" color="primary" text-color="white">
                  任务截止时间
                  <v-icon right>mdi-star</v-icon>
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";

export default {
  name: "Detail",
  components: {
    Default,
  },
  data: () => ({}),
  methods: {
    close() {
      alert("Chip close clicked");
    },
  },
};
</script>
