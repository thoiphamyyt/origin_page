<template>
  <div class="date-box">
    <v-btn icon small @click="prevMonth">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      max-width="300"
    >
      <template #activator="{ on, attrs }">
        <div class="date-text" v-bind="attrs" v-on="on">
          {{ monthName }} {{ year }}
        </div>
      </template>

      <v-date-picker
        v-model="internal"
        type="month"
        color="primary"
        :allowed-dates="allowedFutureMonths"
        @input="selectMonth"
      />
    </v-menu>

    <v-btn icon small @click="nextMonth">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String, // YYYY-MM
      required: true,
    },
  },

  data() {
    return {
      menu: false,
      internal: this.value, // YYYY-MM
    };
  },

  watch: {
    value(val) {
      this.internal = val;
    },
  },

  computed: {
    monthName() {
      const [y, m] = this.internal.split("-").map(Number);
      return new Date(y, m - 1).toLocaleString("en-US", { month: "long" });
    },
    year() {
      return this.internal.split("-")[0];
    },
  },

  methods: {
    selectMonth(val) {
      this.internal = val;
      this.menu = false;
      this.$emit("input", val); // YYYY-MM
    },

    nextMonth() {
      const [y, m] = this.internal.split("-").map(Number);
      const d = new Date(y, m, 1);
      const mm = (d.getMonth() + 1).toString().padStart(2, "0");
      const str = `${d.getFullYear()}-${mm}`;
      this.internal = str;
      this.$emit("input", str);
    },

    prevMonth() {
      const [y, m] = this.internal.split("-").map(Number);
      const d = new Date(y, m - 2, 1);
      const mm = (d.getMonth() + 1).toString().padStart(2, "0");
      const str = `${d.getFullYear()}-${mm}`;
      this.internal = str;
      this.$emit("input", str);
    },
    allowedFutureMonths(date) {
      // date dạng YYYY-MM
      const today = new Date().toISOString().substring(0, 7); // YYYY-MM
      return date > today; // chỉ allow tháng tương lai
    },
  },
};
</script>

<style scoped>
.date-box {
  border: 1px solid #dce3eb;
  border-radius: 8px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 180px;
  background: #fff;
}
.date-text {
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
</style>
