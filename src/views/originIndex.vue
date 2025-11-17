<template>
  <v-container class="page-wrapper" fluid>
    <div class="text-center mt-6">
      <h3 class="page-title">
        Let's plan your <span class="highlight">saving goal.</span>
      </h3>
    </div>

    <v-card class="main-card mx-auto mt-6" elevation="2">
      <v-card-text>
        <div class="d-flex align-center mb-4">
          <div>
            <h2 class="goal-title">Buy a house</h2>
            <p class="goal-sub">Saving goal</p>
          </div>
        </div>

        <v-row dense>
          <v-col cols="12" md="6">
            <label class="label">Total amount</label>
            <AmountInput v-model="amount" />
          </v-col>

          <v-col cols="12" md="6">
            <label class="label">Reach goal by</label>
            <ReachDateInput v-model="reachDate" />
          </v-col>
        </v-row>

        <MonthlyAmountCard
          :monthly="monthlyAmount"
          :amount="amount"
          :reachDate="reachDate"
        />

        <v-btn class="confirm-btn mt-6" large block @click="showModal = true">
          Confirm
        </v-btn>
      </v-card-text>
    </v-card>

    <ConfirmModal
      :show.sync="showModal"
      :total="amountFormatted"
      :reach="reachFormatted"
      :monthly="monthlyAmountFormatted"
    />
  </v-container>
</template>

<script>
import AmountInput from "@/components/amountInput.vue";
import ReachDateInput from "@/components/reachDateInput.vue";
import MonthlyAmountCard from "@/components/monthlyAmountCard.vue";
import ConfirmModal from "@/components/confirmModal.vue";

export default {
  components: {
    AmountInput,
    ReachDateInput,
    MonthlyAmountCard,
    ConfirmModal,
  },

  data() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const reach = `${next.getFullYear()}-${(next.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    return {
      amount: 25000,
      reachDate: reach, // YYYY-MM
      showModal: false,
    };
  },

  computed: {
    totalMonths() {
      const now = new Date();
      now.setDate(1);

      const [y, m] = this.reachDate.split("-").map(Number);
      const target = new Date(y, m - 1, 1);

      return (
        (target.getFullYear() - now.getFullYear()) * 12 +
        (target.getMonth() - now.getMonth())
      );
    },

    monthlyAmount() {
      if (!this.amount || this.totalMonths <= 0) return 0;
      return Math.round(this.amount / this.totalMonths);
    },

    amountFormatted() {
      return `$${this.amount.toLocaleString()}`;
    },

    reachFormatted() {
      const [y, m] = this.reachDate.split("-").map(Number);
      return new Date(y, m - 1, 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
    },

    monthlyAmountFormatted() {
      return `$${this.monthlyAmount.toLocaleString()}`;
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  background: #f4f8fb;
  min-height: calc(100vh - 100px);
}

.page-title {
  font-size: 20px;
  color: #4d6475;
}

.highlight {
  font-weight: bold;
  color: #2155ff;
}

.main-card {
  max-width: 460px;
  border-radius: 16px;
}

.goal-title {
  font-size: 22px;
  font-weight: bold;
  color: #1a3146;
}

.goal-sub {
  font-size: 14px;
  color: #8a9aad;
}

.label {
  font-size: 13px;
  color: #8192a4;
  margin-bottom: 4px;
  display: block;
}

.confirm-btn {
  background: #2155ff !important;
  color: white !important;
  border-radius: 100px !important;
  font-weight: bold !important;
}
</style>
