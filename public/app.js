document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itemForm');
    const itemsList = document.getElementById('itemsList');
  
    async function fetchItems() {
      const res = await fetch('/items');
      const items = await res.json();
      itemsList.innerHTML = '';
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteItem(item.name));
        li.appendChild(deleteBtn);
        itemsList.appendChild(li);
      });
    }
  
    async function addItem(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const res = await fetch('/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });
      const data = await res.json();
      if (data.added) {
        fetchItems();
        form.reset();
      }
    }
  
    async function deleteItem(name) {
      const res = await fetch(`/items/${name}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.message === 'Deleted') {
        fetchItems();
      }
    }
  
    form.addEventListener('submit', addItem);
    fetchItems();
  });
  