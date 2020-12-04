import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
import Page from 'modules/dashboard/components/Page'
import { login } from 'services/store/auth';
import { api } from 'services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginViewStore = () => {
  const classes = useStyles();
  const navigate = useNavigate()

  const onSubmitLoginForm = (data, ev) => {
    let send = data
    send.remember = true
    api.post('/auth/login/client', send).then((response) => {
      if (response.status === 200) {
        let res = response.data

        if (res.success) {
          if (login(res.data.user, res.data.access_token, res.data.expires_in, res.data.remember_user)) {
            window.location.href = '/loja'
          } else {
            ev.resetForm()
          }
        } else {
          ev.resetForm()
        }
      }
    }).catch((error) => {
      ev.resetForm()
    })
  }

  return (
    <Page
      className={classes.root}
      title="Login"
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
              email: 'Insira seu e-mail',
              password: 'Insira sua senha'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Insira um e-mail válido').max(255).required('O campo de e-mail é obrigatório.'),
              password: Yup.string().max(255).required('O campo de senha é obrigatório')
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
                      Entrar em sua conta
                  </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Efetue o login para finalizar as compras ;)
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
                      Entrar agora
                  </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Ainda não tem uma conta?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/loja/register"
                      variant="h6"
                      color="textSecontady"
                    >
                      Cadastre-se Agora
                    </Link>
                  </Typography>
                </form>
              )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginViewStore;
