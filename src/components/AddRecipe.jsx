import {Box, Fab, Modal, Stack, styled, TextField, Tooltip, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useState} from "react";

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

function AddRecipe() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip onClick={()=>setOpen(true)} title={"Add recipe"} sx={{position:"fixed", bottom:20, left:{xs:"calc(50% - 25px)", md:30}}}>
                <Fab color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>

            <StyledModal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={400} height={280} bgcolor={"white"} p={3} borderRadius={5}>
                    <Typography variant={"h6"} sx={{color:"gray", textAlign:"center"}}>Add a new recipe</Typography>
                    <Stack gap={2}>
                        <TextField id="recipe-name" label="Name"/>
                        <TextField id="recipe-description" label="Description"/>
                        <TextField
                            id="recipe-instructions"
                            label="Instructions"
                            multiline
                            maxRows={4}
                        />
                    </Stack>

                </Box>
            </StyledModal>

        </>
    )
}

export default AddRecipe;