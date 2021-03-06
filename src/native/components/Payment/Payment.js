import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Container, Icon, Content, Text, Card, CardItem, Body, Right,
} from 'native-base';
import {
  FlatList, RefreshControl, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import Loading from '../UI/Loading';
import Error from '../UI/Error';

const Payment = ({
  error, payments, loading, reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  return (
    <Container>
      <Content padder>
        <FlatList
          data={payments}
          renderItem={({ item }) => (
            <Card style={{ paddingHorizontal: 4 }}>
              <CardItem header>
                <Text style={{ fontWeight: '600' }}>
                  {item.title}
                </Text>
                <Body />
                <Right>
                  <TouchableOpacity onPress={() => Actions.payments()} style={{ flex: 1 }}>
                    <Icon name="arrow-forward" />
                  </TouchableOpacity>
                </Right>
              </CardItem>

              <CardItem>
                <Text>
                  {item.payedBy}
                </Text>
                <Text>
                  {item.comment}
                </Text>
              </CardItem>

              <CardItem footer bordered>
                <Text>
                  {format(parseISO(item.dateFrom), 'dd.MM.yyyy')}
                </Text>
                <Text> - </Text>
                <Text>
                  {format(parseISO(item.dateTo), 'dd.MM.yyyy')}
                </Text>
              </CardItem>

            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          )}
        />
      </Content>
    </Container>
  );
};

Payment.propTypes = {
  error: PropTypes.string,
  payments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
  reFetch: PropTypes.func.isRequired,
};

Payment.defaultProps = {
  error: null,
};

export default Payment;
