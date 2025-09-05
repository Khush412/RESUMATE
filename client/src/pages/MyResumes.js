import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { useAuth } from '../contexts/AuthContext';

export default function MyResumes() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    setLoading(true);
    api.get(`/resumes/user/${user.id}`)
      .then((res) => {
        setResumes(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch resumes:', err);
        setError('Failed to load resumes. Please try again.');
        setLoading(false);
      });
  }, [user]);

  return (
    <Box
      sx={{
        px: 3,
        pt: { xs: 12, sm: 14 }, // padding top to avoid navbar overlap (adjust if navbar height changes)
        maxWidth: 900,
        mx: 'auto',
        minHeight: '80vh',
        fontFamily: (theme) => theme.typography.fontFamily,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          My Resumes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/resumes/new')}
        >
          Create New Resume
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
          {error}
        </Typography>
      ) : resumes.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          You have no resumes yet. Click "Create New Resume" to get started!
        </Typography>
      ) : (
        <Paper elevation={3}>
          <List>
            {resumes.map(({ _id, title, updatedAt }, index) => (
              <ListItem
                key={_id}
                button
                onClick={() => navigate(`/resumes/${_id}/edit`)}
                divider={index !== resumes.length - 1}
                sx={{ '&:hover': { bgcolor: 'action.hover' } }}
              >
                <ListItemText
                  primary={title}
                  secondary={`Last updated: ${new Date(updatedAt).toLocaleString()}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => navigate(`/resumes/${_id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
