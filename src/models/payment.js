import initState from '../store/payments';

export default {
  /**
   *  Initial state
   */
  state: {
    payments: initState.payments,
  },

  /**
   * Reducers
   */
  reducers: {
    // TODO: Implement replacePayments properly!
    replacePayments(state, payload) {
      return {
        ...state,
        payments: payload,
      };
    },
  },

  /**
   * Effects/Actions
   */
  effects: dispatch => ({
    getDummyPayments(payload) {
      return new Promise((resolve) => {
        setTimeout(resolve, 800);
        // return this.replacePayments(payload);
        return dispatch.payments;
      });
    },
    async getDummyPaymentsAsyncari(payload) {
      await new Promise(resolve => setTimeout(resolve, 800)).then(() => {
        dispatch.payments.replacePayments(payload);
      });
    },
  }),
};
