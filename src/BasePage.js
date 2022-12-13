import './BasePage.scss';
import logo1 from './images/stand.png';
import logo2 from './images/walk.png';
import logo3 from './images/run.png';
import logo4 from './images/jump.png';
import React from 'react';
import { NextButton, Hint } from './utils';

class BasePage extends React.Component {
  constructor(props) {
    super(props);
    this.steps = [
      {
        'id': 'car',
        'item': GenericClue,
        'data': {
          'question': "What's the single most expensive thing in this house?",
          'hints': ["It's blue!"],
          'answer': "bmw",  
        }
      },{
        'id': 'couch',
        'item': GenericClue,
        'data': {
          'question': "put your feet up",
          'hints': ["Is soft"],
          'answer': "couch",  
        }
      }, {
        'id': 'drums',
        'item': GenericClue,
        'data': {
          'question': "ba dum tss!",
          'hints': ["rock n roll"],
          'answer': "drums",  
        }
      },{
        'id': 'End',
        'item': End,
        'data': {
        }

      }
    ]
    this.maxStep = this.steps.length - 1
    this.state = {
      currentStep : 0,
      activeStep: 0,
    };
    this.onClickNextButton = this.onClickNextButton.bind(this);
    this.onClickPrevButton = this.onClickPrevButton.bind(this);
    this.activateNextStage = this.activateNextStage.bind(this);
  } 

  onClickNextButton() {
    console.log('onClickNextButton', this.state, this.state.currentStep < this.state.activeStep)
    if (this.state.currentStep < this.state.activeStep) {
      this.setState({
        currentStep: this.state.currentStep + 1,
      })
    }
  }

  onClickPrevButton() {
    console.log('onClickPrevButton', this.state)
    if (this.state.currentStep > 0) {
      this.setState({
        currentStep: this.state.currentStep - 1,
      })
    }
  }

  activateNextStage() {
    if (this.state.activeStep < this.maxStep) {
      this.setState({
        activeStep: this.state.activeStep + 1,
      })
    }
  }

  render() {
    const { currentStep, activeStep } = this.state;
    const Clue = this.steps[currentStep]['item']
    const logos = [logo1, logo2, logo3, logo4]
    const logo = logos[currentStep % logos.length] 
    return (
      <div className="base">
        <header className="base__header">
          <img  src={logo} id='logo' alt="fireSpot"/>
          <p>
            The Hunt!
          </p>
        </header>
        <div className='body'>
          <Clue 
            data={this.steps[currentStep]['data']}
            onSuccess={this.activateNextStage}/>
          {(currentStep > 0) && <NextButton 
            onClick={this.onClickPrevButton} 
            text='Prev' 
            className='prev'
            isActive={true}/>}
          {(currentStep < this.maxStep) && <NextButton 
            onClick={this.onClickNextButton} 
            text='Next' 
            className='next'
            isActive={currentStep < activeStep}/>}
        </div>
      </div>
    );
  }
}

export default BasePage;

class GenericClue extends React.Component {

  constructor(props) {
    super(props);
    const data = this.props.data
    this.hintCount = data.hints.length
    this.state = {
      curHintCount: 0,
      state: 'neutral',
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  } 

  handleKeyPress(e) {
    if (e.which === 13 && this.state.answer) {
      if (this.state.answer === this.props.data.answer) {
        console.log('success')
        this.setState({state: 'success'})
        this.props.onSuccess()
      }
    }
  }

  render() {
    const data = this.props.data;
    const { curHintCount } = this.state;
    return (
      <div className="clue" >
        <div className='question'>
          {data.question}
        </div>
        {data.hints.map((hint, idx) => {
          return <Hint key={idx} reveal={idx < curHintCount} text={hint}/>
        })}
        <input 
          placeholder='What did you find?'
          type="text" 
          id="answer" 
          name="answer" 
          size="20"
          value={this.state.answer}
          onChange={(e) => {this.setState({answer: e.target.value})}}
          onKeyPress={this.handleKeyPress}
          />
      </div>
    );
  }
}

function End() {
  return (
    <div className='end'>
      Congratulations! Enjoy your spols! The End!
    </div>
  )
}
