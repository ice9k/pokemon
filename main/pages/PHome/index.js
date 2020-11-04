import React from 'react'
import { observer, useValue, useBatchQuery, useBatch, emit } from 'startupjs'
import {  Div, Row, TextInput, Button, Pagination, Checkbox } from '@startupjs/ui'
import { ScrollView } from 'react-native'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { PokemonCard } from 'components'
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

export default observer(function PHome () {
  const [currentPage, $currentPage] = useValue(0)
  const [limit] = useValue(10)
  const [search = '', $search] = useValue()
  const [selectedTypes, $selectedTypes] = useValue([])
  const query = {}
  if (search) query.name = { $regex: search.trim(), $options: 'i' }
  if (selectedTypes.length) query.types = { $in: selectedTypes }
  const [pokemons] = useBatchQuery('pokemons', {
    ...query,
    $skip: limit * currentPage,
    $limit: limit
  })
  const [pokemonsCount] = useBatchQuery('pokemons', {
    ...query,
    $count: true
  })

  useBatch()

  const toggleType= type => {
    selectedTypes && selectedTypes.includes(type)
      ? $selectedTypes.remove(selectedTypes.indexOf(type))
      : $selectedTypes.push(type)
  }

  function onChangeSearch (text) {
    $search.set(text)
    $currentPage.set(0)
  }

  return pug`
    Div.root
      ScrollView
        Row.search(vAlign='stretch')
          TextInput.input(
            placeholder='Type pokemon name'
            value=search
            onChangeText=onChangeSearch
            layout='pure'
            icon=faSearch
          )
          Button.searchButton(
            color='additional0'
            variant='flat'
            size='l'
            onPress=() => emit('url', '/create')
          ) Create new
        Row
          each _type in POKEMON_TYPES
            - const isActiveType = selectedTypes && selectedTypes.includes(_type.value)
            Checkbox.checkbox(
              key=_type.value
              value=isActiveType
              label=_type.label
              onChange=() => toggleType(_type.value)
            )
        Row.list(wrap)
          each pokemon in pokemons
            Div.card
              PokemonCard(data=pokemon)
        Pagination(
          page=currentPage
          count=pokemonsCount
          limit=limit
          variant='compact'
          onChangePage=page => $currentPage.set(page)
        )
      
  `
})
