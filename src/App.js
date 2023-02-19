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
  const a = ['wsqs', 'stcxxxxxcate2'];
  const modState = useState(a);
  return <ModContext.Provider value={modState}>{children}</ModContext.Provider>;
}

function useModState(putIndex) {
  const value = useContext(ModContext);
  const a = ModContext;
  if (value === undefined) {
    throw new Error('error');
  }
  const index = putIndex;
  return [ value[0][index],
    (newValue) => {
      const newArray = [...value[0]];
      newArray[index] = newValue;
      value[1](newArray);
    },
  ];
}




function Box(props) {
  const [bindingQ, setBindingQ] = useModState();

  return (
    <>
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
      </Container>
      <Container>
        <TransForm></TransForm>
      </Container>
    </>
  );
}

function Form(props) {
  const [bindingQ, setBindingQ] = useModState(0);
  const [transQ, setTransQ] = useModState();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const originQ = event.target.originQ.value;
        props.onForm(originQ);
        setTransQ('번역');
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
  const [bindingQ, setBindingQ] = useModState(0);
  const [transQ, setTransQ] = useModState(1);
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

function TransForm() {
  const [transQ, setTransQ] = useModState();
  return (
    <form
      onSubmit={(event) => {
        const LocalTransQ = event.target.transQ.value;
        event.preventDefault();
        setTransQ(LocalTransQ);
        console.log(transQ, 'transQ');
      }}
    >
      <p>
        <Input
          required
          type="text"
          name="transQ"
          placeholder="영어로 직접 입력 가능"
          value={transQ || ''}
          onChange={(event) => {
            setTransQ(event.target.value);
          }}
        />
      </p>
      <p>
        <Button variant="outlined" type="submit">
          ai에게 질문
        </Button>
      </p>
    </form>
  );
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
