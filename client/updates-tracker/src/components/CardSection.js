import React, { Component } from "react";
import "../styles/CardSection.css";
import "./CountNumber";
import CountNumber from "./CountNumber";

export class CardSection extends Component {
  render() {
    return (
      <div className="container">
        <div
          className="fs-1 fw-bold m-3 text-capitalize"
          style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
        >
          {this.props.coinName}
        </div>
        <section className="row justify-content-center mb-3">
          <div className="col-12 col-md-4">
            <div className="card text-white text-center m-3 glowing-card">
              <div className="card-body">
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  Market Cap 24Hrs
                </h6>
                <p
                  className="card-text fw-bold fs-5"
                  style={{ color: "#fcdf03" }}
                >
                  {<CountNumber endValue={this.props.mCap24} duration={4000} />} %
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card text-white text-center m-3 glowing-card">
              <div className="card-body">
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  High 24Hrs
                </h6>
                <p
                  className="card-text fw-bold fs-5"
                  style={{ color: "rgb(51, 255, 0)" }}
                >
                  ${this.props.high24}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card text-white text-center m-3 glowing-card">
              <div className="card-body">
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  Low 24Hrs
                </h6>
                <p
                  className="card-text fw-bold fs-5"
                  style={{ color: "rgb(255, 32, 32)" }}
                >
                  ${this.props.low24}
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center">
          <div
            className="text-white"
            style={{ fontFamily: "NHaasGroteskDSPro-65Md", marginTop: "1%"}}
          >
            Current Price
          </div>
          <div className="price"
            style={{
              fontFamily: "NHaasGroteskDSPro-65Md",
              fontSize: "90px",
              fontWeight: "700",
              color: "#fcdf03",
              textAlign: "center",
              marginBottom: "10%",
            }}
          >
            ${<CountNumber endValue={this.props.currentPrice} duration={4000} />}
          </div>
        </div>
      </div>
    );
  }
}

export default CardSection;
