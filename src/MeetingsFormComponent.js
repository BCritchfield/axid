import React from 'react';
import Airtable from 'airtable';
import './MeetingsFormComponent.css';

export default class MeetingsFormComponent extends React.Component {
	constructor(props){
		super(props);

		this.state={
			fieldOne: '',
			fieldTwo: '', 
			submitted: false,
		}

		this.handleDumDumSubmit = this.handleDumDumSubmit.bind(this);
		this.handleSupportiveSubmit = this.handleSupportiveSubmit.bind(this);
		this.handleSmartSubmit = this.handleSmartSubmit.bind(this);
		this.handleSexiSubmit = this.handleSexiSubmit.bind(this);
		this.handleFieldOneChange = this.handleFieldOneChange.bind(this);
		this.handleFieldTwoChange = this.handleFieldTwoChange.bind(this);
	}

  	handleFieldOneChange(e){
  		this.setState({fieldOne: e.target.value});
  		if(this.state.submitted){
  			this.setState({submitted: false});
  		}
  	}

  	handleFieldTwoChange(e){
  		this.setState({fieldTwo: e.target.value});
  		if(this.state.submitted){
  			this.setState({submitted: false});
  		}
  	}

	handleDumDumSubmit(){
		if(this.props.base){

			this.props.base('Dum Dums').create({
				"Name": this.state.fieldOne,
				"Story": this.state.fieldTwo,
			}, function(err, record){
				if(err){
					console.error(err);
					return;
				}
				console.log(record.getId());
				
			});

		}
		this.setState({submitted: true});
	}

	handleSupportiveSubmit(){
		if(this.props.base){

			this.props.base('Supportive Sis').create({
				"Name": this.state.fieldOne,
				"Story": this.state.fieldTwo,
			}, function(err, record){
				if(err){
					console.error(err);
					return;
				}
				console.log(record.getId());
				
			});

		}
		this.setState({submitted: true});
	}

	handleSexiSubmit(){
		if(this.props.base){

			this.props.base('Sexi Times').create({
				"Questions": this.state.fieldOne,
				"Stories": this.state.fieldTwo,
			}, function(err, record){
				if(err){
					console.error(err);
					return;
				}
				console.log(record.getId());

			});

		}
		this.setState({submitted: true});
	}

	handleSmartSubmit(){
		if(this.props.base){

			this.props.base('Smart Cookies').create({
				"Name": this.state.fieldOne,
				"Story": this.state.fieldTwo,
			}, function(err, record){
				if(err){
					console.error(err);
					return;
				}
				console.log(record.getId());

			});

		}	
		this.setState({submitted: true});
	}

render(){
	const {fieldOne, fieldTwo} = this.state;
	console.log('state');
	console.log(this.state);

	const names ={
		'sexi': 'Sexi Times',
		'dum': 'Dum Dums',
		'sup': 'Supportive Sis',
		'smart': 'Smart Cookies',
	}

	const placeholders = {
		'dum': 'Dum Dum to...',
		'sup': 'Supportive Sis to...',
		'smart': 'Smart Cookie to...',
		'sexi': 'Stories!',
	}

	const imgSrcs = {
		'dum': 'https://www.iconsdb.com/icons/preview/white/dumbbell-xxl.png',
		'sup': 'https://www.iconsdb.com/icons/preview/white/bra-xxl.png',
		'smart': 'https://www.targetis.co.uk/app/uploads/2014/09/icon-cookie.png',
		'sexi': 'https://www.iconsdb.com/icons/preview/white/woman-xxl.png',
	}

	const submits = {
		'dum': this.handleDumDumSubmit,
		'sup': this.handleSupportiveSubmit,
		'smart': this.handleSmartSubmit,
		'sexi': this.handleSexiSubmit,
	}

	let header = names[this.props.type];

	return(
	<div className='dums'>
		<div>
        	<h2 className={'weekHeader ' + this.props.type} >{header}</h2>
        	<img src={imgSrcs[this.props.type]} height='50px' />
        </div>
        <div className='bottomBorderWhite' />
        <div className='topPadding'>
			<label htmlFor="inp" className="inp">
  				<input value={this.state.fieldOne} onChange={this.handleFieldOneChange} type="text" className="inp" autoComplete="off" id="inp" placeholder={this.props.type !== 'sexi'? "Your name (optional)" : 'Questions!'} />
			</label>
        </div>
        <div className='topPadding'>
			<label htmlFor="inp" className="inp">
  				<input name='fieldTwo' value={fieldTwo} onChange={this.handleFieldTwoChange} type="text" className="inp" autoComplete="off" id="inp" placeholder={placeholders[this.props.type]} />
			</label>
        </div>
        <div>
        <button className={"submitButton " + (this.state.submitted ? 'submitted' : '')} onClick={submits[this.props.type]}>
        	{this.state.submitted ?
        		'Submitted'
        		: 'Submit!'}
        </button>
		</div>
	</div>
	);
}

}