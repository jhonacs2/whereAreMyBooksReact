import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { HomePage } from './HomePage';
import { NavBar } from './Navbar';
import { PersonaPage } from './PersonaPage';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <NavBar />
                    <div className='container'>
                        <Switch>
                            <Route exact path ='/' component={HomePage}/>
                            <Route exact path="/persona" component={PersonaPage} />
                            <Redirect to="/" />
                        </Switch>

                    </div>
            
            </div>
        </Router>
        
    )
}
