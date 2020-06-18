<script>
  import { tick } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  // Props
  export let value = ''
  export let type = 'text'
  export let placeholder = ''
  export let autocomplete = ''

  let editing = false
  let inputEl
  let label

  // Computed
  $: isText = type === 'text'
  $: isNumber = type === 'number'
  $: if (isNumber) {
    label = value === '' ? placeholder : value
  } else if (isText) {
    label = value ? value : placeholder
  }

  const toggle = async (_) => {
    editing = !editing

    if (editing) {
      await tick()
      inputEl.focus()
    }
  }

  const handleInput = (e) => {
    value = isNumber ? +e.target.value : e.target.value
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      dispatch('enter', { value })
    }
  }

  const handleBlur = (_) => {
    toggle()
  }
</script>

<input
  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300
  rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
  bind:this={inputEl}
  {type}
  {value}
  {placeholder}
  {autocomplete}
  on:input={handleInput}
  on:keyup={handleEnter}
  on:blur={handleBlur} />
