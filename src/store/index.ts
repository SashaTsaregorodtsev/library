import { types } from "mobx-state-tree";
import Library from "./library";
const RootStore = types.model("RootStore", {
  main: types.optional(Library, {}),
});

export default RootStore;
