import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import CartContext from "./CartContext";
import { FaEdit, FaPlus, FaShoppingBag, FaTrash, FaUserCircle } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const UserDashboard = () => {
    const { user, cart } = useContext(CartContext);
    const [products, setProducts] = useState([
        { id: 1, name: "Chocolate Truffle Cake", price: 799 },
        { id: 2, name: "Strawberry Cupcakes", price: 120 },
    ]);

    const [form, setForm] = useState({ name: "", price: "", image: "" });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files?.[0]?.name || value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            const updated = products.map((product) =>
                product.id === editId ? { ...product, ...form } : product
            );
            setProducts(updated);
            setEditId(null);
        } else {
            const newProduct = { id: Date.now(), ...form };
            setProducts([...products, newProduct]);
        }

        setForm({ name: "", price: "", image: "" });
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            price: product.price,
            image: product.image || "",
        });
        setEditId(product.id);
    };

    return (
        <div>
            <Navbar />
            <main className="dashboard-page">
                <section className="dashboard-hero">
                    <div>
                        <span className="dashboard-eyebrow">Account</span>
                        <h1>Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}</h1>
                        <p>Manage your custom product list and keep your cart activity in one clean place.</p>
                    </div>

                    <div className="dashboard-profile">
                        <FaUserCircle size={44} />
                        <div>
                            <strong>{user?.name || "Guest User"}</strong>
                            <span>{user?.email || "No email available"}</span>
                        </div>
                    </div>
                </section>

                <section className="dashboard-stats">
                    <div>
                        <span>{products.length}</span>
                        <p>Dashboard Items</p>
                    </div>
                    <div>
                        <span>{cart.length}</span>
                        <p>Cart Items</p>
                    </div>
                    <div>
                        <span>{editId ? "Edit" : "Add"}</span>
                        <p>Current Mode</p>
                    </div>
                </section>

                <section className="dashboard-panel">
                    <div className="dashboard-panel-header">
                        <div>
                            <h2>{editId ? "Update Product" : "Add Product"}</h2>
                            <p>Create a quick product entry for your dashboard.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="dashboard-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            required={!editId}
                        />

                        <button type="submit">
                            {editId ? <FaEdit /> : <FaPlus />}
                            {editId ? "Update" : "Add"}
                        </button>
                    </form>
                </section>

                <section className="dashboard-list">
                    {products.map((product) => (
                        <article key={product.id} className="dashboard-item">
                            <div className="dashboard-item-icon">
                                <FaShoppingBag />
                            </div>

                            <div className="dashboard-item-info">
                                <strong>{product.name}</strong>
                                <p><FaIndianRupeeSign size={14} />{product.price}</p>
                                {product.image && <span>{product.image}</span>}
                            </div>

                            <div className="dashboard-actions">
                                <button type="button" className="dashboard-edit" onClick={() => handleEdit(product)}>
                                    <FaEdit /> Edit
                                </button>

                                <button type="button" className="dashboard-delete" onClick={() => handleDelete(product.id)}>
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
