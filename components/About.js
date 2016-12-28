import React, { Component } from 'react'
import { Container, Content, Header, Title, Button, Icon, View } from 'native-base'
import { WebView, Dimensions } from 'react-native'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default class About extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => this.props.navigator.pop()}>
            <Icon name='ios-arrow-back' />
          </Button>

          <Title>About</Title>
        </Header>

        <Content contentContainerStyle={{ justifyContent: 'space-between' }} >
          <WebView style={{flex: 1, height: height, width: width}} source={{uri: 'https://www.subkit.io'}} />
        </Content>

      </Container>
    )
  }
}
