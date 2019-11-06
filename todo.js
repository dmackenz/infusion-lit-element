import { css, html, LitElement } from 'lit-element/lit-element.js'

export class Todo extends LitElement {
    static get properties() {
        return {
            name: {type: String},
            id: {type: Number}
        }
    }

    render() {
        return html`
            <div>${this.name}</div>
        `
    }
}

customElements.define('d2l-labs-todo', Todo);