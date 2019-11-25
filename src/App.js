import React, { Component } from 'react';
import AutoComplete from './components/AutoComplete';
// import DayPickerModal from './components/DayPickerModal';
// import DayPickerInput from 'react-day-picker';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import duck from './img/duckOnBlue.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingPercent: 25,
      error: false,
      success: false,
      message: '',
      numDucks: 1,
      quantity: 1,
      measure: '',
      type: '',
      kind: '',
      location: {
        lat: 0,
        lng: 0,
        address: ''
      },
      date: new Date().toISOString().slice(0, -8),
      selectedDays: [],
      repeats: []
    }
  }
  saveFeed = async (e) => {
    e.preventDefault()
    this.setState({loading: true})
    this.incrementLoader()
    let { numDucks, type, kind, quantity, location, date, selectedDays } = this.state
    let serverResponse = await fetch('/api/addFeed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ numDucks, type, kind, quantity, location, date, selectedDays })
    })
    let stateUpdate = serverResponse.ok ? { success: true } : {
      error: true,
      message: serverResponse.message || 'Failed to save this feeding, check your self.'
    }
    this.setState(Object.assign(stateUpdate, { loading: false }))
  }
  incrementLoader = async () => {
    setTimeout(function () { this.setState({ loadingPercent: 50 }) }, 1000)
    setTimeout(function () { this.setState({ loadingPercent: 75 }) }, 2000)
    setTimeout(function () { this.setState({ loadingPercent: 100 }) }, 3000)
  }
  handleChange = ({ target }) => this.setState({ [target.name]: target.type === 'number' ? Number(target.value) : target.value })
  handleDaySelect = (day, { selected }) => {
    let { selectedDays } = this.state
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays })
  }
  setLocation = ({ lat, lng, address }) => this.setState({location: { lat, lng, address }})
  render() {
    let { loading, loadingPercent, numDucks, quantity, measure, type, kind, date } = this.state
    return (
      <div className="App">
        <img className='duckHeader' src={duck} alt='NES duck' />
        <main>
          <div className='card inputFeedCard'>
            {this.state.success && (<div className='card-header'>
              <h3>Thank you for feeding the birds!</h3>
            </div>)}
            <div className='card-body'>
              <form onSubmit={this.saveFeed}>
                <div className='form-group'>

                  {/* <DayPicker
                    initialMonth={new Date()}
                    selectedDays={this.state.selectedDays}
                    onDayClick={this.handleDaySelect}
                  /> */}

                  <p>
                    I fed <input placeholder='how many ducks?' className='landingInput' onChange={this.handleChange} type='number' name='numDucks' value={numDucks} /> ducks
                  </p>

                  <p>
                    <input type='number' name='quantity' onChange={this.handleChange} className='landingInput quantity' value={quantity} required min={1} />
                    <select className='landingInput' onChange={this.handleChange} name='measure' value={measure} required>
                      <option disabled>Quantity</option>
                      <option>Teaspoons</option>
                      <option>Tablespoons</option>
                      <option>1/4 cups</option>
                      <option>1/2 cups</option>
                      <option>full cups</option>
                    </select>
                    of
                    <select className='landingInput' onChange={this.handleChange} name='type' value={type} required>
                      <option disabled>Type</option>
                      <option>Grain</option>
                      <option>Nuts</option>
                      <option>Seeds</option>
                      <option>Grubs / bugs</option>
                      <option>Snacks</option>
                      <option>Greens</option>
                      <option>Other</option>
                    </select>
                    <input placeholder='What type?' className='landingInput' onChange={this.handleChange} type='text' name='kind' value={kind} required />
                  </p>
                  <AutoComplete placeholder='Where did you feed them?' locationSelect={this.setLocation} />

                  <p>
                    And when? <input value={date} onChange={this.handleChange} className='landingInput' type='datetime-local' name='date' />
                  </p>
                  {loading ? (
                    <div className='progress margin-bottom'>
                      <div className={`bar striped warning w-${loadingPercent}`}></div>
                    </div>
                  ) : (
                    <div className='row flex-edges'>
                      <div className='col col-4'>
                        <button onClick={this.triggerLoader} className='paper-btn btn-primary' type='button'>Add days</button>
                      </div>
                      <div className='col col-4'>
                        <button style={{backgroundColor: '#bbd4ec'}} className='btn-secondary' type='submit'>Save</button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
