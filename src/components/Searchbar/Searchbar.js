import { Component } from "react";
import { ImSearch } from "react-icons/im";
import '../../styles.css';

export class Searchbar extends Component {
   
    state = {
        query: '',
    }
    
    handleChange = event => this.setState({ query: event.currentTarget.value.toLowerCase() });

    handleSubmit = event => {
        event.preventDefault();
        const { query } = this.state;

        if (query.trim() === '') {
            alert('Please fill out the search field!');
            return;
        }

        this.props.onSubmit(query);
        this.setState({ query: '' });
    }

    render() { 
        const { query } = this.state;

        return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <ImSearch />
                    {/* <span className="SearchForm-button-label">Search <TbSearch /></span> */}
                </button>

                <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={ this.handleChange}
                />
            </form>
        </header>
    )
    }
}


