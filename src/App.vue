<template>
  <v-app>
    <v-app-bar height="100" app fixed color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          src="/images/logo.png"
          contain
          width="200"
          height="150"
          class="mr-3 mt-10"
        />
      </div>
    </v-app-bar>

    <v-main>
      <OriginIndex />
    </v-main>
  </v-app>
</template>

<script>
import OriginIndex from "@/views/originIndex.vue";

export default {
  name: "App",

  components: {
    OriginIndex,
  },

  data: () => ({
    //
  }),
};
</script>
