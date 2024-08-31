import React, { Component } from "react";
import io from "socket.io-client";
import CardSection from "../components/CardSection";
import ChartSection from "../components/ChartSection";
import Header from "../components/Header";
import DetailSection from "../components/DetailSection";
import Cursor from "../components/Cursor";
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data: {},
    };
    this.socket = io("http://localhost:4000");
  }
  componentDidMount() {
    this.socket.emit("requestData", this.state.Id);
    this.socket.on("cryptoData", (data) => {
      this.setState({ Id: this.state.Id, Data: data });
    });
  }
  

  render() {
    return (
      <div>
        <div>
          <Cursor/>
          <Header />
          <DetailSection/>
          <CardSection
            coinName={this.state.Data.name}
            currentPrice={
              this.state.Data.market_data
                ? this.state.Data.market_data.current_price.usd
                : ""
            }
            mCap24={
              this.state.Data.market_data
                ? this.state.Data.market_data.market_cap_change_percentage_24h
                : ""
            }
            high24={
              this.state.Data.market_data
                ? this.state.Data.market_data.high_24h.usd
                : ""
            }
            low24={
              this.state.Data.market_data
                ? this.state.Data.market_data.low_24h.usd
                : ""
            }
          />
          <ChartSection
            Id={this.state.Id}
            priceChange24={
              this.state.Data.market_data
                ? this.state.Data.market_data.price_change_24h_in_currency.usd
                : ""
            }
            MarketCap={
              this.state.Data.market_data
                ? this.state.Data.market_data.market_cap.usd
                : ""
            }
            TotVol={
              this.state.Data.market_data
                ? this.state.Data.market_data.total_volume.usd
                : ""
            }
            Circulating={
              this.state.Data.market_data
                ? this.state.Data.market_data.circulating_supply
                : ""
            }
            twitterF={
              this.state.Data.community_data
                ? this.state.Data.community_data.twitter_followers
                : ""
            }
          />
        </div>
      </div>
    );
  }
}
