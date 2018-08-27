// The magic of state persistance is closure here
export const sharedState = {
  todos: [],
  counter: 0,
  user:{}
}

export const resetTodos = () => sharedState.todos = []
export const addTodo = (s) => sharedState.todos.push(s)

/**
 * @exports.default {Mixin}
 */
export default {
  data: () => ({
    sharedState
  }),
  methods: {
    resetTodos,
    addTodo,
  }
}

/*
  You can access the shared state and methods
  not only within Vue component (as mixins) but also in common js files
  ※ e.g.
  import { sharedState, inc } from '<path to>/sharedState.mixin'

  console.info(sharedState.counter) // 0
  inc()
  console.info(sharedState.counter) // 1

 */