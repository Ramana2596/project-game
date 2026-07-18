import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import {
    colors,
    semanticTypo,
} from "../../../ux/styles";

const WelcomeFooter = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                pt: 6,
                pb: 4,
                borderTop: `1px solid ${colors.divider}`,
                background: colors.panelGradient,
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={3}
                    alignItems="flex-end"
                >
                    <Grid item xs={12} md={6}>
                        <Typography
                            component="h2"
                            variant="h2"
                            sx={{
                                ...semanticTypo.pageH4,
                                color: colors.primaryDark,
                                mb: 2,
                            }}
                        >
                            Contact Us
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 1.25,
                            }}
                        >
                            <EmailIcon
                                sx={{
                                    color: colors.subtitle,
                                }}
                            />

                            <Typography
                                component="p"
                                sx={{
                                    ...semanticTypo.bodyB2,
                                }}
                            >
                                info@omtp.example
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <PhoneIcon
                                sx={{
                                    color: colors.subtitle,
                                }}
                            />

                            <Typography
                                component="p"
                                sx={{
                                    ...semanticTypo.bodyB2,
                                }}
                            >
                                +91 00000 00000
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            textAlign: {
                                xs: "left",
                                md: "right",
                            },
                        }}
                    >
                        <Typography
                            component="small"
                            sx={{
                                ...semanticTypo.caption,
                                display: "block",
                                color: colors.subtitle,
                            }}
                        >
                            © {new Date().getFullYear()} OMTP Learning     —   All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WelcomeFooter;