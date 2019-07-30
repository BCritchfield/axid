import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faTimes} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

import './Tails.css';


export default class Tail extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen: false,
			signUpModalOpen: false,
		}
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

   		const tail = this.props.tail
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
               <div className={this.props.last ? 'day' : 'day vertWhite'}>
                  <p className="dayName" onClick={()=>{this.setState({modalOpen: true})}}>
                    {dayNames[tail.Day]}
                    {tail.Info ?
                    	<span> <FontAwesomeIcon  className="hoverIcon" icon={faLightbulb} /></span>
                    :
                    	<div />
                    }
                  </p>
                  <p>{tail.Description}</p>
                  <p>{tail.Theme === undefined ? '' : 'Theme: '}</p>
                  <p>{tail.Theme}</p>
                  <img style={{marginTop: '10px'}} alt="test" src="https://image.flaticon.com/icons/svg/1086/1086426.svg" height="80px" />
					<Modal 
           				isOpen={this.state.modalOpen}
           				contentLabel="Minimal Modal Example"
           				shouldCloseOnOverlayClick={true}
           				style={customStyles}


        			>
        			<div style={{display: 'flex', alignItems: 'flex-start'}}>
        			<div>
           				<p style={{fontWeight:'600', margin: '0'}}>More Info:</p>
           				<p>House @ 8pm - come through for drinks and sisterhood!</p>
           			</div>
          			<FontAwesomeIcon icon={faTimes} onClick={()=>{this.setState({modalOpen: false})}} />
        			</div>
        		</Modal>


				<Modal 
           				isOpen={this.state.signUpModalOpen}
           				contentLabel="Minimal Modal Example"
           				shouldCloseOnOverlayClick={true}
           				style={customStyles}
        		>
        			<div style={{display: 'flex', alignItems: 'flex-start'}}>
        			<div>
           				<p style={{fontWeight:'600', margin: '0'}}>Sign Ups For {this.props.singUpSheeetName}</p>
           				<p>House @ 8pm - come through for drinks and sisterhood!</p>
           			</div>
          			<FontAwesomeIcon icon={faTimes} onClick={()=>{this.setState({signUpModalOpen: false})}} />
        			</div>
        		</Modal>


                </div>
			)
	}

}