import { css, html, LitElement } from 'lit-element/lit-element.js';
import './todo.js';

class TodoList extends LitElement {

	static get properties() {
		return {
			prop1: { type: String },
			todos: { type: Array }
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super();

		this.prop1 = 'todo-list';
		this.todos = [
			{name: "lit element template"},
			{name: "create some todos"},
			{name: "maybe a button would be sweet"},
		]

		this.addEventListener('delete-todo', this.handleDeleteTodo)
	}

	addTodo() {
		const newTodo = this.shadowRoot.getElementById('new-todo').value;
		this.todos = [
			...this.todos,
			{name: newTodo}
		]
	}

	deleteTodo() {
		let deleteEvent = new CustomEvent('delete-todo', {
			detail: {
				message: 'delete button clicked',
				id: this.id
			},
			bubbles: true,
			composed: true
		})
		this.dispatchEvent(deleteEvent);
	}

	handleDeleteTodo(event) {
		const deleteId = event.detail.id
		this.todos.splice(deleteId, 1)
		this.requestUpdate();
	}

	render() {
		return html`
			<h2>Hello ${this.prop1}!</h2>
			<input type="text" id="new-todo" placeholder="pop off"/>
			<button type="button" @click="${this.addTodo}">Add Todo</button>
			<ul>
				${this.todos.map((todo, index) => {
					return html`
						<li>
							#${index+1}
							<d2l-labs-todo id="${index}" name="${todo.name}"></d2l-labs-todo>
							<button type="button" @click="${this.deleteTodo}">Delete</button>
						</li>
					`
				})}
			</ul>
		`;
	}
}
customElements.define('d2l-labs-todo-list', TodoList);
