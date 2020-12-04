import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from 'modules/dashboard/components/GlobalStyles'
import '../node_modules/react-perfect-scrollbar/dist/css/styles.css'
import 'modules/dashboard/mixins/chartjs'
import theme from 'modules/dashboard/theme'
import routes from './Routes'
import { SnackbarProvider } from 'notistack'


const App = () => {
  const routing = useRoutes(routes)

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>

        <GlobalStyles />
        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
