export default [
  {
    name: 'Seaexpressprice'
  },
  {
    name: 'Basic',
    lableOnly: true,
    expanded: false,

    children: [
			{
				name: 'Carrier',
				icon: 'fa-leaf'
			},
      {
        name: 'Port',
        icon: 'fa-laptop'
      },
      {
        name: 'Country',
        icon: 'fa-envira'
      }
    ]
  },
  {
    name: 'Interact',
    lableOnly: true,
    expanded: false,

    children: [
			{
				name: 'Userinfo',
				icon: 'fa-window-maximize'
			},
      {
        name: 'UserEdit',
        icon: 'fa-gear'
      }
    ]
  }
]
