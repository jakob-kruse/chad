<script>
  import { sendMessage as socketSendMessage } from "../socket.js";
  import InputField from "./InputField.svelte";

  let inputValue = "";

  function sendMessage() {
    inputValue = inputValue.trim();
    if (inputValue) {
      socketSendMessage(inputValue);
      inputValue = "";
    }
  }
</script>

<div
  class="fixed flex w-full p-2 bottom-0 border-solid border-t-2 border-gray-300
  bg-white z-50">
  <InputField
    placeholder="Type a message..."
    bind:value={inputValue}
    on:enter={sendMessage} />
  <button
    class="text-blue-500 border-solid border-2 border-blue-500 hover:text-white
    hover:bg-blue-500 font-bold py-1 px-2 ml-2 rounded"
    on:click={sendMessage}>
    Send
  </button>
</div>
