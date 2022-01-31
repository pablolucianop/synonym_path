import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { useSpring, animated } from 'react-spring'


export function SingleWord (props)  {
  const submitHandler2 = (evt) =>{
    evt.preventDefault();
    props.submitHandler([props.word])
  }
  const submitHandler3 = (evt) =>{
    evt.preventDefault();
    props.submitHandler([props.word])
  }


  const submitHandler22 =(evt) => {
    evt.preventDefault();
    props.eee(props.synCard)
  }




    return (
            <div type="button"   onClick={submitHandler3}>{props.word} </div>
    )
}