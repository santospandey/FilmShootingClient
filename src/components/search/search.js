import React, { Component } from "react";
import Select from "react-select";

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            data: [
                { value: 'all', label: 'all'},
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
            ]
        }

        this.handleChange = this.handleChange.bind(this);
    }    

    componentDidMount(){
        const films = this.props.data.map(film=>{
            return {
                label: film.title,
                value: film.id
            }
        });

        const allFilms = [
            ...films,
            {
                label: "All Films",
                value: "all"
            }
        ];

        this.setState({
            data: allFilms
        });
    }

    handleChange(event) {
        console.log(event);
        this.setState({
            selectedOption: (event.value === 'all')? null: event
        })  
        
        this.props.setFilms(event.value);      
    }

    render() {
        return (
            <div style={{position:"relative", zIndex: 10000}}>
                <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.data}
                />
            </div>
        )
    }
}

export default SearchComponent;