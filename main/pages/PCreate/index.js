import React from 'react'
import { observer, useValue, useQuery, emit, $root, useLocal } from 'startupjs'
import { TextInput, Div, Row, Button, Icon, Span, Card } from '@startupjs/ui'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native'
import { PokemonForm } from 'components'
import './index.styl'

export default observer(function PCreate () {
  const [data, $data] = useValue({})

  async function createPokemon () {
    await $root.add('pokemons', {
      ...data,
      createdAt: Date.now(),
      id: $root.id()
    })
    emit('url', '/')
  }

  return pug`
    Div.root
      Row.back(vAlign='center' onPress=() => emit('url', '/'))
        Icon(icon=faArrowLeft)
        Span.backLabel(bold) Back
      Card.card
        Span(variant='h5' bold) Create new pokemon
        PokemonForm(data=data $data=$data)
        Button.create(
          variant='flat'
          color='additional0'
          onPress=createPokemon
        ) Create
  `
})
