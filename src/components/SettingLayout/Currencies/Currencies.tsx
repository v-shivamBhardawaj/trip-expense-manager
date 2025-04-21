import { Box, Typography } from '@mui/material';

const Currencies = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Currencies
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage your currencies here.
      </Typography>
    </Box>
  );
}
export default Currencies;