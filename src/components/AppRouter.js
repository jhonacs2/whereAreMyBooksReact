import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { CategoriasPage } from './CategoriasPage';
import { HomePage } from './HomePage';
import { LibrosPage } from './LibrosPage';
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
                            <Route exact path="/categorias" component={CategoriasPage} />
                            <Route exact path="/libros" component={LibrosPage} />
                            <Redirect to="/" />
                        </Switch>

                    </div>
            
            </div>
        </Router>
        
    )
}
