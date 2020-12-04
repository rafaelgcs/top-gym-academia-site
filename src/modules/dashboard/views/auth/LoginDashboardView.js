import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core'
import Page from '../../components/Page'
import { api } from 'services/api'
import { login } from 'services/admin/auth'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}))

const LoginDashboardView = () => {
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles()
    const navigate = useNavigate()

    const onSubmitLoginForm = (data, ev) => {
        let send = data
        send.remember = true
        api.post('/auth/login/admin', send).then((response) => {
            if (response.status === 200) {
                let res = response.data

                if (res.success) {
                    if (login(res.data.user, res.data.access_token, res.data.expires_in, res.data.remember_user)) {
                        window.location.href = '/admin'
                    } else {
                        enqueueSnackbar("Aconteceu um erro, tente novamente mais tarde!", { variant: 'danger' })
                    }
                } else {
                    enqueueSnackbar("Usuário e/ou senha incorretos!", { variant: 'warning' })
                }
            }
        }).catch((error) => {
            enqueueSnackbar("Aconteceu um erro, tente novamente mais tarde!", { variant: 'danger' })
        })

    }

    return (
        <Page
            className={classes.root}
            title="Login | Admin - Top Gym Academia"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Insira um e-mail válido.').max(255).required('É obrigatório inserir o E-mail.'),
                            password: Yup.string().max(40).required('É obrigatório inserir a senha.')
                        })}
                        onSubmit={onSubmitLoginForm}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box mb={3}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h2"
                                        >
                                            Efetue o login
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="body2"
                                        >
                                            Login na plataforma de administração da loja virtual.
                                        </Typography>
                                    </Box>
                                    <Box
                                        mt={3}
                                        mb={1}
                                    >
                                        <Typography
                                            align="center"
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            Preencha o formulário abaixo
                                        </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="E-mail"
                                        margin="normal"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="email"
                                        value={values.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label="Senha"
                                        margin="normal"
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.password}
                                        variant="outlined"
                                    />
                                    <Box my={2}>
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Entrar Agora
                                        </Button>
                                    </Box>
                                </form>
                            )}
                    </Formik>
                </Container>
            </Box>
        </Page>
    )
}

export default LoginDashboardView
