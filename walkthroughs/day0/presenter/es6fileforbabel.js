import BaseCtrl from 'BaseCtrl';

export default class TodoCtrl extends BaseCtrl{

	constructor(model, view){
    super(model, view);
		this.model = model;
		this.view = view;
	}

	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 */
	addItem (title) {
		if (title.trim() === '') {
			return;
		}

		this.model.create(title).next();
		this.view.render('clearNewTodo');
	}

	/*
	 * Triggers the item editing mode.
	 */
	editItem (id) {
		var data = this.model.read(id).next();
		this.view.render('editItem', {id, title: data.value[0].title});
	}

	/*
	 * Finishes the item editing mode successfully.
	 */
	editItemSave (id, title) {
		if (title.trim()) {
			this.model.update(id, {title}).next();
			this.view.render('editItemDone', {id, title});
		} else {
			this.removeItem(id);
		}
	}

}
