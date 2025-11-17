<template>
  <v-dialog v-model="localShow" max-width="450px" persistent>
    <v-card class="pa-4" elevation="6" shaped>
      <div class="text-center mb-4">
        <v-avatar size="64" class="green lighten-1">
          <v-icon dark size="36">mdi-check</v-icon>
        </v-avatar>
      </div>

      <v-card-title
        class="headline font-weight-bold justify-center text-center mb-2"
      >
        Goal Set Successfully!
      </v-card-title>

      <v-card-text class="text-center">
        <p class="mb-2">
          <strong>Total amount: </strong>
          <span class="text-primary"> {{ total }} </span>
        </p>
        <p class="mb-2">
          <strong>Reach goal by: </strong>
          <span class="text-primary"> {{ reach }} </span>
        </p>
        <p class="mb-0">
          <strong>Monthly amount: </strong>
          <span class="text-primary"> {{ monthly }} </span>
        </p>
      </v-card-text>

      <v-card-actions class="justify-center mt-4">
        <v-btn color="primary" width="130" rounded dark @click="closeModal">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show", "total", "reach", "monthly"],

  data() {
    return {
      localShow: this.show,
    };
  },

  watch: {
    show(val) {
      this.localShow = val;
    },
    localShow(val) {
      this.$emit("update:show", val);
    },
  },

  methods: {
    closeModal() {
      this.localShow = false;
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}

.v-card-text p {
  font-size: 14px;
  color: #4d6475;
}

.text-primary {
  color: #2155ff;
}

.v-avatar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
