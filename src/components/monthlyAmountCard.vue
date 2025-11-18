<template>
  <v-card class="mt-4" outlined>
    <div class="d-flex justify-space-between pa-5">
      <span class="monthly">Monthly amount</span>
      <span class="amount-text">${{ monthly.toLocaleString() }}</span>
    </div>

    <div class="planning pa-5">
      You're planning <strong>{{ months }} monthly deposits</strong> to reach
      your <strong>${{ amount.toLocaleString() }}</strong> goal by
      <strong>{{ reachFormatted }}</strong
      >.
    </div>
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
