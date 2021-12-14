// import React from "react";
// import Button from "@material-ui/core/Button";
// import { Link } from "react-router-dom";
// import img1 from "../../images/images.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./home.css";

// export default function Home() {
//   return (
//     <div className="hero">
//       <div className="container">
//         <br></br>

//         <div className="row align-items-center text-center text-md-left">
//           <div className="col-lg-4">
//             <h1 className="mb-3 display-2">CHAT APPLICATION</h1>
//             <p>
//                 <br></br>
//               Write your own Blog !! Express your feelings!! Save Your Blogs !!
//               Join with us! Login or Register.
//             </p>
//             <Link to="/sign-up">
//               <Button variant="contained" color="primary">
//                 Register
//               </Button>
//             </Link>

//             <br></br>
//             <br></br>
//             <Link to="/sign-in">
//               <Button variant="contained" color="primary">
//                 Login
//               </Button>
//             </Link>
//           </div>

//           <div className="col-lg-8">
//           <br></br>
//             <img src={img1} className="img-fluid" alt="img" width={600}/>
//           </div>
//         </div>
//       </div>

//       <br></br>
//     </div>
//   );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={20}>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}