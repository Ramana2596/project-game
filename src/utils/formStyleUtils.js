// ----------------------------
// formStyleUtils.js
// ----------------------------
// Purpose: Utility module for consistent form styling and layout across screens.
// Usage: Import in any React component to apply standard form, field, button, and container styles.
// Supports laptop, desktop, tablet, and mobile screens.
//
// Example:
// import { formStyle, fieldStyle, buttonBarStyle } from './formStyleUtils';
// <Box sx={formStyle.container}>
//    <TextField sx={fieldStyle.input} />
//    <Box sx={buttonBarStyle.container}>
//       <Button sx={buttonBarStyle.primary}>Save</Button>
//    </Box>
// </Box>
//
// ----------------------------

// Standard container for a form
export const formStyle = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: 2,
    gap: 2, // vertical spacing between children
    boxSizing: "border-box",
  },
};

// Standard field/input styling
export const fieldStyle = {
  input: {
    width: "100%",
    minHeight: "36px",
    marginBottom: 1,
    boxSizing: "border-box",
  },
  dropDown: {
    minHeight: "36px",
    marginBottom: 1,
    width: "100%",
  },
};

// Standard button layout container
export const buttonBarStyle = {
  container: {
    display: "flex",
    justifyContent: "flex-start", // or "flex-end", "space-between"
    gap: 1, // horizontal spacing between buttons
    marginTop: 2,
  },
  primary: {
    height: "40px",
    minWidth: "100px",
  },
  secondary: {
    height: "40px",
    minWidth: "100px",
  },
};

// Standard spacing utilities for layout adjustments
export const layoutSpacing = {
  sectionGap: 2,
  smallGap: 1,
  largeGap: 3,
};

// Utility for responsive height (optional)
export const responsiveHeight = (desktop, tablet, mobile) => ({
  height: {
    xs: mobile, // mobile
    sm: tablet, // tablet
    md: desktop, // desktop
  },
});

// ----------------------------
// End of formStyleUtils.js
// ----------------------------
