import React from 'react'
import { observer, emit } from 'startupjs'
import { Card, Span, Row, Tag } from '@startupjs/ui'
import { Image } from 'react-native'
import './index.styl'

export default observer(function PokemonCard ({ data }) {

  return pug`
    Card.root(onPress=() => emit('url', '/pokemons/' + data.id))
      Image.image(source={ uri: data.imageUrl} resizeMode='contain')
      Span(variant='h5')= data.name
      Row.items
        each _type in data.types || []
          Tag.tag(
            styleName=_type
            shape='rounded'
          )= _type
  `
})
