import React from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Toolbar from 'react-md/lib/Toolbars/Toolbar'
import Button from 'react-md/lib/Buttons/Button'

export default function Mobile(props) {
  return (
    <Grid style={{ height: '100vh'}}>
      <Cell size={4}></Cell>
      <Cell size={4}>
        <Toolbar
          id="fixed-toolbar-example"
          fixed
          colored
          nav={(
            <Button
              key="nav"
              icon
              onClick={() => {}}
            >
              menu
            </Button>
          )}
          actions={(
            <Button
              key="action"
              icon
              onClick={() => {}}
            >
              search
            </Button>
          )}
          title="Fake News"
          titleId="search-pastries"
        />
      </Cell>
      <Cell size={4}></Cell>
    </Grid>
  )
}