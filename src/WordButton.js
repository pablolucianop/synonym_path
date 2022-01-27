import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { SingleWord } from './SingleWord'
import { useSpring, animated } from 'react-spring'


export function WordButton (props)  {
  // const submitHandler2 = (evt) =>{
  //   // evt.preventDefault();
  //   props.submitHandler([props.synCard])
  // }

  const submitHandler22 =(evt) => {

    evt.preventDefault();
    props.eee(props.synCard)
  }
  const propsi = useSpring({ 
    from: { opacity: 0 },
    to: { opacity: 1},
    config: { duration: 1000 },
    delay: props.index*100,
  })

  function spliter(synCard) {
    let xSyn
      if (synCard.indexOf(',') !== -1) {
        xSyn = synCard.split(',').map((x) => x[0] === ' ' ? x.slice(1) : x)
      } else {
        xSyn = [synCard]
      }
      return  xSyn
  }




    let splitted = spliter(props.synCard) 
    // console.log('splitted222', splitted)


let  navLinks

if( Array.isArray(splitted)){
        navLinks= splitted.map((word, index) => {
        return <SingleWord  key={word + index} submitHandler={props.submitHandler} word={word}  />
      })
}





    return (
      <animated.div style={propsi} className="p-2">
        <Card type="button" className="btn btn-light flex-row shadow p-3 mb-5 bg-white rounded border-0" style={props} >
          <div className="d-flex flex-row">
            <div className="p-2" onClick={props.submitHandler}><animated.h5 style={propsi}>{
            // props.synCard
            }</animated.h5></div>
            {(props.eee !== undefined) ?  <div className="p-2"><span className="badge text-muted" onClick={submitHandler22}>╳</span></div> : ''}
          </div>
          {navLinks}
          {(props.complete !== undefined) ? <small> {props.complete.definition}</small> : ''}
            { 
            console.log('props.complete', props.complete)}
                  
        </Card>
        
      </animated.div>
    )
}