<template>
  <div>
    <Default>
      <Login></Login>
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
  name: "Tasks",
  components: {
    Default,
    Login,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
};
</script>
