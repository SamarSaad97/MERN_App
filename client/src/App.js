import React, { Component } from "react";
import "./App.css";
// import Product from "./components/Proudct";
import {
  viewProudcts,
  TakeOffCart,
  addToCart,
  RemoveProudct,
  totalPrice,
} from "./services/proudctServices";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";

class App extends Component {
  state = {
    proudcts: [],
    cname: "",
  };
  constructor() {
    super();
    this.reqBody = { name: "" };
  }

  async componentDidMount() {
    this.totalPrice();
    try {
      const proudcts = await viewProudcts();

      var z = 0;
      for (z in proudcts) {
        this.setState({
          proudcts: [
            ...this.state.proudcts,
            {
              key: z + 1,
              description: proudcts[z]["description"],
              price: proudcts[z]["price"],
              name: proudcts[z]["name"],
              NumOfItemsInCart: proudcts[z]["NumOfItemsInCart"],
              image: proudcts[z]["image"],
            },
          ],
        });
        z = z + 1;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async TakeOffCart(x) {
    this.state.cname = x;
    this.reqBody.name = this.state.cname;
    try {
      await TakeOffCart(this.reqBody);
    } catch (error) {
      console.log(error.message);
    }
    window.location.reload();
  }
  async RemoveProudct(x) {
    this.state.cname = x;
    this.reqBody.name = this.state.cname;
    try {
      await RemoveProudct(this.reqBody);
    } catch (error) {
      console.log(error.message);
    }
    window.location.reload();
  }
  async addToCart(x) {
    this.state.cname = x;
    this.reqBody.name = this.state.cname;

    try {
      const result = await addToCart(this.reqBody);
    } catch (error) {
      console.log(error.message);
    }
    window.location.reload();
  }
  async totalPrice() {
    try {
      const result = await totalPrice();
      this.setState({ total: result });
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    const listItems = this.state.proudcts.map((d) => (
      <table key={d.key}>
        <tr>
          <td>
            <img src={d.image} alt="new"></img>
          </td>
          <td class="tds">
            {" "}
            <figcaption>
              <h4 className="title"> {d.name}</h4>
              <p className="desc">{d.description}</p>
            </figcaption>
          </td>
          <td className="tdd"></td>
          <td>
            {" "}
            <Button
              onClick={() => {
                this.addToCart(d.name);
              }}
            >
              +
            </Button>
          </td>
          <td>
            <h5>{d.NumOfItemsInCart}</h5>
          </td>
          <td>
            <Button
              onClick={() => {
                this.TakeOffCart(d.name);
              }}
            >
              -
            </Button>
          </td>

          <td class="tdprice">
            <div>${d.price}</div>
          </td>
          <td class="tdd">
            {" "}
            <Button
              variant="link"
              onClick={() => {
                this.RemoveProudct(d.name);
              }}
            >
              x
            </Button>
          </td>
        </tr>
      </table>
    ));

    return (
      <div class="Container">
        <h1>Shopping Cart</h1>

        <br />
        <div className="list">
          <figure className="card wrp">
            {listItems}{" "}
            <h3>
              Subtotal: <p class="price">${this.state.total}</p>{" "}
            </h3>
          </figure>
        </div>
      </div>
    );
  }
}

export default App;
