var items = [];

var container = createContainer();
var inputBox = createContainer();

var searchInput = createInput({
  className: "search",
  placeholder: "Type To Search...",
  onkeyup: () => {
    searchItem({
      value: searchInput.value.trim().toLowerCase(),
      label: searchInput.value.trim(),
    });
  },
});

var itemInput = createInput({
  className: "add-item",
  placeholder: "Add Item...",
});

var button = createButton({
  text: "ADD",
  className: "btn",
  action: () => {
    addItem({
      value: itemInput.value.toLowerCase().trim(),
      label: itemInput.value.trim(),
    });
  },
});

var messageBox = document.createElement("div");
messageBox.className = "message";

inputBox.append(searchInput, itemInput, button);
container.append(inputBox);
document.body.append(container);

var list = document.createElement("div");
list.className = "items-list";
list.id = "list";

var listBox = createContainer();
listBox.append(list);
document.body.append(messageBox, listBox);
linkStyle();
function createButton(props) {
  const { text, action, className } = props;
  var button = document.createElement("button");
  button.className = className;
  button.innerText = text;
  button.onclick = action;
  return button;
}

function createInput(props) {
  const { className, placeholder, type = "text", onkeyup = () => {} } = props;
  var searchInput = document.createElement("input");
  searchInput.type = type;
  searchInput.setAttribute("class", className);
  searchInput.placeholder = placeholder;
  searchInput.onkeyup = onkeyup;
  return searchInput;
}

function createContainer() {
  var container = document.createElement("div");
  container.setAttribute("class", "container");
  return container;
}

function linkStyle() {
  var style = '<link rel="stylesheet" href="style.css" />';

  document.head.innerHTML += style;
}

function renderList(list) {
  var listBox = document.getElementById("list");
  var children = [...listBox.childNodes];
  children.forEach((c) => c.remove());

  list.forEach((i) => {
    var item = document.createElement("div");
    item.setAttribute("data-id", i.value);
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "del-btn";
    deleteBtn.innerText = "x";
    deleteBtn.onclick = () => {
      console.log(item.dataset.id);
      items.splice(items.indexOf(item.dataset.id), 1);
      console.log(items);
      deleteBtn.parentElement.remove();
    };
    item.innerText = i.label;
    item.append(deleteBtn);
    item.className = "item";

    listBox.append(item);
  });
}

function addItem(item) {
  var exist = items.find((x) => x.value == item.value);
  if (exist || item.value == "") {
    itemInput.value = null;
    searchInput.value = null;
    if (exist) {
      messageBox.innerText = `Item with name of ${item.value} already exist!`;
    }
    if (item.value == "") {
      messageBox.innerText = "Item can not be empty";
    }
    return;
  }

  items.push(item);
  itemInput.value = null;
  searchInput.value = null;
  messageBox.innerText = "";
  renderList(items);
}

function searchItem(item) {
  var results = items.filter((i) => i.value.startsWith(item.value));

  renderList(results);
}
