import React, { useState } from 'react';
import { WordButton } from './WordButton'



export function Yard (props)  {


 const submitHandler =(evt) => {
    props.handlePick(evt)
  }
 const submitHandler2 =(evt) => {
    props.handleUnPick(evt);
  }


 const handleClick =() => {
    props.onHeaderClick(props.value);
  }



        let navLinks
         navLinks = props.uniques.map((synCard, index) => {
        return <WordButton synCard={synCard.synonyms} complete={synCard} key={synCard + index} index={index} submitHandler={submitHandler} />
      })

      console.log('yard response', props.response)

    return (
    (<div className="d-flex flex-row flex-wrap">
      {navLinks} 
    </div>)
    )
}



