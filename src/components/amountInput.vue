<template>
  <v-text-field
    v-model="amount"
    outlined
    hide-details="auto"
    dense
    @input="handleInput"
    class="custom-input"
  >
    <template #prepend-inner>
      <v-icon>mdi-currency-usd</v-icon>
    </template>
  </v-text-field>
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
