import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {}
}));

const PasswordRecover = ({ className, ...rest }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        password_confirmation: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Card>
                <CardHeader
                    subheader="Basta inserir a nova senha, para atualizar"
                    title="Alteração de senha"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Altere com cuidado e não esqueça dessa senha. ;)"
                                label="Nova Senha"
                                name="password"
                                onChange={handleChange}
                                required
                                value={values.password}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Confirmação de Nova Senha"
                                name="password_confirmation"
                                onChange={handleChange}
                                required
                                value={values.password_confirmation}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Alterar Senha
                    </Button>
                </Box>
            </Card>
        </form>
    );
};

PasswordRecover.propTypes = {
    className: PropTypes.string
};

export default PasswordRecover;
