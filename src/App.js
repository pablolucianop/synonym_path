import logo from './logo.svg'
import './App.css'
import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Yard } from './Yard'
import { Closer } from './Closer'
import { data } from './data'
import { useSpring, animated } from 'react-spring'

          <span className="font-link">
              This is with Font Link. We are linking the fonts from the Google Fonts.
          </span>



function Title() {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  })


  return <animated.div className="navigation-menu font-link" style={props}> <h1 >TRAVEL BETWEEN WORDS THROUGH SINONIMS</h1></animated.div>
}

const DidYouMean = (props) => {
  let related33 = props.related.map((x) => (
    <button type="button" className="btn btn-light">
      {x}
    </button>
  ))
  return (
    <div>
      did you mean:
      <div className="p-2">
        {related33}
      </div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allSyns: '',
      value: '',
      related: '',
      related2: [],
      mainWord: '',
      picked: [],
      uniques: [],
    
    }
    this.setMainWord = this.setMainWord.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.handlePick = this.handlePick.bind(this)
    this.handleUnPick = this.handleUnPick.bind(this)
  }

  handleChangeInput(event) {
    this.setState({ value: event.target.value })
  }

  handlePick(selectedWord) {
        let wordPure = (Array.isArray(selectedWord))?   selectedWord[0] :  selectedWord
    // this.setState({ picked: [...this.state.picked, wordPure] })
    this.setState({ value: selectedWord }, () => {
    this.handleSubmitSearch()
    })
  }

  handleUnPick(selectedWord) {
    this.setState({ picked: this.state.picked.filter((x) => x !== selectedWord) })
  }

  async handleSubmitSearch(event) {
    this.setState({ mainWord: this.state.value })
    // console.log('this.state.value', this.state.value)
    let word = this.state.value
    let response = await axios.get(`https://www.abbreviations.com/services/v2/syno.php?uid=9413&tokenid=vIMVCwch6JUkn04H&word=${word}&format=json`)
    // console.log('response', response)

    let mockUpResponse = {
      data: {
        result: [
        {term: 'sad, poor , son of a bitch', definition: 'experiencing or showing sorrow or unhappiness', example: '"feeling sad because his dog had died"; "Better by…u should remember and be sad"- Christina Rossetti', partofspeech: 'adj', synonyms: 'deplorable, lamentable, pitiful, distressing, sorry'},
        {term: 'mornfull, depressed', definition: 'of things that make you feel sad', example: `"sad news"; "she doesn't like sad movies"; "it was…, / Sing no sad songs for me"- Christina Rossetti`, partofspeech: 'adj', synonyms: 'deplorable, lamentable, pitiful, distressing, sorry'},
        {term: 'deplorable, distressing, lamentable, pitiful, sad, sorry', definition: 'bad; unfortunate', example: '"my finances were in a deplorable state"; "a lamen…es were in sad shape"; "a sorry state of affairs"', partofspeech: 'adj', synonyms: 'regretful, deplorable, hapless'}
        ]
      }, 
      status: 200, 
      statusText: '', 
      headers: {}, 
      config: {}
    }
    //  let response = mockUpResponse
    if (response.data.error === 'Daily Usage Exceeded') {
      alert('This api is tired, let it rest for today')
      return
    }

    this.setState({ response: response.data.result })

    console.log('response',  response.data.result )

    //if the word isnt an english word, show related words
    if (response.data.result === undefined) {
      let related = response.data.related.map((x) => (
        <button type="button" className="btn btn-light">
          {x.term}
        </button>
      ))
      let justRelated = response.data.related.map((x) => (
        x.term
      ))
      let didYouMean = <div>did you mean{related} </div>
      this.setState({ related: didYouMean })
      this.setState({ related2: justRelated })
      console.log('this.state.related2', this.state.related2)
      return
    }
    //if the word is an english word
    let mainWord
    let responsen
    //is the response is a single object, turn it into an array
    Array.isArray(response.data.result) ? responsen = response.data.result : responsen = [response.data.result]
    //turn the response in array of {sin: [], term: '', main:''}, in simples
    function synsAndTerms(x) {

      let xterm = []
      let xSyn = []

      xterm = x.term.split(',').map((x) => x[0] === ' ' ? x.slice(1) : x)
      if (!(typeof x.synonyms === 'string' || x.synonyms instanceof String)) { x.synonyms = '' }
      if (x.synonyms.indexOf(',') !== -1) {
        xSyn = x.synonyms.split(',').map((x) => x[0] === ' ' ? x.slice(1) : x)
      } else {
        xSyn = x.synonyms
      }

      x = { term: xterm, syn: xSyn }
      return x
    }
    let synsMapp = responsen.map(
      synsAndTerms
    )

    let simples = []
    synsMapp.forEach((element) => {
      if (!Array.isArray(element.syn)) { element.syn = [] }
      element.syn.forEach((element0) => {
        simples.push({
          sin: element0,
          term: element.term.filter(
            (word) => word === word // !== mainWord
          ),
          main: mainWord,
        })
      })
    })

    //make an array of all the synonyms and filter duplicates
    // let uniques = [...new Set(simples.map((synCard) => synCard.sin))]
        let uniques =  response.data.result 
    //make unikes more complex, nos just words but objects
    //pass all uniques to state
    this.setState({ uniques: uniques })

    //pass  array of {sin: [], term: '', main:''} to state
    let simpsObs = { todos: simples }
    this.setState({ allSyns: simpsObs })
    let wordPure = (Array.isArray(word))?   word[0] :  word
        this.setState({ picked: [...this.state.picked, wordPure] })
  }

  setMainWord(event) {
    this.setState({ mainWord: event.target.value })
  }

  render() {
    const pull_data = (data) => {
      // console.log(data);
    }
    return (
      <div>
        <Title />
        <Navbar bg="light" expand="sm" >
          <Container fluid>
            <Navbar.Brand href="#">search synonims</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={this.state.value}
                  onChange={this.handleChangeInput}
                />
                <Button variant="outline-success" onClick={this.handleSubmitSearch}>
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <h3 bg="secondary">
          {this.state.related2.length > 0 ? <DidYouMean related={this.state.related2} /> : null}
        </h3>
        <h2>
          {/* <Badge bg="secondary">{!(this.state.response=== undefined)? this.state.response[0].term : ''}</Badge> */}
        </h2>
        <Closer todos={this.state.picked} handleUnPick={this.handleUnPick} />
        <Yard uniques={this.state.uniques} handlePick={this.handlePick} handleUnPick={this.handleUnPick} func={pull_data} onHeaderClick={this.handleSort} />
        <div>
        </div>
      </div>
    )
  }
}



export default App

