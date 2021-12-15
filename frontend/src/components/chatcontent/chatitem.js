import React, { Component } from "react";
import Avatar from "../chatlist/avatar";

export default class chatitem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
        </div>
        <div>
          <br></br>
          </div>
      </div>
    );
  }
}