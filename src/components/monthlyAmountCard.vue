<template>
  <v-card class="pa-4 mt-4" outlined>
    <div class="d-flex justify-space-between">
      <span class="label">Monthly amount</span>
      <span class="amount">${{ monthly.toLocaleString() }}</span>
    </div>

    <p class="note mt-3">
      You're planning <strong>{{ months }}</strong> monthly deposits to reach
      your <strong>${{ amount.toLocaleString() }}</strong> goal by
      <strong>{{ reachFormatted }}</strong
      >.
    </p>
  </v-card>
</template>

<script>
export default {
  props: ["monthly", "amount", "reachDate"],

  computed: {
    reachObj() {
      const [y, m] = this.reachDate.split("-").map(Number);
      return new Date(y, m - 1, 1);
    },

    months() {
      const now = new Date();
      now.setDate(1);
      const t = this.reachObj;

      return (
        (t.getFullYear() - now.getFullYear()) * 12 +
        (t.getMonth() - now.getMonth())
      );
    },

    reachFormatted() {
      return this.reachObj.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>
