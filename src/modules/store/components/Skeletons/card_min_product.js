import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const CardMinProduct = () => {

    return (
        <Grid container wrap="nowrap">
            <Box width={'100%'} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={'100%'} height={118} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </Box>
        </Grid>
    )
}

export default CardMinProduct