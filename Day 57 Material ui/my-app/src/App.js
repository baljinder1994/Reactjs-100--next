import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage() {
  return(
  <>
  <Button color="secondary">Secondary</Button>
<Button variant="contained" color="success">
  Success
</Button>
<Button variant="outlined" color="error">
  Error
</Button>
</>
  )
}