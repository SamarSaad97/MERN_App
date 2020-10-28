import { stringify } from "querystring";
import http from "./httpService";
import Axios from "axios";
export async function SubTotalPrice() {
  let url = "http://localhost:4001/proudct/SubTotalPrice";
  let options = {
    method: "POST",
    url: url,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}
export async function TshirtDis() {
  let url = "http://localhost:4001/proudct/TshirtDis";
  let options = {
    method: "POST",
    url: url,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}
export async function ShoesDis() {
  let url = "http://localhost:4001/proudct/ShoesDis";
  let options = {
    method: "POST",
    url: url,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}

export async function Taxes(reqBody) {
  let url = "http://localhost:4001/proudct/Taxes";
  let options = {
    method: "POST",
    url: url,
    data: reqBody,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}
export async function TakeOffCart(reqBody) {
  let url = "http://localhost:4001/proudct/TakeOffCart";
  let options = {
    method: "POST",
    url: url,
    data: reqBody,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}
export async function RemoveProudct(reqBody) {
  let url = "http://localhost:4001/proudct/RemoveProudct";
  let options = {
    method: "POST",
    url: url,
    data: reqBody,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}

export async function addToCart(reqBody) {
  let url = "http://localhost:4001/proudct/addToCart";
  let options = {
    method: "POST",
    url: url,
    data: reqBody,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}
export async function viewProudcts(reqBody) {
  let url = "http://localhost:4001/proudct/viewProudcts";
  let options = {
    method: "GET",
    url: url,
    data: reqBody,
  };

  let response = await Axios(options);

  if (response) {
    let info = await response.data;
    return info;
  }
}
