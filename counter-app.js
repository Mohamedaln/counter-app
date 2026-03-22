import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class CounterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 25;
    this.x = 0;
    this.temp1 = "";
  }

  static get properties() {
    return {
      ...super.properties,
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`

      .btn1 {
        width: 48px;
        height: 48px;
        font-size: 24px;
        border: none;
        border-radius: 8px;
        background-color: #1e407c;
        color: white;
        cursor: pointer;
      }

      .btn1:hover {
        background-color: #003366;
      }

      .btn1:focus {
        outline: 3px solid #e2801e;
      }

      .btn1:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      .num1 {
        font-size: 80px;
        font-weight: bold;
        color: #1e407c;
        margin: 0 0 16px 0;
      }

      .num1.c18 {
        color: #4a7c3f;
      }

      .num1.c21 {
        color: #e2801e;
      }

      .num1.cedge {
        color: #cc0000;
      }

      :host {
        display: block;
        padding: 16px;
      }

      .box1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
        background: white;
        border-radius: 12px;
        max-width: 300px;
        margin: auto;
      }

      confetti-container {
        display: block;
        width: 100%;
      }

      .row1 {
        display: flex;
        gap: 16px;
      }

    `];
  }

  // every time counter changes check if it got to 21
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  // this one adds 1 to the number
  addOne() {
    let n = this.counter;
    n = n + 1;
    // only add if we didnt reach the max yet
    if (n <= this.max) {
      this.counter = n;
    }
  }

  // this one takes 1 away from the number
  removeOne() {
    let n = this.counter;
    n = n - 1;
    // only remove if we didnt reach the min yet
    if (n >= this.min) {
      this.counter = n;
    }
  }

  // this makes the confetti go off
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // small wait so the page is ready before confetti starts
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  // this checks what color the number should be
  getClass1() {
    let cls = "num1";
    let c = this.counter;
    let mn = this.min;
    let mx = this.max;
    // red if we hit the lowest or highest number
    if (c === mn || c === mx) {
      cls = "num1 cedge";
    // orange if we hit 21
    } else if (c === 21) {
      cls = "num1 c21";
    // green if we hit 18
    } else if (c === 18) {
      cls = "num1 c18";
    }
    return cls;
  }

  render() {
    let btnDisableMinus = false;
    let btnDisablePlus = false;
    if (this.counter === this.min) {
      btnDisableMinus = true;
    }
    if (this.counter === this.max) {
      btnDisablePlus = true;
    }
    return html`
      <confetti-container id="confetti">
        <div class="box1">

          <div class="${this.getClass1()}">
            ${this.counter}
          </div>

          <div class="row1">
            <button
              class="btn1"
              @click="${this.removeOne}"
              ?disabled="${btnDisableMinus}"
            >-</button>

            <button
              class="btn1"
              @click="${this.addOne}"
              ?disabled="${btnDisablePlus}"
            >+</button>
          </div>

        </div>
      </confetti-container>
    `;
  }
}

customElements.define("counter-app", CounterApp);