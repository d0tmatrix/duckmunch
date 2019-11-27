import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from './enzyme';

const feed = {
  "_id": {
    "$oid": "5ddc5554950b3c5fb224636c"
  },
  "numDucks": 3,
  "type": "Nuts",
  "kind": "Almonds",
  "quantity": 2,
  "measure": "Teasponns",
  "location": {
      "lat": 43.4516395,
      "lng": -80.49253369999997,
      "address": "Kitchener, ON, Canada"
  },
  "date": "2019-11-25T23:30:00+00:00"
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders all 7 landing inputs', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find('.landingInput')).toHaveLength(7)
})

it('posts a new feed object from state on submit', () => {

  let fetchCall = jest.spyOn(window, "fetch").mockImplementation(() => {
    const fetchResponse = {
      json: () => Promise.resolve([feed]),
      status: 200,
      ok: true
    }
    return Promise.resolve(fetchResponse)
  })

  let wrapper = mount(<App />)
  let submit = jest.spyOn(wrapper.instance(), 'saveFeed')

  wrapper.find(`input[name='numDucks']`).simulate('change', { target: { name: 'numDucks', value: 3 }})
  wrapper.find(`input[name='quantity']`).simulate('change', { target: { name: 'quantity', value: 2 }})
  wrapper.find(`select[name='measure']`).simulate('change', { target: { name: 'measure', value: 'Tablespoons' }})
  wrapper.find(`select[name='type']`).simulate('change', { target: { name: 'type', value: 'Snacks' }})
  wrapper.find(`input[name='kind']`).simulate('change', { target: { name: 'kind', value: 'Chips' }})
  wrapper.find(`input[name='date']`).simulate('change', { target: { name: 'date', value: '2019-11-25T10:00' }})
  wrapper.find(`input[name='location']`).simulate('change', { target: { value: '55 east Duluth, Montreal, Canada' }})

  expect(wrapper.state().numDucks).toBe(3)
  wrapper.find("[type='submit']").simulate('submit')

  expect(submit).toHaveBeenCalled()
  expect(fetchCall).toHaveBeenCalled()
})
