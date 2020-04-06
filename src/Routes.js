import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// pages

import HomePage from "screens/HomePage";
import EquipePage from "screens/EquipePage";
import GalleryPage from "screens/GalleryPage";
// others

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/equipe" component={EquipePage} />
                <Route exact path="/gallery" component={GalleryPage} />
             
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;