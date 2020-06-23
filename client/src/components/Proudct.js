import React, { Component } from "react";
import "./Proudct.css";
import "bootstrap/dist/css/bootstrap.css";
class Product extends Component {
  render() {
    return (
      <div className="col-md-3">
        <div className="img-wrap">
          <img
            className="img-responsive"
            src="https://i.pinimg.com/236x/02/90/84/029084a4cc1ac7ff6b67ceac8e1cd48d--vintage-tshirts-eternal-youth.jpg"
          />
        </div>
        <figcaption className="info-wrap">
          <h4 className="title">Product title</h4>
          <p className="desc">Product description</p>
        </figcaption>
        <div className="bottom-wrap">
          <a href="#" className="btn btn-sm btn-primary float-right">
            Add to cart
          </a>
          <div className="price-wrap h5">
            <span className="price-new">$1280</span>
          </div>
          <div>
            <button type="button" className="btn btn-link btn-xs">
              <span className="glyphicon glyphicon-trash"> </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
