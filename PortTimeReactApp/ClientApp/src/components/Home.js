import React, { Component } from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            cityWeather: null,
            loading: false,
            localTime: new Date(),
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
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

            const cityWeather = {
                ...data,
                localTime: data.localTime, // Convert the string to a Date object
            };

            this.setState({ cityWeather: cityWeather, loading: false });
        } catch (error) {
            console.error(error);
            alert('City not found!');
            this.setState({ loading: false });
        }
    }

    startTimer() {
        this.intervalID = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick() {
        const { cityWeather } = this.state;
        if (cityWeather) {
            const localTime = new Date(cityWeather.localTime);
            localTime.setSeconds(localTime.getSeconds() + 1);
            this.setState({ localTime });
        }
    }
    render() {
        const { cityWeather, loading, localTime } = this.state;

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
                ) : cityWeather ? (
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
                                    <td>{localTime ? new Date(localTime).toLocaleTimeString() : ''}</td>
                            </tr>
                            <tr>
                                <td>Temperature</td>
                                <td>{cityWeather.temperature}</td>
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
