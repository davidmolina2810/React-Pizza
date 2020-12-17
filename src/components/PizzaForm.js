import React from "react"

class PizzaForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      topping: '',
      size: '',
      vegetarian: false
    }
  }

  componentDidUpdate(previousProps) {
    if (this.props.pizza !== previousProps.pizza) {
      const { id, topping, size, vegetarian } = this.props.pizza
      this.setState({ id, topping, size, vegetarian })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  setVege = (e) => {
    if (e.target.value === "Vegetarian") {
      this.setState({ vegetarian: true })
    } else if (e.target.value === "Not Vegetarian") {
      this.setState({ vegetarian: false })
    }
  }

  render() {
    const { topping, size, vegetarian } = this.state

    return(
        <div className="form-row">
          <div className="col-5">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Pizza Topping" 
                value={topping}
                name="topping"
                onChange={this.handleChange}
                />
          </div>
          <div className="col">
            <select 
              value={size} 
              className="form-control" 
              name="size"
              onChange={this.handleChange}
              >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" checked={vegetarian} onChange={this.setVege}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!vegetarian} onChange={this.setVege}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={() => this.props.updatePizza(this.state)}>Submit</button>
          </div>
        </div>
    )
  }
}

export default PizzaForm
