import { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type operation = "+" | "-" | "*" | "/" | "^"
export default function Calculator() {
  const [number1, setNumber1] = useState<number | undefined>();
  const [operation, setOperation] = useState<operation>();
  const [number2, setNumber2] = useState<number | undefined>();
  const [result, setResult] = useState<number | undefined>();

  const handleTypeNumber = (number: number) => {
    if (operation == undefined) {
      if (number1) {
        setNumber1(Number(String(number1) + String(number)))
      } else {
        setNumber1(number)
      }
    } else {
      if (number2) {
        setNumber2(Number(String(number2) + String(number)))
      } else {
        setNumber2(number)
      }
    }
  }
  const handleTypeOperation = (operation: operation) => {
    if (number1) {
      setOperation(operation)
    }
  }
  const handleClear = () => {
    setNumber1(undefined);
    setOperation(undefined);
    setNumber2(undefined);
    setResult(undefined);
  }
  const handleEqual = () => {
    if (number1 && number2 && operation) {
      switch (operation) {
        case "+":
          setResult(number1 + number2);
          break;
        case "-":
          setResult(number1 - number2);
          break;
        case "*":
          setResult(number1 * number2);
          break;
        case "/":
          setResult(number1 / number2);
          break;
        default:
          setResult(number1 + number2);
          break;
      }
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 150 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between"}}>
        <Stack direction="row">
          <Typography>{number1}</Typography>
          <Typography>{operation}</Typography>
          <Typography>{number2}</Typography>
        </Stack>
        <Typography sx={{ fontWeight: "bold" }}>{result}</Typography>
      </Stack>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleClear()}>Clr</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeOperation("/")}>/</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeOperation("*")}>*</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeOperation("-")}>-</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(7)}>7</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(8)}>8</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(9)}>9</Button></TableCell>
            <TableCell rowSpan={2}><Button variant="contained" fullWidth onClick={() => handleTypeOperation("+")}>+</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(4)}>4</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(5)}>5</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(6)}>6</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(1)}>1</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(2)}>2</Button></TableCell>
            <TableCell><Button variant="contained" fullWidth onClick={() => handleTypeNumber(3)}>3</Button></TableCell>
            <TableCell rowSpan={2}><Button variant="contained" fullWidth onClick={() => handleEqual()}>=</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}><Button variant="contained" fullWidth onClick={() => handleTypeNumber(0)}>0</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
