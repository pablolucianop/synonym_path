import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { useSpring, animated } from 'react-spring'


export function WordButton (props)  {
  const submitHandler2 = (evt) =>{
    evt.preventDefault();
    props.submitHandler([props.synCard])
  }

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
    return (
      <animated.div style={propsi} className="p-2">
        <Card type="button" className="btn btn-light flex-row" style={props} >
          <div className="d-flex flex-row">
            <div className="p-2" onClick={submitHandler2}><animated.h5 style={propsi}>{props.synCard}</animated.h5></div>
            {(props.eee !== undefined) ?  <div className="p-2"><span className="badge text-muted" onClick={submitHandler22}>╳</span></div> : ''}
          </div>
        </Card>
      </animated.div>
    )
}