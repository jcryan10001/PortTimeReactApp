import React, { Component } from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            cityWeather: null,
            loading: false,
            date: new Date(),
            timerID: null // add timerID to state
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        const timerID = setInterval(this.tick, 1000); // store timerID in state
        this.setState({ timerID });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    async handleSearchSubmit(event) {
        event.preventDefault();

        try {
            this.setState({ loading: true }); // Start loading

            const response = await fetch(`City/GetWeather?cityName=${this.state.searchQuery}`);
            const data = await response.json();

            if (response.status === 400 || response.status === 404) {
                throw new Error('City not found!');
            }

            const cityWeather1 = {
                ...data,
                localTime: data.localTime, // Convert the string to a Date object
            };

            this.setState({ cityWeather: cityWeather1, loading: false, date: new Date(cityWeather1.localTime) });
        } catch (error) {
            console.error(error);
            alert('City not found!');
            this.setState({ loading: false, cityWeather: null });
        }
    }

    startTimer() {
        this.intervalID = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick(){
        if (this.state.cityWeather) {
            const date = new Date(this.state.date);
            date.setSeconds(date.getSeconds() + 1);
            this.setState({
                date: date,
            });
        }
        
    }
    render() {
        const { cityWeather, loading, date } = this.state;

        return (
            <div>
                <h1>Port Time - A React app</h1>
                <form onSubmit={this.handleSearchSubmit}>
                    <label>
                        City:
                        <input type="text" value={this.state.searchQuery} onChange={this.handleSearchChange} />
                    </label>
                    <button type="submit">Search</button>
                </form>
                {loading ? (
                    <p>Loading...</p>
                ) : cityWeather? (
                    <table>
                        <tbody>
                            <tr>
                                <td>City</td>
                                <td>{cityWeather.city}</td>
                            </tr>
                            <tr>
                                    <td>Region</td>
                                    <td>{cityWeather.region}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{cityWeather.country}</td>
                            </tr>
                            <tr>
                                    <td>Local Time</td>
                                    <td>{date.toLocaleTimeString()}</td>
                            </tr>
                            <tr>
                                    <td>Temperature</td>
                                    <td>{cityWeather.temperature}&#176;C</td>
                            </tr>
                            <tr>
                                <td>Sunrise</td>
                                <td>{new Date(cityWeather.sunrise).toLocaleTimeString()}</td>
                            </tr>
                            <tr>
                                <td>Sunset</td>
                                <td>{new Date(cityWeather.sunset).toLocaleTimeString()}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : null}
            </div>
        );
    }
}
