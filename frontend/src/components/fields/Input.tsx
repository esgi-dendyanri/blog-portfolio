
import {
  TextField,
} from "@mui/material";

export default function Input({
  label,
  input,
  meta: { touched, invalid, error },
  meta,
  ...custom
}: any) {
  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )
}