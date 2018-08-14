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
        icon: 'fa-leaf'
      }
    ]
  },
  {
    name: 'Interact',
    lableOnly: true,
    expanded: false,

    children: [
      {
        name: 'Seaexpressprice',
        icon: 'fa-window-maximize'
      },
			{
				name: 'Userinfo',
				icon: 'fa-window-maximize'
			}
    ]
  }
]
