import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PaymentListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    payments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchPayments: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    const { fetchPayments } = this.props;
    this.setState({ loading: true });

    return fetchPayments(data)
      .then(() => this.setState({
        loading: false,
        error: null,
      }))
      .catch(err => this.setState({
        loading: false,
        error: err,
      }));
  }

  render = () => {
    const { Layout, payments } = this.props;
    const { loading, error } = this.state;

    return (
      <Layout
        error={error}
        loading={loading}
        payments={payments}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  payments: state.payments.payments || [],
});

const mapDispatchToProps = dispatch => ({
  fetchPayments: dispatch.payments.getDummyPayments,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentListing);
