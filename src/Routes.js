import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons";
import LandingPage from "views/examples/LandingPage";
import ProfilePage from "views/examples/ProfilePage";
import RegisterPage from "views/examples/RegisterPage";
import HomePage from "screens/HomePage";
import EquipePage from "screens/EquipePage";
// others

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/equipe" component={EquipePage} />
                <Route exact path="/profile" component={ProfilePage} />
             
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;