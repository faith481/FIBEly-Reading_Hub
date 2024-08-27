import React, { useState } from "react";
import "./popular.css";
import data_product from "../assets/Assets/Frontend_Assets/data";
import Items from "../items/Items";

const Popular = () => {
  const [selectedPdf, setSelectedPdf] = useState(null); // State for selected PDF

  return (
    <div className="popular">
      <div className="popular-header">
        <h1>FREE BOOKS</h1>
        <hr />
      </div>
      <div className="popular-items">
        {data_product.map((item, i) => (
          <div className="popular-item" key={i}>
            <Items id={item.id} name={item.name} image={item.image} />
            <button
              onClick={() => setSelectedPdf(item.pdf)} // Set the selected PDF URL
            >
              View PDF
            </button>
          </div>
        ))}
      </div>

      {/* Conditionally render the PDF viewer */}
      {selectedPdf && (
        <div id="pdf-viewer" style={{ textAlign: "center", marginTop: "20px" }}>
          <iframe
            src={`https://docs.google.com/gview?url=${selectedPdf}&embedded=true`}
            width="80%"
            height="500"
            frameBorder="0"
            title="PDF Viewer"
            scrolling="auto"
            style={{ margin: "0 auto", display: "block" }}
          />
          <button onClick={() => setSelectedPdf(null)}>Close PDF</button>
        </div>
      )}
    </div>
  );
};

export default Popular;
