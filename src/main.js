import progressBlock from "./progressBlock.js";

const root = document.querySelector(".progress-block");
const mainProgressBlock = new progressBlock(root);

mainProgressBlock.setValue(60);
mainProgressBlock.setAnimated(false);
mainProgressBlock.setHidden(false);
