import { useState } from "react";
import Model1 from "./assets/model1.jpeg";
import Model2 from "./assets/model2.jpeg";
import Model3 from "./assets/model3.jpeg";
import Certificate from "./components/Certificate/Certificate";
import "./App.css";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const models = [
  { id: 1, src: Model1 },
  { id: 2, src: Model2 },
  { id: 3, src: Model3 },
];

function App() {
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(models[0].src);

  if (imgFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      setImgPreview(reader.result);
    };
  }

  const exportToPDF = () => {
    const element = document.getElementById("container");

    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Establecer las dimensiones A4 horizontal
      const pdfWidth = 297; // Ancho de A4 horizontal en mm
      const pdfHeight = 210; // Altura de A4 horizontal en mm

      // Crear el objeto jsPDF con orientación horizontal y tamaño A4
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificate.pdf");
    });
  };

  const exportToImage = () => {
    const element = document.getElementById("container");

    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Descargar la imagen
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "certificate.jpg";
      link.click();
    });
  };

  return (
    <div className="App">
      <section className="section_left">
        <input
          type="file"
          className="file"
          accept="image/*"
          onChange={(e) => {
            const [files] = e.target.files;
            setImgFile(files);
          }}
        />
        <div className="options">
          {models.map((model) => (
            <img
              key={model.id}
              src={model.src}
              alt="certificate"
              onClick={() => {
                setImgFile(null);
                setImgPreview(model.src);
              }}
            />
          ))}
        </div>
      </section>
      <section className="export_to_pdf">
        <div className="container" id="container">
          {imgPreview && <img src={imgPreview} alt="img" className="img" />}
          <Certificate model={imgPreview} />
        </div>
        <div className="container_buttons">
          <button onClick={exportToPDF}>Exportar a PDF</button>
          <button onClick={exportToImage}>Exportar a imagen</button>
        </div>
      </section>
    </div>
  );
}

export default App;
