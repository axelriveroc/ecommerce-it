import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../firebase/firebaseConfig";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const DashboardTest = () => {
  const [image, setImage] = useState("");

  const fileHandler = async (e) => {
    const archivoI = e.target.files[0];
    setImage(archivoI);
  };

  const productoAAgregar = {
    stock: 5,
    subname: "POPI",
    slug: "yx1-earphones",
    name: "POPITO TEST",
    category: "earphones",
    categoryImage:
      "https://res.cloudinary.com/dwqrlr45w/image/upload/v1682637814/audiophileEcommerce/product-yx-earphones/desktop/image-category-page-preview_rwwuhl.jpg",
    new: true,
    price: 599,
    description:
      "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    features:
      "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.",
    includes: [
      {
        quantity: 2,
        item: "Earphone unit",
      },
      {
        quantity: 6,
        item: "Multi-size earplugs",
      },
      {
        quantity: 1,
        item: "User manual",
      },
      {
        quantity: 1,
        item: "USB-C charging cable",
      },
      {
        quantity: 1,
        item: "Travel pouch",
      },
    ],
    gallery: {
      first:
        "https://res.cloudinary.com/dgur5apfu/image/upload/v1687894008/shop-ecommerce-it/desktop/product-yx1-earphones/Bitmap_iykidy.png",
      second:
        "https://res.cloudinary.com/dgur5apfu/image/upload/v1687894008/shop-ecommerce-it/desktop/product-yx1-earphones/Bitmap_1_sserja.png",
      third:
        "https://res.cloudinary.com/dgur5apfu/image/upload/v1687894008/shop-ecommerce-it/desktop/product-yx1-earphones/Bitmap_2_ldfuwo.png",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const refArchivo = ref(storage, `products/${image.name}`);
      const archivoSubido = await uploadBytes(refArchivo, image);
      console.log("Archivo subido: ", archivoSubido);
      const imageUrl = await getDownloadURL(refArchivo);
      productoAAgregar.image = imageUrl;

      const res = await addDoc(collection(db, "products"), productoAAgregar);
      console.log("Agregado a la DB: ", res);
    }
  };

  return (
    <div>
      DashboardTest crear producto
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={fileHandler} />
        <button>enviar</button>
      </form>
    </div>
  );
};

export default DashboardTest;
