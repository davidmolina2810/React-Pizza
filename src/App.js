import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    editing: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then( res => res.json() )
    .then( pizzas => this.setState({pizzas}))
  }

  editPizza = (pizza) => {
    this.setState({ editing: pizza })
  }

  updatePizza = (pizza) => {
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian
      })
    })
    .then( res => res.json() )
    .then( pizza => this.setState({
      pizzas: [...this.state.pizzas.filter( oldPizza => oldPizza.id !== pizza.id ), pizza]
    }) )
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          pizza={this.state.editing}
          updatePizza={this.updatePizza}
        />
        <PizzaList 
          pizzas={this.state.pizzas}
          editPizza={this.editPizza}
        />
      </Fragment>
    );
  }
}

export default App;
