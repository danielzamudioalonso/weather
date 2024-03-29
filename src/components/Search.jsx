import React, { useEffect, useState } from "react";

import ShowWeather from './ShowWeather';

import {
    Grid,
    InputBase,
    Button
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        marginTop: '5%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '32ch',
            '&:focus': {
                width: '44ch',
            },
        },
    },
}));

const Search = () => {
    const classes = useStyles();
    const [weather, setWeather] = useState([]);
    const [form, setForm] = useState('');
    const [coords, setCoords] = useState([]);

    const APIKEY = "97d1e48a8581a7e639d18230874546d6";

    async function weatherData(e) {
        e.preventDefault();
        if (form.city === "") {
            alert("Add values");
        } else {
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${form}&APPID=${APIKEY}&lang=es`
            ).then((res) => res.json()).then((data) => data);
            setWeather({ data: data });
        }
    }

    function handleChange(e) {
        setForm(e.target.value);
    }

    function weatherDataLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCoords(position.coords)
        });
    }

    useEffect(() => {
        if (coords.latitude) {
            async function weatherDataCoords() {
                const data = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${APIKEY}&lang=es`
                ).then((res) => res.json()).then((data) => data);
                setWeather({ data: data });
            }

            weatherDataCoords();
        }
    }, [coords])

    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Ciudad"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'Ciudad' }}
                            onChange={handleChange}
                        />
                        <Button
                            onClick={weatherData}
                        >Buscar</Button>
                    </div>
                </Grid>
                <Grid item >
                    <div className={classes.search}>
                        <Button onClick={weatherDataLocation}>Buscar por localización</Button>
                    </div>
                </Grid>
            </Grid>

            <ShowWeather data={weather} />
        </div>
    );
}

export default Search;