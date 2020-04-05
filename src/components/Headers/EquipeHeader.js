import React from "react";

// reactstrap components
import { Container } from "reactstrap";

import {Box} from '@material-ui/core';

// core components
import { Link as ScrollLink } from "react-scroll";

function EquipeHeader() {
    return (
        <>
            <Box display="flex">
                <Box flex={1} className="page-header section-dark"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/bg-header-02.webp") + ")",
                        backgroundSize: 'cover',
                    }}>

                </Box>
                <Box flex={1} style={{backgroundColor: 'white'}}>

                </Box>
            </Box>
             </>
    );
}

export default EquipeHeader;
