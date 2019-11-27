import React, { Component } from 'react';
import AutoComplete from './components/AutoComplete';
import duck from './img/duckOnBlue.png';
import dayjs from 'dayjs';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loadingPercent: 25,
      error: false,
      success: false,
      message: '',
      numDucks: 1,
      quantity: 1,
      measure: 'Teaspoons',
      type: 'Grain',
      kind: '',
      location: {
        lat: 0,
        lng: 0,
        address: ''
      },
      date: dayjs().format(),
      displayDate: dayjs().format('YYYY-MM-DDTHH:mm'),
      repeat: false,
      repeatDays: 0
    }
  }
  saveFeed = async (e) => {
    try {
      e.preventDefault()
      this.setState({ loading: true })
      this.incrementLoader()
      let { numDucks, measure, type, kind, quantity, location, date } = this.state
      let repeatDays = this.state.repeat ? this.state.repeatDays : 0
      let serverResponse = await fetch('/api/addFeed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ numDucks, measure, type, kind, quantity, location, date, repeatDays })
      })
      let stateUpdate = serverResponse.ok && !serverResponse.error ? { success: true } : {
        sucess: false,
        error: true,
        message: serverResponse.message || 'Failed to save this feeding, darn. Try again?'
      }
      this.setState(Object.assign({}, stateUpdate, { loading: false }))
    } catch (error) {
      console.error(error)
      this.setState({ error: true, message: error.message || 'An unknown error occured. Please try again.'})
    }
  }
  incrementLoader = async () => {
    setTimeout(() => { this.setState({ loadingPercent: 50 }) }, 1000)
    setTimeout(() => { this.setState({ loadingPercent: 75 }) }, 2000)
    setTimeout(() => { this.setState({ loadingPercent: 100 }) }, 3000)
  }
  handleChange = ({ target }) => this.setState({ [target.name]: target.type === 'number' ? Number(target.value) : target.value })
  setLocation = ({ lat, lng, address }) => this.setState({ location: { lat, lng, address } })
  handleDateChange = ({ target }) => this.setState({
    displayDate: dayjs(target.value).format('YYYY-MM-DDTHH:mm'),
    date: dayjs(target.value).format()
  })
  toggleRepeat = () => this.setState({ repeat: !this.state.repeat })
  render() {
    let { loading, loadingPercent, numDucks, quantity, measure, type, kind, displayDate, repeat, repeatDays } = this.state
    return (
      <div className='App'>
        <img className='duckHeader' src={duck} alt='NES duck' />
        <main>
          <div className='card inputFeedCard'>
            {this.state.success && (
              <div className='card-header'>
                <h3>Thank you for feeding the birds!</h3>
              </div>
            )}
            <div className='card-body'>
              <form onSubmit={this.saveFeed}>
                <div className='form-group mainFormGroup'>

                  {/* How many ducks? */}
                  <p>
                    I fed <input placeholder='how many ducks?' className='landingInput' onChange={this.handleChange} type='number' name='numDucks' value={numDucks} /> ducks
                  </p>

                  {/* Quantity, kind and type of food */}
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
                    <select className='shrink landingInput' onChange={this.handleChange} name='type' value={type} required>
                      <option disabled>Type</option>
                      <option>Grain</option>
                      <option>Nuts</option>
                      <option>Seeds</option>
                      <option>Grubs / bugs</option>
                      <option>Snacks</option>
                      <option>Greens</option>
                      <option>Other</option>
                    </select>
                    <input placeholder='What type?' className='shrink landingInput' onChange={this.handleChange} type='text' name='kind' value={kind} required />
                  </p>

                  {/* Autocomplete Input for locations */}
                  <div>
                    <AutoComplete placeholder='Where did you feed them?' locationSelect={this.setLocation} />
                  </div>

                  {/* DateTime select */}
                  <div>
                    <div className='inputLabel'>And when?</div>
                    <input value={displayDate} onChange={this.handleDateChange} className='date landingInput' type='datetime-local' name='date' />
                  </div>

                  {/* Loader */}
                  {loading ? (
                    <div className='margin-top progress margin-bottom'>
                      <div className={`bar striped warning w-${loadingPercent}`}></div>
                    </div>
                  ) : (
                    <div className='row flex-edges'>

                      {/* Set Repeat */}
                      <div className='col col-8 noBottomPadding'>
                        <fieldset className='checkboxGroup form-group'>
                          <label style={{display: 'inline'}} className='paper-check' htmlFor='repeat'>
                            <input checked={repeat} onChange={this.toggleRepeat} value={repeat} type='checkbox' id='repeat' />
                            <span style={{display: 'inline'}}>Repeat</span>
                          </label>
                          {repeat && <span style={{marginLeft: '8px'}}>for next <input className='landingInput' type='number' name='repeatDays' value={repeatDays} onChange={this.handleChange} /> days</span>}
                        </fieldset>
                      </div>

                      {/* Submit button */}
                      <div className='col col-4 noBottomPadding'>
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
    )
  }
}

export default App;
