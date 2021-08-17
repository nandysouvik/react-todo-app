import { useEffect, useState } from 'react';
import Alert from './components/Alert';
import { List } from './components/List';

const getLocalStorage = () => {
  let list = localStorage.getItem("items");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("items")));
  } else {
    return [];
  }
};

function App() {
  const [todo, setTodo] = useState("");
  const [items, setItem] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      showAlert(true, "danger", "Please enter the value");
    } else if (todo && isEditing) {
      setItem(
        items.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: todo
            }
            return item;
          }
        })
      )
      setTodo("")
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Value Changed");
    } else {
      showAlert(true, "success", "Item Added");
      const newItem = { id: new Date().getTime().toString(), title: todo };
      setItem([...items, newItem]);
      setTodo("");
    }
  };

  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    setItem(items.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editItem = items.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTodo(editItem.title);
  };

  const clearItem = () => {
    showAlert(true, "danger", "List Emptied");
    setItem([]);
  };


  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="formList">
        {alert.show && <Alert {...alert} removeAlert={showAlert} item={items} />}
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          TODO LIST
        </h3>
        <div className="mb-3 form">
          <input
            type="text"
            className="form-control"
            placeholder="e.g Chicken Noodle Soup"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {items.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <List items={items} removeItem={removeItem} editItem={editItem} />
          <div className="text-center">
            <button className="btn btn-warning" onClick={clearItem}>Clear Items</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
