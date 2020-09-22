import React from 'react';
import logo from './logo.svg';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      from: '',
      to: '',
      responseData: ''
    }
    // this.handleInput = this.handleInput.bind(this)
  }

  handleConvertCurrency = async () => {
    if (this.state.from && this.state.to && this.state.amount && this.state.from != this.state.to) {
      let url = `https://api.frankfurter.app/latest?amount=${this.state.amount}&from=${this.state.from}&to=${this.state.to}`;
      try {
        let res = await fetch(url);
        let response = await res.json();
        this.setState({
          responseData: response
        })
        console.log("result", response.amount)
        console.log("result", res.status)
      } catch (error) {
        console.log(error);
      }
    }

  }
  handleInput = (value) => {
    this.setState({
      from: value.label
    })
  }
  handleOutput = (value) => {
    this.setState({
      to: value.label
    })
  }
  handleInputChange = (event) => {
    this.setState({
      amount: event.target.value
    })
  }

  render() {
    const from = this.state.from
    const to = this.state.to
    const options = [
      "AUD",
      "BGN",
      "BRL",
      "CAD",
      "CHF",
      "CNY",
      "CZK",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "HRK",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "ISK",
      "JPY",
      "KRW",
      "MXN",
      "MYR",
      "NOK",
      "NZD",
      "PHP",
      "PLN",
      "RON",
      "RUB",
      "SEK",
      "SGD",
      "THB",
      "TRY",
      "USD",
      "ZAR"
    ];

    return (
      <div className="container">
        <h3 className="heading">Currency Exchange Example</h3>
        <div className="content">
          <div className="input_amountBox">
            <div className="amountBox">
              <h2 className="amount_heading">Input Amount</h2>
              <div className="inputBox">
                <input
                  type='text'
                  placeholder={"0"}
                  value={this.state.amount}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="drop_downList">
                <Dropdown
                  options={options}
                  value={from}
                  placeholder="SELECT"
                  onChange={this.handleInput}
                />
              </div>
            </div>
          </div>

          <div className="button_style">
            <button onClick={this.handleConvertCurrency}
              disabled={this.state.from && this.state.to && this.state.amount && this.state.from != this.state.to ? false : true}
              style={{ opacity: this.state.from && this.state.to && this.state.amount && this.state.from != this.state.to ? 0.8 : 0.9 }}
            >
              Convert
            </button>
          </div>

          <div className="input_amountBox">
            <div className="amountBox">
              <h2 className="amount_heading">output Amount</h2>
              <div className="inputBox">
                <input
                  type='text'
                  placeholder={"0"}
                  readOnly={true}
                  value={this.state.responseData.rates && this.state.responseData.rates[this.state.to]}
                />
              </div>
              <div className="drop_downList">
                <Dropdown
                  options={options}
                  value={to}
                  placeholder="SELECT"
                  onChange={this.handleOutput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

}


export default App;


const arrowClosed = (
  <span className="arrow-closed" />
)
const arrowOpen = (
  <span className="arrow-open" />
)


