import { Field, reduxForm } from "redux-form"
import Input from '../fields/Input';
import { required, maxLength, minLength } from '../../helper/fieldValidation'
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const validations: any = {
  name: [required, minLength(3)],
  body: [required, minLength(5), maxLength(140)],
}

const validate = (values: any) => {
  let errors: any = {}

  Object.keys(validations).map((name) => {
    validations[name].map((validation: Function) => {
      if ( validation(values[name]) ) {
        errors[name] = validation(values[name])
        return false;
      }
    })
  })

  return errors;
}
const CommentForm = (props: any) => {
  const { handleSubmit, onSubmit } = props;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mb: 4,
        '& .MuiTextField-root': { mt: 1, mb: 1 },
      }}
      autoComplete="off"
    >
      <Typography variant="h5" color="primary">Add comment</Typography>
      <Field
        name="name"
        component={Input}
        label="Name"
        fullWidth
      />
      <Field
        name="body"
        component={Input}
        type="textarea"
        label="Message"
        fullWidth
        rows={4}
        multiline
      />
      <Button type="submit" color="primary" variant="contained">Submit</Button>
    </Box>
  );
}

export default reduxForm({
  form: "comment",
  validate
})(CommentForm);