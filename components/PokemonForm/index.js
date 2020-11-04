import React from 'react'
import { observer, useValue } from 'startupjs'
import { Select, Div, TextInput, Span, Row, Button, Br, Tag } from '@startupjs/ui'
import { faPlus, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import './index.styl'

const POKEMON_TYPES = [
  {
    label: 'Water',
    value: 'water'
  },
  {
    label: 'Fire',
    value: 'fire'
  },
  {
    label: 'Fairy',
    value: 'fairy'
  }
]

export default observer(function PokemonForm ({ data, $data, readonly }) {
  const [selectedType, $selectedType] = useValue()
  const pokemonTypes = POKEMON_TYPES.filter(t => !(data.types || []).includes(t.value))

  const addAbilityItem = () => {
    if (!data.abilities || (data.abilities[data.abilities.length - 1] !== '')) {
      $data.push('abilities', '')
    }
  }

  const addTypeItem = () => {
    $data.push('types', selectedType)
    $selectedType.del()
  }

  return pug`
    Div.root
      Br(half)
      TextInput(
        label='Name'
        value=data.name
        onChangeText=text => $data.set('name', text)
      )
      Br(half)
      TextInput(
        label='Image url'
        value=data.imageUrl
        onChangeText=text => $data.set('imageUrl', text)
      )
      Br(half)
      TextInput(
        label='Index'
        value=parseInt(data.index || 0)
        onChangeText=text => $data.set('index', +text)
        keyboardType='numeric'
      )
      Br
      Span(bold) Abilities
      if data.abilities
        each item, index in data.abilities
          Row.item(vAlign='center' align='between' key=index)
            Div.itemInput
              TextInput(
                value=item
                onChangeText=text => {
                  $data.remove('abilities', index, 1)
                  $data.insert('abilities', index, text)
                }
                placeholder='Write here...'
                numberOfLines=1
              )
            Button.del(
              icon=faTimesCircle
              variant='text'
              onPress=() => $data.remove('abilities', index)
            )
      if !data.abilities || data.abilities.length < 3
        Row.item(vAlign='center' align='between')
          Button.add(
            icon=faPlus
            variant='outlined'
            color='primary'
            onPress=addAbilityItem
          ) Add ability
      Br
      Span(bold) Types
      Row.items(vAlign='center')
        each item, index in data.types || []
          - const type = POKEMON_TYPES.find(t => t.value === item)
          Tag.tag(
            styleName=item
            icon=faTimes
            onPress=() => $data.remove('types', index)
            shape='rounded'
          )= type.label
      Br(half)
      if (data.types || []).length < 2
        Row(vAlign='center')
          Select.itemInput(
            options=pokemonTypes
            value=selectedType
            onChange=val => $selectedType.set(val)
          )
          Button.del(
            icon=faPlus
            variant='outlined'
            color='primary'
            onPress=addTypeItem
            disabled=!selectedType
          ) Add type
  `
})
