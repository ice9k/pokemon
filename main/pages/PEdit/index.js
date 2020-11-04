import React from 'react'
import { observer, useValue, useQuery, emit, $root, useLocal, useDoc } from 'startupjs'
import { TextInput, Div, Row, Button, Icon, Span, Card } from '@startupjs/ui'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native'
import { PokemonForm } from 'components'
import './index.styl'

export default observer(function PEdit () {
  const [id] = useLocal('$render.params.id')
  const [pokemon = {}, $pokemon] = useDoc('pokemons', id)

  return pug`
    Div.root
      Row.back(vAlign='center' onPress=() => emit('url', '/'))
        Icon(icon=faArrowLeft)
        Span.backLabel(bold) Back
      Card.card
        Span(variant='h5' bold) Edit pokemon
        PokemonForm(data=pokemon $data=$pokemon)
  `
})
