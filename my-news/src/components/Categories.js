import React, { useEffect, useState } from "react";
import "../styles/categories.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  const tokenValue = JSON.parse(sessionStorage.getItem("loginToken")); // token
  const [categories, setCategories] = useState([]);

  //Load categories
  useEffect(() => {
    const url = "http://localhost:4000/api/categories/";
    const tokenValue = JSON.parse(sessionStorage.getItem("loginToken"));
    axios
      .get(url, { headers: { Authorization: `Bearer ${tokenValue}` } })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        if (error.response.status >= 400) setCategories([]);
      });
  }, []);

   const handleEdit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("idCategory", JSON.stringify(e.target.dataset.id));
    navigate("/categories-edit");
  }
  const handleDelete = (e) => {
    e.preventDefault();
    const idCategory = e.target.dataset.id;
    if(idCategory){
      const url = `http://localhost:4000/api/categories/${idCategory}`;
      const config = {
        headers: { Authorization: `Bearer ${tokenValue}` },
      };
      //---
      axios.delete(url, config)
      .then((res) => {
        console.log(res.status);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
          if (err.response.status === 401) {
            navigate("/login");
          } else {
            console.log(err.response.data.message);
          }
        } else if (err.request) {
          console.log("Network error:", err.request);
        } else {
          console.log("Unexpected error:", err.message);
        }
      });
    }
  }

  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/categories-add");
  }

  return (
    <div className="container">
      <Header key={Math.random()*1000}/>
      <h2>Categories</h2>
      <div className="centrada">
        <table className="t_categories">
          <thead>
            <tr>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories.map((dato) => (
                <tr key={Math.random() * 1000}>
                  <td>{dato.name}</td>
                  <td>
                    <button className="buttonCategory" name="Edit" data-id={dato._id} onClick={handleEdit}>
                      Edit
                    </button><br/>
                    <button className="buttonCategory" data-id={dato._id} onClick={handleDelete}>
                      Delete
                    </button>
                  </td>
                </tr>
            
              ))
            ) : (
              <tr>Add a category</tr>
            )}
          </tbody>
        </table>
      </div>
      <button id="b_category" name="Add" onClick={handleAdd}>
        Add new
      </button>
      <Footer />
    </div>
  );
};

export default Categories;
