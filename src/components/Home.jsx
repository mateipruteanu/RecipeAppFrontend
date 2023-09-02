import React from "react";
import Sidebar from "./Sidebar.jsx";
import Feed from "./Feed.jsx";
import {Box, Stack} from "@mui/material";
import Navbar from "./Navbar.jsx";

// function Home() {
//     const signOut = useSignOut();
//     const navigate = useNavigate();
//     const isAuthenticated = useIsAuthenticated();
//     const authHeader = useAuthHeader();
//     const [loading, setLoading] = React.useState(true);
//     const [recipes, setRecipes] = React.useState([]);
//
//     class Ingredient {
//         constructor(id, name, quantity) {
//             this.name = name;
//             this.quantity = quantity;
//         }
//     }
//
//     class Recipe {
//         constructor(id, name, description, instructions, recipeIngredients) {
//             this.id = id;
//             this.name = name;
//             this.description = description;
//             this.instructions = instructions;
//             this.recipeIngredients = recipeIngredients;
//         }
//     }
//
//     useEffect(() => {
//         const getRecipes = async () => {
//
//             const jwt = prepareJWT(authHeader());
//             try {
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${jwt}`,
//                     }
//                 }
//                 const response = await axios.get(
//                     "http://localhost:8080/api/recipes/",
//                     config
//                 );
//                 console.log("Response: ", response);
//                 return response;
//             } catch (err) {
//                 console.log("Error: ", err);
//                 return {
//                     status: 500,
//                 };
//             }
//         }
//         getRecipes().then(response => {
//             if(response.status === 200) {
//                 setRecipes(RecipesToObjects(response.data));
//                 setLoading(false);
//             }
//             else
//                 console.log("Error: ", response);
//         });
//     }, [])
//
//     const logout = () => {
//         try {
//             axios.post("http://localhost:8080/api/auth/logout").then((response) => {
//                 console.log("Logout response: ", response);
//             });
//         } catch (err) {
//             console.log("Error: ", err);
//         }
//
//         signOut();
//         navigate("/login");
//     };
//
//     if(loading)
//         return (
//             <Container >
//                 <Typography variant="h3">Welcome Home</Typography>
//                 <div>{isAuthenticated() ?
//                     <Button onClick={logout}>
//                         Logout
//                     </Button> :
//                     <Button onClick={() => navigate("/login")}>
//                         Login
//                     </Button>}
//                 </div>
//                 <br />
//                 <Stack spacing={2}>
//                     <Typography variant="h3">Loading...</Typography>
//                 </Stack>
//             </Container>
//         );
//     return (
//         <Container >
//             <Typography variant="h3">Welcome Home</Typography>
//             <div>{isAuthenticated() ?
//                 <Button onClick={logout}>
//                     Logout
//                 </Button> :
//                 <Button onClick={() => navigate("/login")}>
//                     Login
//                 </Button>}
//             </div>
//             <br />
//             <Stack spacing={2}>
//                 {recipes.map((recipe) => {
//                     return (
//                         <CustomCard
//                             key={recipe.id}
//                             name={recipe.name}
//                             subheader="Recipe"
//                             description={recipe.description}
//                             instructions={recipe.instructions}
//                             recipeIngredients={recipe.recipeIngredients}
//                         />
//                     )
//                 })
//                 }
//             </Stack>
//         </Container>
//     );
// }
//
// export { Home };


function Home() {
    return (
        <Box>
            <Navbar />
            <Stack direction={"row"} spacing={2} justify-content="space-between">
                <Sidebar />
                <Feed />
            </Stack>
        </Box>
    )
}

export {Home};