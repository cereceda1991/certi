import { useState, useEffect } from "react";
import Model1 from "./assets/model1.jpeg";
import Model2 from "./assets/model2.jpeg";
import Model3 from "./assets/model3.jpeg";
import Model4 from "./assets/model4.jpeg";
import Model5 from "./assets/model5.jpeg";
import Model6 from "./assets/model6.jpeg";
import Model7 from "./assets/model7.jpeg";

import Certificate from "./components/Certificate/Certificate";
import "./App.css";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const models = [
  { id: 1, src: Model1 },
  { id: 2, src: Model2 },
  { id: 3, src: Model3 },
  { id: 4, src: Model4 },
  { id: 5, src: Model5 },
  { id: 6, src: Model6 },
  { id: 7, src: Model7 },
];

function App() {
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    setImgPreview(models[0].src);
  }, []);

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    setImgFile(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgPreview(reader.result);
      };
    }
  };

  const exportToPDF = () => {
    const element = document.getElementById("container");

    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdfWidth = 297;
      const pdfHeight = 210;

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
          onChange={handleFileChange}
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
