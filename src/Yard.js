import React, { useState } from 'react';
import { WordButton } from './WordButton'


export class Yard   extends React.Component  {
  constructor() {
    super();
    this.submitHandler = this.submitHandler.bind(this);
    this.submitHandler2 = this.submitHandler2.bind(this);
    this.state = {
      inputField: ''
    };
  }
  
    submitHandler(evt) {
    this.props.handlePick(evt);
  }
      submitHandler2(evt) {
    this.props.handleUnPick(evt);
  }

  componentDidMount() {
}
  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  }
  render() {
        let navLinks
    // if (this.props.todos !== undefined) {

         navLinks = this.props.uniques.map((synCard, index) => {
        return <WordButton synCard={synCard.term} key={synCard + index} index={index} submitHandler={this.submitHandler} />
      })
    // }
 
    return (<div className="d-flex flex-row flex-wrap">{navLinks} 
    </div>)
  }
}

