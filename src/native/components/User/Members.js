import React from 'react';
import {
  View,
  Container,
  Grid,
  Col,
  Row,
  Header,
  Item,
  Input,
  Icon,
  Content,
  Text,
  Card,
  CardItem,
  Button,
  Body,
  Right,
} from 'native-base';
import {
  FlatList, RefreshControl, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading';
import Error from '../UI/Error';

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

              <Grid>
                <Row>
                  <CardItem header>
                    <Text style={{
                      fontWeight: '600',
                      fontSize: 16,
                    }}
                    >
                      {item.lastname}
                      {' '}
                      {item.firstname}
                    </Text>
                    <Body />
                  </CardItem>
                </Row>
                <Row>

                  <Col size={8} style={{ backgroundColor: '#635DB7' }}>
                    <CardItem>
                      <View style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}
                      >
                        <Text>
                          {item.phone}
                        </Text>
                        <Text>
                          {item.address}
                        </Text>
                      </View>
                    </CardItem>
                  </Col>

                  <Col size={1}>
                    <TouchableOpacity onPress={() => console.log('Pressed')} style={{ flex: 1 }}>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </TouchableOpacity>
                  </Col>

                </Row>
              </Grid>
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
