type Messages = typeof import("../messages/en.json");
type NamespaceKeys = keyof Messages;

declare interface IntlMessages extends Messages {}
