import React, { Component } from 'react';
import Tail from './TailsComponent/Tail';

export default class Week extends Component {



  compareTailsByDay(tailA, tailB){
    const daysToNum = {
      U: 1,
      M: 2,
      T: 3,
      W: 4,
      H: 5,
      F: 6,
      S: 7,
    }
    let comparison = 0;
    if(daysToNum[tailA.Day] > daysToNum[tailB.Day]){
      comparison = 1;
    }else{
      comparison = -1;
    }
    return comparison;
  }

  render() {
    let tailsSorted=[]
    if(this.props.tails){
    tailsSorted = this.props.tails.sort(this.compareTailsByDay);
  }

/*    console.log('Week props');
    console.log(this.props);*/


    if (tailsSorted === [] || !this.props.tails.length > 0) {
      return <div />;
    }



    const weekClass = (this.props.active ? 'calendar actve' : 'calendar overlay');
    return (

      <div className={weekClass}>
        <h2 className="weekHeader">
          {"Week "}
          {tailsSorted[0].Week}
        </h2>
        <div className="bottomBorderWhite" />
        <div className="days">
          {tailsSorted.map((e, i, arr)=>{

            return (
                <Tail tail={e} last={arr.length-1 === i}/>

              )
          })}
        </div>
      </div>

    );
  }
}
