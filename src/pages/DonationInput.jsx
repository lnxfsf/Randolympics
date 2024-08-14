import { CardContent, Grid, Typography, OutlinedInput, InputAdornment, Button, CircularProgress } from "@mui/material";


const DonationInput = ({ amount, handleChange, handleSubmit, isLoading, error }) => (

    <CardContent>
        <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography>Donate</Typography>
            </Grid>


            {/* <Grid item xs={6}> */}
            <Grid item xs={7}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OutlinedInput
                            type="number"

                            value={amount}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            fullWidth

                            inputProps={{ min: 1 }}

                            sx={{
                                // Hide arrows for WebKit browsers (Chrome, Safari, Edge, Opera)
                                'input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                'input[type=number]::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                // Hide arrows for Firefox
                                'input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" type="submit" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : 'Donate'}
                        </Button>
                        {error && <Typography variant="alert">Something went wrong</Typography>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </CardContent>);
export default DonationInput;