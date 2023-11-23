import { useEffect, useState } from "react";
import "./table.css";
import { useAppStore } from "../../store"
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const EditModal = () => {
    const { isOpen, setOpen, title, price, setTitle, setPrice, id } = useAppStore();
    const [loading, setLoading] = useState(false);
  
    const handleSave = () => {
      setLoading(true);
      fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT" ,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price,
          
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setOpen(false)
          alert(`${id} is updated`);
        });
    };
  
    return (
        <div className="Modal-content">
      <Modal  open={isOpen} onClose={() => setOpen(false)} >
        <h2>Edit Product</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        <button onClick={() => handleSave()}>{loading ? "Lodaing...": "Save"}</button>
      </Modal>
      </div>
    );
  };

function Table() {
    const [product, setProduct] = useState([]);
    const { setOpen, setTitle, setPrice, setID } = useAppStore();
  
    const loadProducts = async () => {
  
      try {
        let resp = await fetch("https://dummyjson.com/products");
        let data = await resp.json();
        setProduct(data.products);
      } catch (error) {
        console.log(error);
      }
    };
  
    const deleteProduct = async (productID) => {
    
  
      try {
        let resp = await fetch(`https://dummyjson.com/products/${productID}`, {
          method: "DELETE",
        });
        let data = await resp.json();
        if (data.isDeleted === true) {
          alert(`${productID} is Deleted`);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      loadProducts();
    }, []);
  
    return (
      <div >
        <h4>products</h4>
     
        <table>
          <thead style={{ background: "#2ecc71" }}>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((el, i) => (
              <tr key={i}>
                <td>{el.id}</td>
                <td>{el.title}</td>
                <td>{el.price}</td>
                <td>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setID(el.id);
                      setTitle(el.title);
                      setPrice(el.price);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(el.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditModal />
      </div>
    );
  }
  export default Table;