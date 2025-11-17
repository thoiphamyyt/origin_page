<template>
  <v-text-field v-model="amount" outlined dense @input="handleInput" />
</template>

<script>
export default {
  props: ["value"],

  computed: {
    amount: {
      get() {
        return this.value ? this.value.toLocaleString() : "";
      },
      set(val) {
        this.$emit("input", Number(val.replace(/,/g, "")));
      },
    },
  },

  methods: {
    handleInput(val) {
      const clean = val.replace(/[^\d]/g, "");
      this.$emit("input", Number(clean));
    },
  },
};
</script>
