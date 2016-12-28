import React, { PropTypes } from 'react'
import { Text, Icon, ListItem, CheckBox } from 'native-base'

export default TodoItem = ({ toggle, remove, item }) => (
  <ListItem style={{ flex: 1 }}>
    <CheckBox onPress={toggle} checked={item.complete} />
    <Text style={{ alignSelf: 'center' }}>{item.text}</Text>
    <Icon name="ios-trash" style={{fontSize: 30, color: 'red'}} onPress={remove} />
  </ListItem>
)

TodoItem.propTypes = {
  toggle: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}
