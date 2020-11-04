export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome
  },
  {
    path: '/create',
    exact: true,
    component: components.PCreate
  },
  {
    path: '/edit/:id',
    exact: true,
    component: components.PEdit
  },
  {
    path: '/pokemons/:id',
    exact: true,
    component: components.PInfo
  },
]
