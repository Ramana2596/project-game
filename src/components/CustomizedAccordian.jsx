import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ accordianList }) {
    const [expandedPanels, setExpandedPanels] = React.useState({});

    const handleChange = (panel) => (event, newExpanded) => {
        setExpandedPanels((prevExpandedPanels) => ({
            ...prevExpandedPanels,
            [panel]: newExpanded,
        }));
    };

    return (
        <div>
            {accordianList?.map((accordion, index) => {
                const { headerValue, contentValue } = accordion;
                const panelId = `panel${index + 1}`;
                return (
                    <Accordion
                        key={panelId}
                        expanded={expandedPanels[panelId] || false}
                        onChange={handleChange(panelId)}
                    >
                        <AccordionSummary
                            aria-controls={`${panelId}-content`}
                            id={`${panelId}-header`}
                        >
                            <Typography className='accordian-title' component="span">{headerValue}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {contentValue}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
}
