import React from 'react'
import { observer, useValue, useQuery, emit, $root, useLocal, useDoc } from 'startupjs'
import { TextInput, Div, Row, Button, Icon, Span, Card, Tag, Br } from '@startupjs/ui'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ScrollView, Image } from 'react-native'
import { PokemonForm } from 'components'
import './index.styl'

export default observer(function PInfo () {
  const [id] = useLocal('$render.params.id')

  const [pokemon = {}] = useDoc('pokemons', id)

  return pug`
    Div.root
      Div.main
        Row.back(vAlign='center' onPress=() => emit('url', '/'))
          Icon(icon=faArrowLeft)
          Span.backLabel(bold) Back
        Row.header
          Span(variant='h3')= pokemon.name
          Button(color='additional0' variant='flat' icon=faEdit onPress=() => emit('url', '/edit/' + id)) Edit
        Div.content
          Image.image(source={uri: pokemon.imageUrl })
          Div.lists
            if pokemon.types
              Span(variant='h6' bold) Types:
              Row.types
                each pokemonType in pokemon.types
                  Tag.tag(styleName=pokemonType)= pokemonType
            Br
            if pokemon.abilities
              Span(variant='h6' bold) Abilities:
              each ability in pokemon.abilities || []
                Span= ability

  `
})
