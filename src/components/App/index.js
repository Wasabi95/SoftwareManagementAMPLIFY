import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";

import Dashboard from "../Dashboard"; 

const App = ( { signOut } ) => {
  return (
    <div>
     
      <Dashboard /> 
      
    </div>
  );
};

export default withAuthenticator(App);


// import "@aws-amplify/ui-react/styles.css";
// import {
//   withAuthenticator,
//   Button,
//   Heading,
//   Image,
//   View,
//   Card,
// } from "@aws-amplify/ui-react";

// function App({ signOut }) {
//   return (
//     <View className="App">
//       <Card>
        
//         <Heading level={1}>We now have Auth!</Heading>
//       </Card>
//       <Button onClick={signOut}>Sign Out</Button>
//     </View>
//   );
// }

// export default withAuthenticator(App);