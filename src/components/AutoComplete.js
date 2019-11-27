import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default class Autocomplete extends Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
  }
  handleChange = address => this.setState({ address })
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) => {
        this.setState({ address })
        this.props.locationSelect({lat, lng, address})
      })
      .catch(error => console.error('Error', error))
  }
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        googleCallbackName='mapsApiLoaded'
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='autocompleteParent'>
            <div className='inputLabel'>Where?</div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-input landingInput autocompleteInput',
                name: 'location'
              })}
            />
            <div className='autocompleteDropdownContainer child-borders'>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                const style = {
                  cursor: 'pointer',
                  padding: '0.25em',
                  backgroundColor: suggestion.active ? '#fafafa' : '#ffffff'
                }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span style={{color:'black'}}>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}
