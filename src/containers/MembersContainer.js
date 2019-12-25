import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MembersContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchMembers: PropTypes.func.isRequired,
  }

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    const { fetchMembers } = this.props;
    this.setState({ loading: true });

    return fetchMembers(data)
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
    const { Layout, members } = this.props;
    const { loading, error } = this.state;

    return (
      <Layout
        error={error}
        loading={loading}
        members={members}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  members: state.member.members || [],
});

const mapDispatchToProps = dispatch => ({
  fetchMembers: dispatch.member.getAllMembers,
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
