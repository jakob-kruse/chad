<script>
  import { messages as messagesStore } from "../stores";

  let innerWidth,
    scrollY,
    messageHeight,
    innerHeight = 0;

  let bottomElement = null;

  let messages = [];

  messagesStore.subscribe(_messages => {
    if (_messages) {
      messages = _messages;
    }
    if (isAtBottom()) {
      console.log("scrollIntoView");
      bottomElement.scrollIntoView();
    }
  });

  function isAtBottom() {
    if (bottomElement === null) return false;
    const bounding = bottomElement.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= innerHeight &&
      bounding.right <= innerWidth
    );
  }

  function getMessageStyle(color) {
    return `border-bottom: solid 4px ${color};`;
  }
</script>

<svelte:window bind:innerHeight bind:innerWidth bind:scrollY />

<div class="overflow-auto max-h-full" bind:clientHeight={messageHeight}>
  {#each messages as message}
    <div
      class="bg-gray-100 border-b-4 rounded-b px-4 py-3 m-3 shadow-md"
      style={getMessageStyle(message.author.color)}
      role="alert">
      <div class="flex">
        <div>
          <p class="font-bold">{message.author.username}</p>
          <p class="text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  {/each}
  <div class="h-16" bind:this={bottomElement} />
</div>
