import React, { Component } from 'react';
import styles from './AppStyle.css';

class FinanceApp extends Component {
  state = {

    inputValue: '',
    inputValue2: undefined,
    financeList: [],
    financeListM: [],
    TotalIncome: 0,
    TotalOutcome: 0,
    AmountAvailable:0,
  }

  onType = (event) => {

    this.setState({
      inputValue: event.target.value,
    })
  }
  onType2 = (event) => {

    this.setState({
      inputValue2: event.target.value,
    })
  }
  onType2 = (event) => {

    this.setState({
      inputValue2: event.target.value,
    })
  }
  saveToList = () => {
    if(this.state.inputValue2 < 0){
      this.setState({
        TotalOutcome: this.state.TotalOutcome + parseInt(this.state.inputValue2),
        financeListM: [...this.state.financeListM, {first: this.state.inputValue, second: this.state.inputValue2}],
        inputValue: '',
        AmountAvailable: this.state.AmountAvailable + parseInt(this.state.inputValue2),
      })
    }else{
    this.setState({
      TotalIncome: this.state.TotalIncome + parseInt(this.state.inputValue2),
      financeList: [...this.state.financeList, {first: this.state.inputValue, second: this.state.inputValue2}],
      inputValue: '',
      AmountAvailable: this.state.AmountAvailable + parseInt(this.state.inputValue2),
    })
  }
  }


  render () {
    return (
      <div>
      <h2>£ {this.state.AmountAvailable}</h2>
      <article className="inputfield">
        <input
          className="select"
          type='text'
          placeholder="Description"
          onChange={this.onType}
          value={this.state.inputValue}
        />
        <input
          className="select"
          type="number"
          placeholder="Amount"
          onChange={this.onType2}
          value={this.state.inputValue2}
        />

        <Button onClick={this.saveToList} text='Add Finance' className="addFinanceButton" />

        </article>

        <h1>Income: £ {this.state.TotalIncome} </h1>
        <ListFinance items={this.state.financeList} />


        <h1>Outcome: £ {this.state.TotalOutcome}</h1>
        <ListFinanceM items={this.state.financeListM} />

      </div>
    )
  }
}
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const ListFinance = (props) => {
  const listItems = props.items.map((item) => {
    return <li className = "listem2">{item.second} from {item.first}</li>
  })
  return (
    <ol className="listem">
      {listItems}
    </ol>
  )
}
const ListFinanceM = (props) => {
  const listItems = props.items.map((item) => {
    return <li className = "listem2">{item.second} for {item.first}</li>
  })
  return (
    <ol className="listem">
      {listItems}
    </ol>
  )
}
export default FinanceApp;
