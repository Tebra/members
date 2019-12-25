import React from 'react';
import {
  Container, Header, Item, Input, Icon, Content, Text, Card, CardItem, Button, Body, Right,
} from 'native-base';
import {
  FlatList, RefreshControl, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';

const Members = ({
  error, members, loading, reFetch,
}) => {
  // Loading
  if (loading) {
    return <Loading />;
  }

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Mitglied suchen.." />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>

      <Content padder>
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <Card style={{ paddingHorizontal: 4 }}>
              <CardItem header>
                <Text style={{ fontWeight: '600' }}>
                  {item.lastname}
                  {' '}
                  {item.firstname}
                </Text>
                <Body />
                <Right>
                  <TouchableOpacity onPress={() => console.log('Pressed')} style={{ flex: 1 }}>
                    <Icon name="arrow-forward" />
                  </TouchableOpacity>
                </Right>
              </CardItem>

              <CardItem>
                <Text>
                  {item.lastname}
                </Text>
                <Spacer size={5} />
                <Text>
                  {item.firstname}
                </Text>
              </CardItem>

              <CardItem footer bordered />

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

Members.propTypes = {
  error: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
  reFetch: PropTypes.func.isRequired,
};

Members.defaultProps = {
  error: null,
};

export default Members;
