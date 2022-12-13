import React from 'react';
import classnames from 'classnames';

class NextButton extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    } 
  
    render() {
        const { isActive, onClick, className } = this.props;
        const text = this.props.text || 'Next'
        const classN = classnames({
            "button__active": isActive,
            "button__hidden": !isActive
        })
        return (
            <div className={`button ${className} ${classN}`} onClick={onClick}>
                <div>
                    {text}
                </div>
            </div>
        );
    }
  }


class Hint extends React.Component {
    render() {
        return (
            <div>
                {this.props.reveal && <div>
                    {this.props.text}
                </div>}
                {!this.props.reveal && <div>
                    Locked
                </div>}
            </div>
        )}
    }

export  { NextButton, Hint };
