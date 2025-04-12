import React from 'react';
import { Button, Dialog, useTheme, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { tokens } from '../theme';

const DeleteModal = ({ open, onClose, onConfirm, word, }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
     
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: colors.primary[400],
                    borderRadius: '8px',
                    border: `1px solid ${colors.customAccent.main}`,
                    minWidth: '400px',
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: colors.grey[100],
                    borderBottom: `2px solid ${colors.customAccent.main}`,
                    padding: '20px',
                }}
            >
                Confirm Delete
            </DialogTitle>
            <DialogContent sx={{ padding: '20px' }}>
                <DialogContentText
                    sx={{
                        color: colors.grey[300],
                        fontSize: '16px',
                        marginTop: '10px',
                    }}
                >
                    Are you sure you want to delete this {word}? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    padding: '20px',
                    borderTop: `1px solid ${colors.grey.border}`,
                    gap: '10px',
                }}
            >
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        backgroundColor: colors.blueAccent[500],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '8px 20px',
                        '&:hover': {
                            backgroundColor: colors.blueAccent[600],
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        backgroundColor: colors.redAccent[500],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '8px 20px',
                        '&:hover': {
                            backgroundColor: colors.redAccent[600],
                        },
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;

