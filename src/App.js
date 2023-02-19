import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Button,
  ButtonGroup,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function Box(){
  return <Container sx={{ border: 1, padding:2, borderColor: 'divider' }}>
  <Grid Container>
      <Grid item xs={2}>   
      질문 입력<br/>    
      <FormProvider><Form></Form></FormProvider>
      </Grid>
      <Grid item xs={10}> 
      추천 질문<br/><br/> 
      <ButtonGroup variant="outlined" aria-label="outlined button group">
      <ButtonForm></ButtonForm>
      </ButtonGroup></Grid>  
  </Grid>
  </Container>
}

function Form(){

}

function ButtonForm(){
  
}


export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
