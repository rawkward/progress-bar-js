export default class ProgressBlock {
  constructor(root) {
    this.input = root.querySelector(".progress-input");
    this.animatedToggle = root.querySelector(".animate-toggle");
    this.hideToggle = root.querySelector(".hide-toggle");
    this.circle = root.querySelector(".progress-circle");
    this.progressCircle = root.querySelector(".progress-value");
    this.svg = root.querySelector(".progress-circle");

    this.radius = parseFloat(this.progressCircle.getAttribute("r"));
    this.circumference = 2 * Math.PI * this.radius;

    this.progressCircle.style.strokeDasharray = this.circumference;
    this.setValue(Number(this.input.value));

    this.isAnimated = false;
    this.animationId = null;

    this.input.addEventListener("input", this.onInput.bind(this));
    this.animatedToggle.addEventListener(
      "change",
      this.onAnimateToggle.bind(this),
    );
    this.hideToggle.addEventListener("change", this.onHideToggle.bind(this));
  }

  setValue(value) {
    value = Math.max(0, Math.min(100, Number(value)));
    this.input.value = value;
    if (!this.isAnimated) {
      this.progressCircle.style.strokeDashoffset = String(
        this.circumference * (1 - value / 100),
      );
    }
  }

  setAnimated(isAnimated) {
    this.isAnimated = isAnimated;
    this.animatedToggle.checked = isAnimated;
    if (isAnimated) {
      this.startAnimation();
    } else {
      this.stopAnimation();
      this.setValue(this.input.value);
    }
  }

  setHidden(isHidden) {
    this.hideToggle.checked = isHidden;
    this.circle.style.visibility = isHidden ? "hidden" : "";
  }

  onInput(e) {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val === "") return;
    val = Math.max(0, Math.min(100, Number(val)));
    this.setValue(val);
  }

  onAnimateToggle(e) {
    this.setAnimated(e.target.checked);
  }

  onHideToggle(e) {
    this.setHidden(e.target.checked);
  }

  startAnimation() {
    this.stopAnimation();
    let angle = 0;

    const animate = () => {
      angle = (angle + 2) % 360;

      let targetValue = Number(this.input.value);

      if (this._animatedValue === undefined) this._animatedValue = targetValue;

      this._animatedValue += (targetValue - this._animatedValue) * 0.15;

      const offset = this.circumference * (1 - this._animatedValue / 100);
      this.progressCircle.style.strokeDashoffset = String(offset);
      this.svg.style.transform = `rotate(${angle - 90}deg)`;

      this.animationId = requestAnimationFrame(animate);
    };

    this._animatedValue = Number(this.input.value);

    animate();
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationId);
    this.svg.style.transform = `rotate(-90deg)`;
    const value = Number(this.input.value);
    const offset = this.circumference * (1 - value / 100);
    this.progressCircle.style.strokeDashoffset = String(offset);
    this._animatedValue = undefined;
  }
}
