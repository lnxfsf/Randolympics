import { CardContent, Grid, Typography, OutlinedInput, InputAdornment, Button, CircularProgress } from "@mui/material";

import { useTranslation } from "react-i18next";

const DonationInput = ({ amount, handleChange, handleSubmit, isLoading, error }) => {
    
    const { t } = useTranslation(); 

   return (
    <div className="mb-4">
        <Grid container spacing={0} justifyContent={"center"} >
          
          

            {/* <Grid item xs={6}> */}
            <Grid item xs={0} width={"53%"}>
               
               
                <Grid container spacing={2}>


                    <Grid item xs={12}>
                        <OutlinedInput
                            type="number"

                            value={amount}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start" sx={{fontFamily: "'Lexend', sans-serif",}}>$</InputAdornment>}
                            fullWidth

                            inputProps={{ min: 1 }}

                            sx={{
                                fontFamily: "'Lexend', sans-serif",
                                // Hide arrows for WebKit browsers (Chrome, Safari, Edge, Opera)
                                'input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                'input[type=number]::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                // Hide arrows
                                'input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" type="submit"  onClick={handleSubmit} disabled={isLoading}
                        
                        style={{ textTransform: "none" }}
                        disableElevation
                        sx={{
                            
                          height: "50px",
                          bgcolor: "#D24949",
            
                          color: "#fff",
                          borderRadius: 3,
                          border: `1px solid #D24949`,
                          "&:hover": {
                            background: "rgba(210, 73, 73, 1)",
                            color: "white",
                            border: `1px solid rgba(210, 73, 73, 1)`,
                          },
                        }}
                        
                        >

                            <span className="lexend-font ">{isLoading ? <CircularProgress size="1.5rem"/> : t("campaign.content18")}</span>

                        </Button>
                        {error && <Typography variant="alert">{t("campaign.content128")}</Typography>}
                    </Grid>


                </Grid>
            </Grid>
        </Grid>
    </div>)
    
                    };
export default DonationInput;