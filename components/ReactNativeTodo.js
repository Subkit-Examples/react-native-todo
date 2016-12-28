import React, { Component } from 'react'
import { Navigator } from 'react-native'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import config from '../package.json'
import TodoList from './TodoList'

const networkInterface = createNetworkInterface({uri: config.graphql.endpoint.url})
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) req.options.headers = {}
    req.options.headers = config.graphql.endpoint.headers
    next()
  }
}]);

const client = new ApolloClient({networkInterface})

function renderScene(route, navigator) {
  return <route.component route={route} navigator={navigator} />
}

export default class ReactNativeTodo extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator
          style={{flex: 1}}
          initialRoute={{ component: TodoList }}
          renderScene={renderScene}
        />
      </ApolloProvider>
    )
  }
}
