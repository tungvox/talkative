import { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Box, InputAdornment } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createVehicle } from '../utils/api';

const CreateVehicle = ({ onClose }: { onClose: () => void }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [power, setPower] = useState('');
  const [fueltype, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [vehicletype, setVehicleType] = useState('');
  const [bodymodel, setBodyModel] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('make', make);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('mileage', mileage);
      formData.append('price', price);
      formData.append('power', power);
      formData.append('fueltype', fueltype);
      formData.append('transmission', transmission);
      formData.append('vehicletype', vehicletype);
      formData.append('bodymodel', bodymodel);
      formData.append('location', location);
      formData.append('description', description);
      images.forEach((image) => formData.append('images', image));

      await createVehicle(formData);
      onClose();
      router.push('/my-listings');
    } catch (error) {
      setError('Failed to create vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create Vehicle
      </Typography>
      <TextField
        label="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mileage"
        value={mileage}
        onChange={(e) => setMileage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <TextField
        label="Power (hp)"
        value={power}
        onChange={(e) => setPower(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fuel Type"
        value={fueltype}
        onChange={(e) => setFuelType(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Transmission"
        value={transmission}
        onChange={(e) => setTransmission(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Vehicle Type"
        value={vehicletype}
        onChange={(e) => setVehicleType(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Body Model"
        value={bodymodel}
        onChange={(e) => setBodyModel(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Images
        </Button>
      </label>
      {images.length > 0 && <Typography>{images.length} image(s) selected</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Create Vehicle'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateVehicle;
