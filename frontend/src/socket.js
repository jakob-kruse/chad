import io from "socket.io-client";
import {
  hasUsername,
  messages as messagesStore,
  notifications,
  username,
} from "./stores.js";

const socket = io("/");

socket.on("suggest username", (data) => {
  username.set(data.username);
});

socket.on("finished initialize", ({ messages }) => {
  hasUsername.set(true);
  messagesStore.set(messages);
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
