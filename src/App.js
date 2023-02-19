import React, { useEffect, useState, useContext, createContext } from 'react';
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

const ModContext = React.createContext();
function ModProvider({ children }) {
  const modState = useState('state1');
  return <ModContext.Provider value={modState}>{children}</ModContext.Provider>;
}

function useModState() {
  const value = useContext(ModContext);
  const a = ModContext;
  if (value === undefined) {
    throw new Error('error');
  }
  return value;
}

function Box(props) {
  const [bindingQ, setBindingQ] = useModState();
  return (
    <Container sx={{ border: 1, padding: 2, borderColor: 'divider' }}>
      <Grid Container>
        <Grid item xs="2">
          질문 입력
          <br />
          <Form
            onForm={(_originQ) => {
              setBindingQ(_originQ);
            }}
          ></Form>
        </Grid>
        <Grid item xs="10">
          추천 질문
          <br />
          <br />
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <ButtonForm></ButtonForm>
          </ButtonGroup>
        </Grid>
      </Grid>
      <div>{bindingQ}</div>
    </Container>
  );
}

function Form(props) {
  const [bindingQ, setBindingQ] = useModState();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const originQ = event.target.originQ.value;
        props.onForm(originQ);
      }}
    >
      <p>
        <Input
          type="text"
          name="originQ"
          placeholder="한글로 질문을 입력해주세요"
          value={bindingQ || ''}
          onChange={(event) => {
            setBindingQ(event.target.value);
          }}
        />
      </p>
      <p>
        <Button variant="outlined" type="submit">
          번역
        </Button>
      </p>
    </form>
  );
}

function ButtonForm(props) {
  const [bindingQ, setBindingQ] = useModState();
  const qArr = ['java', 'spring', 'js'];
  const grouping = () => {
    const result = [];
    for (let i = 0; i < qArr.length; i++) {
      result.push(
        <Button
          variant="outlined"
          key={qArr[i]}
          value={qArr[i]}
          onClick={(event) => {
            event.preventDefault();
            setBindingQ(`What is the ${qArr[i]}?`);
          }}
        >
          {qArr[i]}
        </Button>
      );
    }
    return result;
  };
  return grouping();
}

export default function App() {
  return (
    <div>
      <ModProvider>
        <Box></Box>
      </ModProvider>
    </div>
  );
}
