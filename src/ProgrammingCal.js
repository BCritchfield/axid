import React, { Component } from 'react';
import Airtable from 'airtable';

import './App.css';
import Week from './WeekComponent';

class ProgrammingCal extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tails: [[], [], [], [], [], [], [], [], [], [], [], [], [], []],
      currWeek: 2,
    };

    this.sortData = this.sortData.bind(this);
    this.getCurrentWeek = this.getCurrentWeek.bind(this);
    this.getBase = this.getBase.bind(this);
  }

  componentDidMount() {
    this.getBase();
    this.setState({});

  }

  getCurrentWeek(){
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keynt5FoAUoc3bIBd'}).base('appAVKG5HMWYrRrj5');

    base('Programming').find('recSXralX8niFhfFl', (err, record)=> {
      if (err) { console.error('ERROR'); return; }

      this.setState({currWeek: record.fields.Current})
    });

  }

  getBase() {
    // retrieves entire sheet data and stores in State: data
    fetch('https://api.airtable.com/v0/appAVKG5HMWYrRrj5/Programming?api_key=keynt5FoAUoc3bIBd')
    .then(resp => resp.json())
    .then((data) => {
      this.setState({ data });

    })
    .then(()=>{
      this.sortData();
    })
    .then(()=>{
      this.getCurrentWeek();
    })
    .catch((err) => {
      console.log('error');
    });

    let base = new Airtable({apiKey: 'keynt5FoAUoc3bIBd'}).base('appAVKG5HMWYrRrj5');
    this.setState({ base: base});
  }

  sortData(){
    console.log('this.data');
    console.log(this.state.data);

    this.setState({tails: [[], [], [], [], [], [], [], [], [], [], [], [], [], []]});
    if(this.state.data.records){

      this.state.data.records.forEach((record) => {
        let tail = record.fields;
        console.log('tail');
        console.log(tail);
        let recordWeekInState = this.state.tails[(tail.Week - 1)];
        recordWeekInState.push(record.fields);
      //console.log(recordWeekInState);
    });
      this.setState({});
    }
    
  }

  render() {


    if (this.state.data.length === 0) {
      return <div>Loading....</div>;
    }
    return (
      <div>
     { (Object.values(this.state.tails).map((week) => {
        let active = false;
        if (week[0] && week[0].Week === '2') {
          active = true;
        }
        return <Week tails={week} active={active} />;
      }))
   }

  </div>
  );
  }
}

export default ProgrammingCal;
