import React, { Component } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import "../styles/ChartSection.css";
export class ChartSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Price: {
        options: {
          chart: {
            id: "area-datetime",
          },
          grid: {
            show: false,
          },
          title: {
            text: "Market Price (USD)",
            align: window.innerWidth <= 768 ? 'center' : 'left',
            style: {
              fontSize: window.innerWidth <= 768 ? '12px' : '22px',
              fontWeight: "bold",
              color: "#fcdf03",
            },
            margin: window.innerWidth <= 768 ? 0 : 10,

          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            show: false,
          },
          colors: ["#fcdf03"],
          tooltip: {
            y: {
              formatter: (value) => {
                return value.toFixed(2);
              },
            },
            theme: "dark",
          },
          selection: 365,
        },
        series: [
          {
            name: "Market Price",
            data: [[1645837250522, 39804.53519937617]],
          },
        ],
      },
      Market_Cap: {
        options: {
          grid: {
            show: false,
          },
          title: {
            text: window.innerWidth <= 768 ? " ": "Market Cap (USD)",
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              color: "#ff69f5",
            },
            marginBottom: window.innerWidth <= 768 ? 0 : 50,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            show: false,
          },
          colors: ["#ff69f5"],
          tooltip: {
            y: {
              formatter: (value) => {
                return value.toFixed(2);
              },
            },
            theme: "dark",
          },
        },
        series: [
          {
            name: "Market Cap (USD)",
            data: [[1645837250522, 39804.53519937617]],
          },
        ],
      },
      Tot_Vol: {
        options: {
          grid: {
            show: false,
          },
          title: {
            text: window.innerWidth <= 768 ? " ": "Market Volume",
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              color: "#00ffea",
            },
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            show: false,
          },
          colors: ["#00ffea"],
          tooltip: {
            y: {
              formatter: (value) => {
                return value.toFixed(2);
              },
            },
            theme: "dark",
          },
        },
        series: [
          {
            name: "Market Volume",
            data: [[1645837250522, 39804.53519937617]],
          },
        ],
      },
    };
    this.prevSelection = this.state.Price.options.selection;
  }
  prevId = this.props.Id;

  fetchData = async () => {
    try {
      let chartData = await fetch(
        "https://api.coingecko.com/api/v3/coins/" +
          this.props.Id +
          "/market_chart?vs_currency=usd&days=" +
          this.state.Price.options.selection
      );

      // Check if the response is not ok (e.g., status code 429 for rate limit exceeded)
      if (!chartData.ok) {
        throw new Error("API Request limit exceeded or server error");
      }

      let jsonChartData = await chartData.json();

      this.setState({
        Price: {
          options: this.state.Price.options,
          series: [{ name: "Market Price", data: jsonChartData.prices }],
        },
      });
      this.setState({
        Market_Cap: {
          options: this.state.Market_Cap.options,
          series: [{ name: "Market Price", data: jsonChartData.market_caps }],
        },
      });
      this.setState({
        Tot_Vol: {
          options: this.state.Tot_Vol.options,
          series: [{ name: "Market Price", data: jsonChartData.total_volumes }],
        },
      });
    } catch (error) {
      // Display an error message to the user
      console.error("Error fetching data:", error);
      alert(
        "API Request limit exceeded or failed to fetch data. Please try again later."
      );
    }
  };

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidUpdate() {
    if (this.prevId !== this.props.Id) {
      this.prevId = this.props.Id;
      this.fetchData();
    }
    if (this.prevSelection !== this.state.Price.options.selection) {
      this.prevSelection = this.state.Price.options.selection;
      this.fetchData();
    }
  }

  render() {
    return (
      <motion.div
        animate={{
          x: -50,
          y: 10,
          scale: 1.4,
          rotate: 0,
        }}
        transition={{ duration: 3 }}
      >
        <div className="container">
          <div className="row">
            <div className="col" style={{ maxWidth: "600px" }}>
              <div id="chart" className="charts">
                <div className="toolbar" style={{ marginBottom: "10px", alignItems:"left" }}>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      id="one_month"
                      onClick={() =>
                        this.setState({
                          Price: {
                            options: { ...this.tooltip, selection: 1 },
                            series: this.state.Price.series,
                          },
                        })
                      }
                    >
                      1D
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      id="six_months"
                      onClick={() =>
                        this.setState({
                          Price: {
                            options: { ...this.tooltip, selection: 7 },
                            series: this.state.Price.series,
                          },
                        })
                      }
                    >
                      1W
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      id="one_year"
                      onClick={() =>
                        this.setState({
                          Price: {
                            options: { ...this.tooltip, selection: 30 },
                            series: this.state.Price.series,
                          },
                        })
                      }
                    >
                      1M
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      id="ytd"
                      onClick={() =>
                        this.setState({
                          Price: {
                            options: { ...this.tooltip, selection: 182 },
                            series: this.state.Price.series,
                          },
                        })
                      }
                    >
                      6M
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      id="all"
                      onClick={() =>
                        this.setState({
                          Price: {
                            options: { ...this.tooltip, selection: 365 },
                            series: this.state.Price.series,
                          },
                        })
                      }
                    >
                      1Y
                    </button>
                  </div>
                </div>
                <Chart className="graph-big"
                  options={this.state.Price.options}
                  series={this.state.Price.series}
                  type="area"
                  height="400"
                  width="600"
                />
              </div>
            </div>
            <div
              className="col"
              style={{ maxWidth: "400px", marginLeft: "100px" }}
            >
              <div className="card-body" style={{marginBottom:"20px"}}>
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  {" "}
                  Market Cap{" "}
                </h6>
                <p
                  className="card-text fw-bold "
                  style={{
                    fontFamily: "NHaasGroteskDSPro-65Md",
                    color: "rgb(255, 255, 255)",
                    fontSize: "small",
                  }}
                >
                  $ {this.props.MarketCap}
                </p>
              </div>

              <div className="card-body "  style={{marginBottom:"20px"}}>
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  {" "}
                  Price Change 24hrs{" "}
                </h6>
                <p
                  className="card-text fw-bold "
                  style={{
                    fontFamily: "NHaasGroteskDSPro-65Md",
                    color: "rgb(255, 255, 255)",
                    fontSize: "small",
                  }}
                >
                  $ {this.props.priceChange24}
                </p>
              </div>
              <div className="card-body"  style={{marginBottom:"20px"}}>
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  {" "}
                  Total Volume{" "}
                </h6>
                <p
                  className="card-text fw-bold "
                  style={{
                    fontFamily: "NHaasGroteskDSPro-65Md",
                    color: "rgb(255, 255, 255)",
                    fontSize: "small",
                  }}
                >
                  $ {this.props.TotVol}
                </p>
              </div>
              <div className="card-body "  style={{marginBottom:"20px"}}>
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  {" "}
                  Circulating Supply
                </h6>
                <p
                  className="card-text fw-bold "
                  style={{
                    fontFamily: "NHaasGroteskDSPro-65Md",
                    color: "rgb(255, 255, 255)",
                    fontSize: "small",
                  }}
                >
                  {this.props.Circulating}
                </p>
              </div>
              <div className="card-body ">
                <h6
                  className="card-title"
                  style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
                >
                  {" "}
                  Twitter Followers
                </h6>
                <p
                  className="card-text fw-bold "
                  style={{
                    fontFamily: "NHaasGroteskDSPro-65Md",
                    color: "rgb(255, 255, 255)",
                    fontSize: "small",
                  }}
                >
                  {this.props.twitterF}
                </p>
              </div>
            </div>
            <div className="col" style={{ maxWidth: "410px" }}>
              <motion.div
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.3 }} 
                style={{ marginBottom: "20px" }}
              >
                <Chart className="graphs"
                  options={this.state.Market_Cap.options}
                  series={this.state.Market_Cap.series}
                  type="line"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.3 }} 
                style={{ marginBottom: "20px" }} 
              >
                <Chart className="graphs"
                  options={this.state.Tot_Vol.options}
                  series={this.state.Tot_Vol.series}
                  type="line"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default ChartSection;
