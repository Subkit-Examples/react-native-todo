import React, { Component, PropTypes } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button, Icon, Spinner } from 'native-base'
import { View } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import TodoListItem from './TodoListItem'
import About from './About'

class TodoList extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    data: PropTypes.shape({
      allTodos: PropTypes.array,
    }).isRequired
  }

  state = {
    inputText: '',
  }

  add() {
    return this.props.addTodo({ variables: { text: this.state.inputText || 'empty' } })
      .then(this.props.data.refetch)
      .then(x => this.setState({inputText: ''}))
  }

  remove(id) {
    return this.props.deleteTodo({ variables: { id: id } })
      .then(this.props.data.refetch)
  }

  toggle(item) {
    return this.props.updateTodo({ variables: { id: item.id, rev: item.rev, text: item.text, complete: !item.complete } })
      .then(this.props.data.refetch)
  }

  render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => this.props.navigator.push({component: About})}>
            <Icon name='ios-more' />
          </Button>
          <Title>Todos</Title>
        </Header>

        <Content contentContainerStyle={{ justifyContent: 'space-between' }} >
          <View style={{ alignSelf: 'flex-end', flex: 0, padding: 5, flexDirection: 'row'}}>

            <InputGroup borderType="underline" style={{ flex: 0.8 }}>
              <Input
                placeholder="Type Your Text Here"
                value={this.state.inputText}
                onChangeText={inputText => this.setState({ inputText })}
                onSubmitEditing={() => this.add()}
                maxLength={35}
              />
            </InputGroup>

            <Button block success style={{flex:0.2,marginLeft:15,marginTop:7,height:35,borderRadius:0}} onPress={() => this.add()}>Add</Button>
          </View>

          <View>
            {this.props.data.loading &&
              <Spinner color='blue' />
            }
            <List>
              {(this.props.data.allTodos || []).map((item, index) =>
                <TodoListItem
                  toggle={() => this.toggle(item)}
                  remove={() => this.remove(item.id)}
                  item={item}
                  key={index}
                />
              )}
            </List>
          </View>
        </Content>
      </Container>
    )
  }
}

const allTodoesQuery = gql`
query allTodoes {
  allTodos {
    id
    rev
    text
    complete
  }
}
`

const addTodoMutation = gql`
mutation ($text: String!){
  upsertTodo(input: {text: $text, complete: false}) {
    todo {
      id
      rev
      text
      complete
    }
  }
}
`

const updateTodoMutation = gql`
mutation ($id: ID!, $rev: String!, $text: String!, $complete: Boolean!){
  upsertTodo(input: {id: $id, rev: $rev, text: $text, complete: $complete}) {
    todo {
      id
      rev
      text
      complete
    }
  }
}
`

const deleteTodoMutation = gql`
mutation ($id: ID!){
  deleteTodo(input: {id: $id}) {
    deletedTodoId
  }
}
`

export default graphql(addTodoMutation, {name: 'addTodo'})(
  graphql(updateTodoMutation, {name: 'updateTodo'})(
    graphql(deleteTodoMutation, {name: 'deleteTodo'})(
      graphql(allTodoesQuery, {
        options: { pollInterval: 5000 }
      })(TodoList)
    )
  )
)
