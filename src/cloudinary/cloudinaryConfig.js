import cloudinary from "cloudinary/lib/cloudinary";
import { configuration } from 'cloudinary-react';

configuration({
  cloudName: import.meta.env.VITE_CLOUD_NAME
});


cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUD_API_KEY,
  api_secret: import.meta.env.VITE_CLOUD_API_SECRET,
});


