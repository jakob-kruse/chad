import io from "socket.io-client";
import {
  isInitialized,
  messages as messagesStore,
  notifications,
  username as usernameStore,
} from "./stores.js";

const socket = io("/");

socket.on("pre initialize", ({ username, messages }) => {
  usernameStore.set(username);
  messagesStore.set(messages);
});

socket.on("finished initialize", () => {
  isInitialized.set(true);
});

socket.on("notification", (notification) => {
  notifications.update((notifs) => {
    if (!notifs) {
      return [notification];
    }

    return [...notifs, notification];
  });
});

socket.on("new message", ({ message }) => {
  messagesStore.update((msgs) => {
    if (!msgs) {
      return [message];
    }

    return [...msgs, message];
  });
});

socket.on("forget user", ({ username }) => {
  messagesStore.update((msgs) =>
    msgs.map((m) => {
      if (m.author.username !== username) return m;
      return {
        author: {
          username: "mh i dont know",
          color: "#000",
        },
        content: "???",
      };
    })
  );
});

export function sendMessage(content) {
  socket.emit("send message", {
    content: content.trim(),
  });
}

export function initialize(username) {
  socket.emit("initialize", {
    username: username,
  });
}
