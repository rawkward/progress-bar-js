export default class ProgressBlock {
  constructor(root) {
    this.root = root;

    this.input = root.querySelector(".progress-input");
    this.animatedToggle = root.querySelector(".animate-toggle");
    this.hideToggle = root.querySelector(".hide-toggle");
    this.progressCircle = root.querySelector(".progress-value");
    this.svg = root.querySelector(".progress-ring");

    this.radius = parseFloat(this.progressCircle.getAttribute("r"));
    this.circumference = 2 * Math.PI * this.radius;

    this.progressCircle.style.strokeDasharray = this.circumference;

    this.isAnimated = false;
    this.animationId = null;

    this.input.addEventListener("input", this.onInput.bind(this));
    this.animatedToggle.addEventListener(
      "change",
      this.onAnimateToggle.bind(this),
    );
    this.hideToggle.addEventListener("change", this.onHideToggle.bind(this));
  }
}
