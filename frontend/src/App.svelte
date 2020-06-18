<script>
  import MessageInputBar from "./components/MessageInputBar.svelte";
  import UserPopup from "./components/UserPopup.svelte";
  import Notifications from "./components/Notifications.svelte";
  import Messages from "./components/Messages.svelte";
  import { isInitialized } from "./stores.js";
  import { onDestroy } from "svelte";
  import Tailwindcss from "./components/Tailwindcss.svelte";

  let showUsernamePopup = true;

  const unsubscribe = isInitialized.subscribe(value => {
    showUsernamePopup = !value;
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>CHAD - Chad Has brAin Damage</title>
</svelte:head>

<div>
  <Tailwindcss />
  <Notifications />
  {#if showUsernamePopup}
    <UserPopup />
  {/if}
  <MessageInputBar />
  <Messages />
</div>
