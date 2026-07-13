import React, { useState } from "react";
import Navbar from "./TempNavbar";

const UserDashboard = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "iPhone 14", price: 799 },
        { id: 2, name: "Nike Shoes", price: 120 },
    ]);

    const [form, setForm] = useState({ name: "", price: "" });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            const updated = products.map((p) =>
                p.id === editId ? { ...p, ...form } : p
            );
            setProducts(updated);
            setEditId(null);
        } else {
            const newProduct = { id: Date.now(), ...form };
            setProducts([...products, newProduct]);
        }

        setForm({ name: "", price: "" });
    };

    const handleDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditId(product.id);
    };

    return (
        <div>
            <Navbar />
            <div
                style={{
                    padding: "30px",
                    maxWidth: "800px",
                    margin: "auto",
                    fontFamily: "Arial",
                    background: "#9cbff3",
                    minHeight: "100vh",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    🛒 User Dashboard
                </h2>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: "#ffffff",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        marginBottom: "20px",
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        style={{
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            padding: "8px 15px",
                            border: "none",
                            borderRadius: "5px",
                            background: editId ? "#ffa500" : "#28a745",
                            color: "#ffffff",
                            cursor: "pointer",
                        }}
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </form>

                {/* PRODUCT LIST */}
                <div>
                    {products.map((p) => (
                        <div
                            key={p.id}
                            style={{
                                background: "#030000",
                                padding: "15px",
                                marginBottom: "12px",
                                borderRadius: "10px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <strong style={{ fontSize: "16px" }}>{p.name}</strong>
                                <p style={{ margin: "5px 0", color: "#555" }}>
                                    ${p.price}
                                </p>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleEdit(p)}
                                    style={{
                                        padding: "6px 12px",
                                        marginRight: "8px",
                                        border: "none",
                                        borderRadius: "5px",
                                        background: "#007bff",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(p.id)}
                                    style={{
                                        padding: "6px 12px",
                                        border: "none",
                                        borderRadius: "5px",
                                        background: "#dc3545",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;