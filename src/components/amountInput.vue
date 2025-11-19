<template>
  <v-text-field
    v-model="amount"
    outlined
    hide-details="auto"
    dense
    @input="handleInput"
    @keydown="onlyNumber"
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
    onlyNumber(e) {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
      ];

      if (allowedKeys.includes(e.key)) return;

      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    },
  },
};
</script>
