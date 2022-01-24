import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { useSpring, animated } from 'react-spring'


export function SingleWord (props)  {
  const submitHandler2 = (evt) =>{
    evt.preventDefault();
    console.log('[props.word]', [props.word])
    props.submitHandler([props.word])
  }
  const submitHandler3 = (evt) =>{

    console.log('[props.word]', [props.word])

  }

  console.log('submitHandler3', submitHandler3)

  const submitHandler22 =(evt) => {
    evt.preventDefault();
    props.eee(props.synCard)
  }




    return (
            <div type="button"  className="p-2" onClick={submitHandler3}>{props.word} </div>
    )
}