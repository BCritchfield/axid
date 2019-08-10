import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import './Tails.css';




export default class Tail extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen: false,
			signUpModalOpen: false,
      tooltipOpen: false,
		}
    this.toggle=this.toggle.bind(this);
	}

    toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

	render(){

    	const dayNames = {
      		M: 'Monday',
      		T: 'Tuesday',
      		W: 'Wednesday',
      		H: 'Thursday',
      		F: 'Friday',
      		S: 'Saturday',
      		U: 'Sunday',
   		};

   		const tail = this.props.tail;
      const icon = tail.Icon || "https://image.flaticon.com/icons/svg/54/54591.svg";
   		const customStyles = {
  			content : {
  				textAlign: 'center',
    			top: '25%',
    			left : '50%',
    			right: 'auto',
    			bottom: 'auto',
    			marginRight : '-50%',
    			transform: 'translate(-50%, -50%)',
    			border: '4px solid #db2688',
    			width: '300px',
    			fontSize: '18px',
    			backgroundColor: '#101225',
    			borderStyle: 'solid',
    			borderWidth: '3px',
    			borderRadius: '10px',
    			
    			transition: 'opacity 2000ms ease-in-out',

  			},

		};

		return(
               <div className={(this.props.last ? 'day ' : 'day vertWhite ') + (tail.Info || tail.Theme ? '': '')}>
                        <div>

      </div>
                  <p className="hoverIcon dayName" onClick={()=>{this.setState({modalOpen: true})}}>
                    {dayNames[tail.Day]}

                    <div  className="hoverBold">See Details</div>
                  </p>
                  <p onClick={()=>{this.setState({modalOpen: true})}}>{tail.Description}</p>
{/*                  <p>{tail.Theme === undefined ? '' : 'Theme: '}</p>
                  <p>{tail.Theme}</p>*/}

                  <img onClick={()=>{this.setState({modalOpen: true})}} style={{marginTop: '10px'}} alt="test" src={icon} height="80px" />
				
          <Modal 
           				isOpen={this.state.modalOpen && (tail.Info || tail.Theme)}
           				contentLabel="Minimal Modal Example"
           				shouldCloseOnOverlayClick={true}
           				style={customStyles}


        			>
        			<div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'space-between'}}>
       			   {tail.Info ? (<div>
           				<p style={{fontWeight:'600', margin: '0'}}>More Info:</p>
           				<p>{tail.Info}</p>
           			</div>) : <div />
                  }
                 {tail.Theme ? (<div>
                  <p style={{fontWeight:'600', margin: '0'}}>Theme:</p>
                  <p>{tail.Theme}</p>
                </div>) : <div />
                  }
                  <div>
          			<FontAwesomeIcon icon={faTimes} onClick={()=>{this.setState({modalOpen: false})}} />
        			   </div>
              </div>
        		</Modal>

                </div>
			)
	}

}