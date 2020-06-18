<script>
  import { notifications as notificationStore } from "../stores.js";
  import { onDestroy } from "svelte";

  let notificationsList = [];

  const unsubscribe = notificationStore.subscribe(notifications => {
    if (notifications) {
      notificationsList = notifications;
    }
  });

  function removeNotification(id) {
    notificationStore.update(notifs => notifs.filter(n => n.id !== id));
  }

  function closeButtonColor(type) {
    switch (type) {
      case "warning":
        return "#c05621";
      case "error":
        return "#c53030";
      case "success":
        return "#2f855a";
    }
  }

  function getClasses(type) {
    const common =
      "border-l-4 px-4 py-3 m-4 pr-6 flex items-center justify-between";

    switch (type) {
      case "warning":
        return `bg-orange-100 border-orange-500 text-orange-700 ${common}`;
      case "error":
        return `bg-red-100 border-red-500 text-red-700 ${common}`;
      case "success":
        return `bg-green-100 border-green-500 text-green-700 ${common}`;
    }
  }

  onDestroy(unsubscribe);
</script>

<div class="absolute w-full z-50">
  <ul>
    {#each notificationsList as notif}
      <div class={getClasses(notif.type)} role="alert">
        <div>
          <p class="font-bold">{notif.title}</p>
          <p>{notif.message}</p>
        </div>
        <svg
          class="cursor-pointer"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          on:click={() => {
            removeNotification(notif.id);
          }}>
          <path
            d="M2 2L9.5 9.5M17 17L9.5 9.5M9.5 9.5L17 2L2 17"
            stroke={closeButtonColor(notif.type)}
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

      </div>
    {/each}
  </ul>
</div>
