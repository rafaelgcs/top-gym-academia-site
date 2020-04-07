import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// pages

import HomePage from "screens/HomePage";
import EquipePage from "screens/EquipePage";
import GalleryPage from "screens/GalleryPage";
import Error404 from "screens/errors/404";
// others

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/equipe" component={EquipePage} />
                <Route exact path="/gallery" component={GalleryPage} />
             
                <Route path="*" component={Error404} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;