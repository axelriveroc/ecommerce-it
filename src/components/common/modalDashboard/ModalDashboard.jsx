import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "../../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./ModalDashboardStyles.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

const ModalDashboard = ({
  open,
  data,
  handleClose,
  disabled,
  setChangesProducts,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 320, sm: 400 },
    bgcolor: "#d3d3d3fa",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    /* backgroundImage: `url(${data.image.url})`, */
    backgroundSize: "cover",
    backgroundPosition: "center",
    maxHeight: "95vh",
    overflowY: "auto",
  };

  // Manipular la imagen ppal con Cloudinary:

  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

  const [imagePpal, setImagePpal] = useState(data.image);
  const [changeImgPpal, setChangeImgPpal] = useState(false);
  const [changeImgPpalFirst, setChangeImgPpalFirst] = useState(false);
  const [changeImgPpalSecond, setChangeImgPpalSecond] = useState(false);
  const [changeImgPpalThird, setChangeImgPpalThird] = useState(false);
  const [imagePpalFirst, setImagePpalFirst] = useState(data.gallery.first);
  const [imagePpalSecond, setImagePpalSecond] = useState(data.gallery.second);
  const [imagePpalThird, setImagePpalThird] = useState(data.gallery.third);

  const handleImageChange = (e) => {
    if (!allowedFileTypes.includes(e.target.files[0].type)) {
      setFieldError(
        "image",
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, jpeg, png, gif y svg."
      );
      setImagePpal("");
      console.error(
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, png, gif y svg."
      );
      return;
    } else {
      setImagePpal(e.target.files[0]); //setFieldValue --> no lo puedo setear xq todavia no es la url de la nube
      setChangeImgPpal(true);
      setFieldError("image", "");
    }
  };

  const handleGalleryImageChange = (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado por el usuario
    const fieldName = event.target.name; // Nombre del campo (ejemplo: "gallery.first", "gallery.second", etc.)

    if (!allowedFileTypes.includes(file.type)) {
      setFieldError(
        fieldName,
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, jpeg, png, gif y svg."
      );
      if (fieldName === "gallery.first") {
        setImagePpalFirst("");
      } else if (fieldName === "gallery.second") {
        setImagePpalSecond("");
      } else {
        setImagePpalThird("");
      }
      console.error(
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, png, gif y svg."
      );
      return;
    } else {
      if (fieldName === "gallery.first") {
        setImagePpalFirst(file);
        setChangeImgPpalFirst(true);
      } else if (fieldName === "gallery.second") {
        setImagePpalSecond(file);
        setChangeImgPpalSecond(true);
      } else {
        setImagePpalThird(file);
        setChangeImgPpalThird(true);
      }
      //setFieldValue(fieldName, file); // Actualizar el estado de Formik con la imagen seleccionada
      setFieldError(fieldName, "");
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!imagePpal) return;

      setFieldError("image", "");
      // formatea la informacion que va a enviar a cloudinary con el objeto formData
      const formData = new FormData();
      formData.append("file", imagePpal);
      formData.append("upload_preset", "r8lr9ctz");
      formData.append("folder", "audiophile-products");

      //envia la info a cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgur5apfu/image/upload",
        formData
      );

      console.log("respuesta cuando cargo mi img a cloudinary: ", response);
      //setimageData();
      setFieldValue("image", {
        url: response.data.secure_url,
        public_id: response.data.public_id,
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleGalleryImageUpload = async (fieldName) => {
    try {
      // Obtener la imagen seleccionada del estado de Formik
      if (fieldName === "first") {
        if (!imagePpalFirst) return;
      } else if (fieldName === "second") {
        if (!imagePpalFirst) return;
      } else {
        if (!imagePpalFirst) return;
      }

      setFieldError(`gallery.${fieldName}`, "");

      // formatea la información que va a enviar a Cloudinary con el objeto formData
      const formData = new FormData();
      if (fieldName === "first") {
        formData.append("file", imagePpalFirst);
      } else if (fieldName === "second") {
        formData.append("file", imagePpalSecond);
      } else {
        formData.append("file", imagePpalThird);
      }
      formData.append("upload_preset", "r8lr9ctz");
      formData.append("folder", "audiophile-products");

      // envía la información a Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgur5apfu/image/upload",
        formData
      );

      // Actualiza el estado de Formik con la URL de la imagen subida a Cloudinary
      setFieldValue(`gallery.${fieldName}`, {
        url: response.data.secure_url,
        public_id: response.data.public_id,
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const {
    handleChange,
    handleSubmit,
    values,
    setFieldError,
    setFieldValue,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      // agrego los valores iniciales de mi formulario con las prop del prod que me llega x props.
      name: data.name,
      subname: data.subname,
      price: data.price,
      stock: data.stock,
      category: data.category,
      image: data.image,
      description: data.description,
      features: data.features,
      new: data.new,
      includes: data.includes,
      gallery: data.gallery,
    },
    onSubmit: (dataForm) => {
      // los dataForm son los valores que se envian en el formulario
      let obj = {
        ...dataForm,
        price: +dataForm.price,
        stock: +dataForm.stock,
      };

      console.log(obj);

      handleClose();
      Swal.fire({
        title: "Editar este produto ?",
        text: "Una vez editado se actualiza con esta nueva informacion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificarlo!",
      }).then((result) => {
        if (result.isConfirmed) {
          /* OJO 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 */

          let refDoc = doc(db, "products", data.id); // accedo al id del prod xq se lo pase como props
          updateDoc(refDoc, obj); // UPDATEDOC = PATCH --> le paso el product de mi DB y luego las prop que modifico
          setChangesProducts(true);

          Swal.fire(
            "Editado!",
            "Su producto ha sido editado con éxito",
            "success"
          );
        }
      });
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("El campo 'Name' es obligatorio."),
      subname: Yup.string().required("El campo 'Subname' es obligatorio."),
      price: Yup.number()
        .typeError("El campo 'Price' debe ser un número.")
        .required("El campo 'Price' es obligatorio.")
        .positive("El precio debe ser un valor positivo.")
        .test(
          "is-decimal",
          "El precio debe tener dos decimales como máximo.",
          (value) => /^\d+(\.\d{1,2})?$/.test(value)
        ),
      stock: Yup.number()
        .typeError("El campo 'Stock' debe ser un número.")
        .required("El campo 'Stock' es obligatorio.")
        .integer("El stock debe ser un número entero.")
        .min(0, "El stock no puede ser negativo."),
      category: Yup.string().required("El campo 'Category' es obligatorio."),
      image: Yup.mixed().required("Debe cargar una imagen principal."),
      description: Yup.string().required(
        "El campo 'Description' es obligatorio."
      ),
      features: Yup.string().required("El campo 'Features' es obligatorio."),
      new: Yup.boolean(),
      gallery: Yup.object().shape({
        first: Yup.mixed().required(
          "Debe cargar una imagen para 'First Image'."
        ),
        second: Yup.mixed().required(
          "Debe cargar una imagen para 'Second Image'."
        ),
        third: Yup.mixed().required(
          "Debe cargar una imagen para 'Third Image'."
        ),
      }),
      includes: Yup.array()
        .of(
          Yup.object().shape({
            item: Yup.string().required(
              "El campo 'Item included' es obligatorio."
            ),
            quantity: Yup.number()
              .integer("La cantidad debe ser un número entero.")
              .min(1, "La cantidad no puede ser menor a 1.")
              .required("El campo 'Quantity' es obligatorio."),
          })
        )
        .required("El campo 'Includes' es obligatorio."), // Validación para asegurarse que el array 'includes' no esté vacío
    }),
    validateOnChange: false,
    validateOnBlur: true,
  });

  // Obtener el último objeto "includes" agregado
  const lastIncludeIndex = values.includes.length - 1;
  const lastInclude = values.includes[lastIncludeIndex];

  // Verificar si el último objeto "includes" tiene valores válidos
  const isLastIncludeValid = lastInclude?.item !== "";


  /* const handleRemoveInclude = (index) => {
    setFieldValue("includes", (prevIncludes) => {
      const updatedIncludes = [...prevIncludes];
      updatedIncludes.splice(index, 1);
      return updatedIncludes;
    });
  }; */

  const handleRemoveInclude = (i)=>{
   
    const newArr = values.includes.filter((_ , index ) => index !== i  )
     setFieldValue("includes", newArr);
  }



  console.log(values);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="formulario">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {disabled ? "VER PRODUCTO" : "EDITAR PRODUCTO"}
              </Typography>
              <IconButton onClick={handleClose} color="primary">
                <CancelIcon />
              </IconButton>
            </Box>
            <Typography variant="subtitle1"> ID: {data.id}</Typography>
            <TextField
              name="name"
              label="Name"
              defaultValue={data.name}
              disabled={disabled}
              onChange={handleChange}
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name ? true : false}
              helperText={errors.name && touched.name ? errors.name : ""}
            />
            <TextField
              name="subname"
              label="subname"
              defaultValue={data.subname}
              disabled={disabled}
              onChange={handleChange}
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              value={values.subname}
              onBlur={handleBlur}
              error={errors.subname && touched.subname ? true : false}
              helperText={
                errors.subname && touched.subname ? errors.subname : ""
              }
            />
            <TextField
              name="price"
              label="Price"
              defaultValue={!disabled ? data.price : `$${data.price}`}
              disabled={disabled}
              onChange={handleChange}
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              value={values.price}
              onBlur={handleBlur}
              error={errors.price && touched.price ? true : false}
              helperText={errors.price && touched.price ? errors.price : ""}
            />
            <TextField
              name="stock"
              label="Stock"
              defaultValue={data.stock}
              disabled={disabled}
              onChange={handleChange}
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              value={values.stock}
              onBlur={handleBlur}
              error={errors.stock && touched.stock ? true : false}
              helperText={errors.stock && touched.stock ? errors.stock : ""}
            />

            <p>Includes: </p>
            {isLastIncludeValid && (
              <Button
                variant="outlined"
                onClick={() =>
                  setFieldValue("includes", [
                    ...values.includes,
                    { item: "", quantity: 1 },
                  ])
                }
                sx={{ width: "50%" }}
                disabled={disabled}
              >
                +
              </Button>
            )}
            {values?.includes?.map((item, index) => (
              <Box key={index}>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    name={`includes[${index}].item`}
                    label="Item included"
                    defaultValue={item.item}
                    //value={values.item}
                    disabled={disabled}
                    onChange={handleChange}
                    value={item.item}
                    onBlur={handleBlur}
                    sx={{
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      width: "75%",
                    }}
                    error={
                      errors.includes &&
                      touched.includes &&
                      touched.includes[index]?.item &&
                      errors.includes[index]?.item
                        ? true
                        : false
                    }
                    helperText={
                      errors.includes &&
                      touched.includes &&
                      touched.includes[index]?.item &&
                      errors.includes[index]?.item
                        ? errors.includes[index]?.item
                        : ""
                    }
                  />

                  <TextField
                    type="number"
                    name={`includes[${index}].quantity`}
                    label="Quantity"
                    defaultValue={item.quantity}
                    value={item.quantity}
                    disabled={disabled}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      width: "25%",
                    }}
                    inputProps={{
                      min: 1, // Establecer el valor mínimo como 1
                    }}
                  />
                  {/* Botón para eliminar el elemento "includes" */}
                  {!disabled && (
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveInclude(index)}
                      sx={{ minWidth: "8%", ml: .5, p:1 }}
                    >
                      -
                    </Button>
                  )}
                </Box>
                {
                  <FormHelperText error>
                    {errors.includes &&
                    touched.includes &&
                    touched.includes[index]?.item &&
                    errors.includes[index]?.item
                      ? errors.includes[index]?.item
                      : ""}
                  </FormHelperText>
                }
              </Box>
            ))}

            {/*  TEXTAREA DESCRIPTION */}

            <FormControl>
              <p>Description</p>
              <InputLabel htmlFor="description"></InputLabel>
              <TextField
                placeholder="description"
                id="description"
                className="textArea"
                defaultValue={`DESCRIPCION: ${data.description}`}
                disabled={disabled}
                name="description"
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                error={errors.description && touched.description ? true : false}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
                multiline
                rows={4}
              />
            </FormControl>

            {/* TEXTAREA FEATURES */}
            <FormControl>
              <p>Features</p>
              <InputLabel htmlFor="features"></InputLabel>
              <TextField
                placeholder="Features"
                id="features"
                className="textArea"
                defaultValue={`FEATURES: ${data.features}`}
                disabled={disabled}
                name="features"
                onChange={handleChange}
                value={values.features}
                onBlur={handleBlur}
                error={errors.features && touched.features ? true : false}
                helperText={
                  errors.features && touched.features ? errors.features : ""
                }
                multiline
                rows={4}
              />
            </FormControl>

            {/* CHECKBOX NEW PRODUCT */}

            <FormControlLabel
              sx={{
                minWidth: 120,
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                ml: 0,
                mr: 0,
                p: 0.5,
              }}
              control={<Checkbox defaultChecked={data.new ? true : false} />}
              label="New product"
              name="new"
              disabled={disabled}
              onChange={handleChange}
            />

            {/* SELECT */}

            <Box
              sx={{
                minWidth: 120,
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  name="category"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={disabled ? data.category : values.category}
                  onChange={handleChange}
                  sx={{
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "transparent",
                  }}
                  onBlur={handleBlur}
                  error={errors.category && touched.category ? true : false}
                  helperText={
                    errors.category && touched.category ? errors.category : ""
                  }
                >
                  <MenuItem
                    value="headphones"
                    sx={{
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    Headphones
                  </MenuItem>
                  <MenuItem
                    value="speakers"
                    sx={{
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    Speakers
                  </MenuItem>
                  <MenuItem
                    value="earphones"
                    sx={{
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    Earphones
                  </MenuItem>
                </Select>
              </FormControl>
              <FormHelperText error>
                {errors.category && touched.category ? errors.category : ""}
              </FormHelperText>
            </Box>

            {/* IMAGEN */}
            <p>Main Photo</p>
            {!disabled && (
              <Button
                component="label"
                variant="outlined"
                sx={{
                  p: "14px 15px",
                  alignSelf: "flex-start",
                }}
                disabled={disabled}
                fullWidth
              >
                Editar imagen
                <Input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  name="image"
                  sx={{
                    letterSpacing: "inherit",
                    height: "1.4375em",
                    padding: " 16px 14px",
                    p: 2.5,
                    display: "none",
                  }}
                  variant="outlined"
                  onBlur={handleBlur}
                  error={errors.image && touched.image ? true : false}
                  helperText={errors.image && touched.image ? errors.image : ""}
                  disabled={disabled}
                />
              </Button>
            )}

            {changeImgPpal && !disabled && imagePpal && (
              <Button
                onClick={handleImageUpload}
                type="button"
                variant="contained"
                sx={{ width: { md: "45%", xs: "99%" } }}
                color="success"
              >
                Confirm ✔
              </Button>
            )}

            {errors.image && (
              <FormHelperText error>
                {errors.image && touched.image ? errors.image : ""}
              </FormHelperText>
            )}

            {values.image && (
              <Image
                cloudName="dgur5apfu"
                publicId={values.image.url}
                style={{
                  width: "20%",
                  height: "100%",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}

            {/* GALLERY */}

            <p>Gallery</p>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* INPUT PARA PRIMERA IMAGEN DE GALLERY */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "30%",
                }}
              >
                <p>First</p>
                {!disabled && (
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      //width: { md: "45%", xs: "99%" },
                      alignSelf: "flex-start",
                    }}
                    disabled={disabled}
                    fullWidth
                  >
                    edit
                    <Input
                      type="file"
                      id="gallery-first"
                      onChange={handleGalleryImageChange}
                      name="gallery.first"
                      sx={{
                        letterSpacing: "inherit",
                        height: "1.4375em",
                        padding: " 16px 14px",
                        p: 2.5,
                        display: "none",
                      }}
                      variant="outlined"
                      onBlur={handleBlur}
                      error={
                        errors.gallery?.first && touched.gallery?.first
                          ? true
                          : false
                      }
                      helperText={
                        errors.gallery?.first && touched.gallery?.first
                          ? errors.gallery?.first
                          : ""
                      }
                      disabled={disabled}
                    />
                  </Button>
                )}

                {changeImgPpalFirst && !disabled && imagePpal && (
                  <Button
                    onClick={() => handleGalleryImageUpload("first")}
                    type="button"
                    variant="outlined"
                    color="success"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                  >
                    change✔
                  </Button>
                )}

                {errors.gallery?.first && (
                  <FormHelperText error>
                    {errors.gallery?.first && touched.gallery?.first
                      ? errors.gallery?.first
                      : ""}
                  </FormHelperText>
                )}
                {values.gallery.first && (
                  <Image
                    cloudName="dgur5apfu"
                    publicId={values.gallery.first.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                )}
              </Box>

              {/* INPUT PARA SEGUNDA IMAGEN DE GALLERY */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "30%",
                }}
              >
                <p>Second</p>
                {!disabled && (
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      //width: { md: "45%", xs: "99%" },
                      alignSelf: "flex-start",
                    }}
                    disabled={disabled}
                    fullWidth
                  >
                    Edit
                    <Input
                      type="file"
                      id="gallery-second"
                      onChange={handleGalleryImageChange}
                      name="gallery.second"
                      sx={{
                        letterSpacing: "inherit",
                        height: "1.4375em",
                        padding: " 16px 14px",
                        p: 2.5,
                        display: "none",
                      }}
                      variant="outlined"
                      onBlur={handleBlur}
                      error={
                        errors.gallery?.second && touched.gallery?.second
                          ? true
                          : false
                      }
                      helperText={
                        errors.gallery?.second && touched.gallery?.second
                          ? errors.gallery?.second
                          : ""
                      }
                      disabled={disabled}
                    />
                  </Button>
                )}

                {changeImgPpalSecond && !disabled && imagePpal && (
                  <Button
                    onClick={() => handleGalleryImageUpload("second")}
                    type="button"
                    variant="outlined"
                    color="success"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                  >
                    change✔
                  </Button>
                )}

                {errors.gallery?.second && (
                  <FormHelperText error>
                    {errors.gallery?.second && touched.gallery?.second
                      ? errors.gallery?.second
                      : ""}
                  </FormHelperText>
                )}
                {values.gallery.second && (
                  <Image
                    cloudName="dgur5apfu"
                    publicId={values.gallery.second.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                )}
              </Box>

              {/* INPUT PARA TERCERA IMAGEN DE GALLERY */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "30%",
                }}
              >
                <p>Third</p>
                {!disabled && (
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      //width: { md: "45%", xs: "99%" },
                      alignSelf: "flex-start",
                    }}
                    disabled={disabled}
                    fullWidth
                  >
                    Edit
                    <Input
                      type="file"
                      id="gallery-third"
                      onChange={handleGalleryImageChange}
                      name="gallery.third"
                      sx={{
                        letterSpacing: "inherit",
                        height: "1.4375em",
                        padding: " 16px 14px",
                        p: 2.5,
                        display: "none",
                      }}
                      variant="outlined"
                      onBlur={handleBlur}
                      error={
                        errors.gallery?.third && touched.gallery?.third
                          ? true
                          : false
                      }
                      helperText={
                        errors.gallery?.third && touched.gallery?.third
                          ? errors.gallery?.third
                          : ""
                      }
                      disabled={disabled}
                    />
                  </Button>
                )}

                {changeImgPpalThird && !disabled && imagePpal && (
                  <Button
                    onClick={() => handleGalleryImageUpload("third")}
                    type="button"
                    variant="outlined"
                    color="success"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                  >
                    change✔
                  </Button>
                )}

                {errors.gallery?.third && (
                  <FormHelperText error>
                    {errors.gallery?.third && touched.gallery?.third
                      ? errors.gallery?.third
                      : ""}
                  </FormHelperText>
                )}
                {values.gallery.third && (
                  <Image
                    cloudName="dgur5apfu"
                    publicId={values.gallery.third.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* BUTTONS */}
            <Box
              sx={{ display: "flex", gap: 0.5, justifyContent: "space-evenly" }}
            >
              {!disabled && (
                <>
                  <Button type="submit" variant="contained" fullWidth>
                    Enviar
                  </Button>
                </>
              )}
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDashboard;
