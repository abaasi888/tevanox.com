import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  InputAdornment,
  Tab,
  Tabs,
  IconButton,
} from '@mui/material';
import {
  Save,
  Visibility,
  VisibilityOff,
  Refresh,
  Business,
  AttachMoney,
  People,
  Email,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useSettings } from '../hooks/useSettings';

const Settings = () => {
  const { settings, loading, fetchSettings, updateSettings } = useSettings();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // General Settings
    site_name: 'TevanoxMovie',
    site_description: 'Movies, Series & Music - Unlimited Entertainment',
    contact_email: 'admin@tevanox.com',
    support_email: 'support@tevanox.com',
    phone: '+256 XXX XXX XXX',
    address: 'Kampala, Uganda',

    // Commission Settings
    tevanox_share: 60,
    network_total: 40,
    level_1: 25,
    level_2: 10,
    level_3: 5,
    agent_commission: 15,

    // Subscription Settings
    currency: 'UGX',
    payment_methods: ['mobile_money', 'visa'],
    mobile_money_providers: ['mtn', 'airtel', 'africell'],
    trial_days: 0,

    // Security Settings
    two_factor_auth: false,
    session_timeout: 30,
    password_policy: 'strong',

    // Email Settings
    smtp_host: '',
    smtp_port: 587,
    smtp_user: '',
    smtp_password: '',
    email_from: 'noreply@tevanox.com',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await fetchSettings();
    if (data) {
      setFormData(data);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      await updateSettings(formData);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update settings');
    }
  };

  const renderGeneralSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Site Name"
          value={formData.site_name}
          onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Contact Email"
          value={formData.contact_email}
          onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Site Description"
          multiline
          rows={2}
          value={formData.site_description}
          onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
    </Grid>
  );

  const renderCommissionSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          label="Tevanox Share (%)"
          value={formData.tevanox_share}
          onChange={(e) => setFormData({ ...formData, tevanox_share: parseFloat(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          label="Network Total (%)"
          value={formData.network_total}
          onChange={(e) => setFormData({ ...formData, network_total: parseFloat(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          type="number"
          label="Level 1 (%)"
          value={formData.level_1}
          onChange={(e) => setFormData({ ...formData, level_1: parseFloat(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          type="number"
          label="Level 2 (%)"
          value={formData.level_2}
          onChange={(e) => setFormData({ ...formData, level_2: parseFloat(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          type="number"
          label="Level 3 (%)"
          value={formData.level_3}
          onChange={(e) => setFormData({ ...formData, level_3: parseFloat(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Alert severity="info">
          Total commission percentages should add up to 100% across all levels.
        </Alert>
      </Grid>
    </Grid>
  );

  const renderSubscriptionSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Currency"
          value={formData.currency}
          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          label="Trial Days"
          value={formData.trial_days}
          onChange={(e) => setFormData({ ...formData, trial_days: parseInt(e.target.value) })}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSubmit}
          sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
        >
          Save Changes
        </Button>
      </Box>

      <Paper sx={{ bgcolor: '#1a1a2e', borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: '1px solid #2a2a3e',
            '& .MuiTab-root': {
              color: '#888',
              '&.Mui-selected': { color: '#FF4757' },
            },
            '& .MuiTabs-indicator': { bgcolor: '#FF4757' },
          }}
        >
          <Tab label="General" />
          <Tab label="Commissions" />
          <Tab label="Subscriptions" />
          <Tab label="Security" />
          <Tab label="Email" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tabValue === 0 && renderGeneralSettings()}
          {tabValue === 1 && renderCommissionSettings()}
          {tabValue === 2 && renderSubscriptionSettings()}
          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.two_factor_auth}
                      onChange={(e) => setFormData({ ...formData, two_factor_auth: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF4757' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#FF4757' },
                      }}
                    />
                  }
                  label="Enable Two-Factor Authentication"
                  sx={{ color: '#fff' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Session Timeout (minutes)"
                  value={formData.session_timeout}
                  onChange={(e) => setFormData({ ...formData, session_timeout: parseInt(e.target.value) })}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                    '& .MuiInputLabel-root': { color: '#888' },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Password Policy"
                  value={formData.password_policy}
                  onChange={(e) => setFormData({ ...formData, password_policy: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                    '& .MuiInputLabel-root': { color: '#888' },
                  }}
                >
                  <MenuItem value="weak">Weak</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="strong">Strong</MenuItem>
                  <MenuItem value="very_strong">Very Strong</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
          {tabValue === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Host"
                  value={formData.smtp_host}
                  onChange={(e) => setFormData({ ...formData, smtp_host: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                    '& .MuiInputLabel-root': { color: '#888' },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="SMTP Port"
                  value={formData.smtp_port}
                  onChange={(e) => setFormData({ ...formData, smtp_port: parseInt(e.target.value) })}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                    '& .MuiInputLabel-root': { color: '#888' },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP User"
                  value={formData.smtp_user}
                  onChange={(e) => setFormData({ ...formData, smtp_user: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                    '& .MuiInputLabel-root': { color: '#888' },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.smtp_password}
                  onChange={(e) => setFormData({ ...formData, smtp_password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff sx={{ color: '#888' }} /> : <Visibility sx={{ color: '#888' }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                    '& .MuiInputLabel-root': { color: '#888' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email From"
                  value={formData.email_from}
                  onChange={(e) => setFormData({ ...formData, email_from: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                    '& .MuiInputLabel-root': { color: '#888' },
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;