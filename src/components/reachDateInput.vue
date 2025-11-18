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
          <span class="month-text"> {{ monthName }} </span>
          <span class="year-text"> {{ year }} </span>
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
      const today = new Date().toISOString().substring(0, 7); // YYYY-MM
      return date > today;
    },
  },
};
</script>
