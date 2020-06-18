<script>
  import { onDestroy } from "svelte";
  import InputField from "./InputField.svelte";
  import { username as usernameStore } from "../stores.js";
  import { initialize } from "../socket";
  let username = "";

  const unsubscribe = usernameStore.subscribe(value => {
    if (!username) {
      username = value;
    }
  });

  function accept() {
    if (username) {
      usernameStore.set(username);
      initialize(username);
    }
  }

  onDestroy(unsubscribe);
</script>

<div
  class="fixed z-10 w-screen h-screen flex flex-col justify-center bg-black
  bg-opacity-25 overflow-none">
  <p class="py-2 font-mono text-lg text-gray-800 text-center">
    Tell me your name, but I promise I really don't care. ~ Chad
  </p>
  <div class="w-3/4 md:w-1/2 mx-auto">
    <InputField bind:value={username} on:enter={accept} />
  </div>
</div>
