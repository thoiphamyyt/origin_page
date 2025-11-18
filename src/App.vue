<template>
  <v-app>
    <v-app-bar app fixed color="white">
      <div class="d-flex align-center">
        <v-img src="/images/logoOrigin.png" contain class="ml-3" />
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
