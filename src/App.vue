<template>
  <v-app>
    <v-app-bar height="100" app fixed color="primary" dark>
      <v-img
        src="/images/logo.png"
        contain
        max-height="150"
        max-width="200"
        class="mr-3"
      />
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
