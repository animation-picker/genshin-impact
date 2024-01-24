import { c as memberList } from "./app-stores.js";
let memberDB = [];
memberList.subscribe((v) => {
  memberDB = v;
});
export {
  memberDB as m
};
