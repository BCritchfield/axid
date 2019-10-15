import React, { Component } from 'react';
import Airtable from 'airtable';

import './App.css';
import Week from './WeekComponent';
import MeetingsFormComponent from './MeetingsFormComponent';
import ProgrammingCal from './ProgrammingCal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCocktail, faCalendarAlt, faScroll } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tails: [[], [], [], [], [], [], [], [], [], [], [], [], [], []],
      currWeek: '5',
      activePage: 'Social',
    };

    this.sortData = this.sortData.bind(this);
    this.getBase = this.getBase.bind(this);
  }

  componentDidMount() {
    this.getBase();
    this.setState({});

  }

  getBase() {
    // retrieves entire sheet data and stores in State: data
    fetch('https://api.airtable.com/v0/appAVKG5HMWYrRrj5/Imported%20table?api_key=keynt5FoAUoc3bIBd')
    .then(resp => resp.json())
    .then((data) => {
      this.setState({ data });


    })
    .then(()=>{
      this.sortData();
    })
    .catch((err) => {
      console.log('error');
    });

    let base = new Airtable({apiKey: 'keynt5FoAUoc3bIBd'}).base('appAVKG5HMWYrRrj5');
    this.setState({ base: base});
  }

  sortData(){
    this.setState({tails: [[], [], [], [], [], [], [], [], [], [], [], [], [], []]});
    if(this.state.data.records){
      this.state.data.records.forEach((record) => {
        let tail = record.fields;
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
      <div className="App module">

      <h1>AXID 19F</h1>
      <div className="menu visibleOnBigOnly">
      <p
      onClick={() => { this.setState({ activePage: 'Social' }); }}
      className={this.state.activePage === 'Social' ? 'gradientText bottomPadding' : 'bottomPadding'}
      >
      Social Calendar
      </p>
      <p
      onClick={() => { this.setState({ activePage: 'Meetings' }); }}
      className={this.state.activePage === 'Meetings' ? 'gradientText bottomPadding' : 'bottomPadding'}
      >
      Meetings Forms
      </p>
      <p
      onClick={() => { this.setState({ activePage: 'Programming' }); }}
      className={this.state.activePage === 'Programming' ? 'gradientText bottomPadding' : 'bottomPadding'}
      >
      Programming Calendar
      </p>
      <p
      onClick={() => { this.setState({ activePage: 'fullcal' }); }}
      className={this.state.activePage === 'fullcal' ? 'gradientText bottomPadding' : 'bottomPadding'}
      >
      Full Calendar
      </p>
      </div>

      <div className="mobileMenu">

        <FontAwesomeIcon 
          className={this.state.activePage === 'Social' ? 'mobileIcon activeMobileIcon' : 'mobileIcon'}
          onClick={() => { this.setState({ activePage: 'Social' }); }}
          icon={faCocktail}/>
        <FontAwesomeIcon 
          className={this.state.activePage === 'Meetings' ? 'mobileIcon activeMobileIcon' : 'mobileIcon'}
          onClick={() => { this.setState({ activePage: 'Meetings' }); }}
          icon={faScroll} />
        <FontAwesomeIcon 
          className={this.state.activePage === 'fullcal' ? 'mobileIcon activeMobileIcon' : 'mobileIcon'}
          onClick={() => { this.setState({ activePage: 'fullcal' }); }}
          icon={faCalendarAlt}  />

      </div>

      { this.state.activePage === 'Social'
      ? (Object.values(this.state.tails).map((week) => {
        let active = false;
        console.log('week');
        console.log(week);

        if (week[0] && week[0].Week === this.state.currWeek) {
          active = true;
        }
        return <Week tails={week} active={active} />;
      }))
      : <div />
    }

    {this.state.activePage === 'Meetings'
    ? <div className="pageCenter">
      <MeetingsFormComponent type="dum" base = {this.state.base}/>
      <MeetingsFormComponent type="smart" base = {this.state.base}/>
      <MeetingsFormComponent type="sup" base = {this.state.base} />
      <MeetingsFormComponent type="sexi" base={this.state.base} />
      </div>
    : <div />
  }
    {this.state.activePage==='Programming'
    ? <ProgrammingCal />
    : <div />
    }

    {this.state.activePage === 'fullcal'
      ? <div style = {{backgroundColor: 'white', padding: '20px', display: 'flex', alignItems: 'center', justifyContent:'center'}} >
      <iframe title="fullcal" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=dDhjZGZobW5qNTdndWQyMHNpOHAxMm01dXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%233F51B5&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0" style={{borderWidth:'0'}} width="800" height="600" frameBorder="0" scrolling="no"></iframe></div>
      : <div />
    }

  </div>
  );
  }
}

export default App;
