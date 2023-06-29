import { useState } from "react";
import "./Certificate.css";


const Certificate = () => {
  const [inputs, setInputs] = useState({
    name: "",
    career_type: "",
    selected_number: "",
    ceo_name: "",
    cto_name: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

return (
    <section className="Certificate">

      <form className="content" id="content">
    <label className="content_title">Certificado de Experiencia</label>
      <input
          type="text"
          placeholder="No Country"
          name="company"
          value={inputs.company}
          onChange={handleChange}
          className="content__input-company"
        />
        <label className="content__label">Certifica a</label>
        <input
          type="text"
          placeholder="JUAN ERNESTO PEREZ MOLLA"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          className="content__input-name"
        />
        <section className="info__section">
          <p className="content__paragraph">
            <label>Por haber participado exitosamente como</label>
            <input
              type="text"
              placeholder="UX/UI Designer"
              name="career_type"
              className="content__carreer"
              value={inputs.career_type}
              onChange={handleChange}
            />
            <label>en la instancia de emulación del Seleccionado</label>
            <input
              type="text"
              placeholder="9"
              className="content__instance"
              name="selected_number"
              value={inputs.selected_number}
              onChange={handleChange}
            />
            <label>llevando a cabo su proyecto en tiempo y forma.</label>
          </p>
        </section>

        <div className="director__presidente">
          <div>
            <label>
              <input
                type="text"
                placeholder="Leandro Buzeta Bernasconi"
                name="ceo_name"
                value={inputs.ceo_name}
                onChange={handleChange}
                className="content__ceo"
              />
            </label>
            <label className="content__label"><b>Co-Founder & CEO</b></label>
          </div>
          <div>
            <label className="content__label">
              <input
                type="text"
                placeholder="Julio Ignacio Otero"
                name="cto_name"
                value={inputs.cto_name}
                onChange={handleChange}
                className="content__cto"
              />
            </label>
            <label className="content__label"><b>Co-Founder & CTO</b></label>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Certificate;
