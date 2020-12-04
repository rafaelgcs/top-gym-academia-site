import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from '../../../components/Page'
import Profile from './Profile'
import ProfileDetails from './ProfileDetails'
import PasswordRecover from './PasswordRecover'
import { getUser } from 'services/admin/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const Account = () => {
  const classes = useStyles()
  const [user, setUser] = useState({})

  useEffect(() => {
    let nUser = getUser()

    setUser(nUser)
  }, [])

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile user={user} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails user={user} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <PasswordRecover user={user} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Account
