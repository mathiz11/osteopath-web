export type MessageType = {
  type: "error" | "warning" | "success" | null;
  text: string | null;
};
