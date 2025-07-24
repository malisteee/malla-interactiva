const cont = document.getElementById("contenedor-malla");

const semestres = [
  ["Química General y Orgánica", "Antropología", "Introducción a la Tecnología Médica", "Biología Celular", "Matemáticas Básica", "Integrado en Habilidades Científicas"],
  ["Bioquímica General","Morfología Básica","Ética","Tecnología Médica en el Equipo de Salud","Bioseguridad y Procedimientos de Apoyo Diagnósticos","Psicología de Atención al paciente"],
  ["Integrado Fisio‑Farmacología 1","Salud Poblacional","Infectología Básica","Fundamentos de Física Médica","Matemática Integrada a imagenología Médica"],
  ["Integrado Fisio‑Farmacología 2","Bioética","Epidemiología","Física Médica 1","Anatomía Imagenológica","Hito Evaluativo"],
  ["Persona y Sociedad","Informática Aplicada","Bioestadística","Física Médica 2","Técnicas Radiológicas 1","Anatomía Imagenológica Integrada"],
  ["Gestión en Equipos","Electivo 1 Formación","Radiobiología","Técnicas Radiológicas 2","Gestión de Calidad","Imagenología Patológica"],
  ["Electivo 2 Formación","Metodología Investigación","Medicina Nuclear","Ultrasonido","Tomografía Computada 1"],
  ["Electivo 3 Formación","Tomografía Computada 2","Salud Digital","Radioterapia","Resonancia Magnética","Hito Evaluativo Interprofesional"],
  ["Gestión Desarrollo Profesional","Análisis Clínico Integrado","Taller Investigación","Electivo 1","Electivo 2","Sistemas Acreditación"],
  ["Internado"]
];

const prereq = {
  "Bioquímica General": ["Química General y Orgánica"],
  "Ética": ["Antropología"],
  "Tecnología Médica en el Equipo de Salud": ["Introducción a la Tecnología Médica"],
  "Integrado Fisio‑Farmacología 1": ["Bioquímica General"],
  "Infectología Básica": ["Morfología Básica"],
  "Fundamentos de Física Médica": ["Matemáticas Básica"],
  "Matemática Integrada": ["Matemáticas Básica"],
  "Integrado Fisio‑Farmacología 2": ["Integrado Fisio‑Farmacología 1"],
  "Epidemiología": ["Salud Poblacional"],
  "Física Médica 1": ["Fundamentos de Física Médica"],
  "Anatomía Imagenológica": ["Morfología Básica"],
  "Hito Evaluativo": ["Integrado Fisio‑Farmacología 1","Bioseguridad y Procedimientos Diagnósticos","Psicología de Atención"],
  "Informática Aplicada": ["Matemática Integrada"],
  "Bioestadística": ["Matemáticas Básica"],
  "Física Médica 2": ["Física Médica 1"],
  "Anatomía Imagenológica Integrada": ["Anatomía Imagenológica","Física Médica 1"],
  "Radiobiología": ["Física Médica 2"],
  "Técnicas Radiológicas 2": ["Técnicas Radiológicas 1","Física Médica 2"],
  "Imagenología Patológica": ["Anatomía Imagenológica Integrada"],
  "Medicina Nuclear": ["Radiobiología","Técnicas Radiológicas 2"],
  "Ultrasonido": ["Imagenología Patológica"],
  "Tomografía Computada 1": ["Imagenología Patológica"],
  "Tomografía Computada 2": ["Tomografía Computada 1"],
  "Radioterapia": ["Tomografía Computada 1"],
  "Resonancia Magnética": ["Imagenología Patológica"],
  "Hito Evaluativo Interprofesional": ["Radiobiología","Técnicas Radiológicas 2"],
  "Análisis Clínico Integrado": ["Tomografía Computada 2","Resonancia Magnética"],
  "Taller de Investigación": ["Metodología Investigación"],
  "Internado": ["Hito Evaluativo Interprofesional","Análisis Clínico Integrado"]
};

let estado = JSON.parse(localStorage.getItem("mallaEstado")||"{}");

function crearBoton(r) {
  const b = document.createElement("button");
  b.className = "ramo";
  b.innerText = r;
  const done = estado[r];
  if (done) b.classList.add("completado");

  const bloque = prereq[r] && prereq[r].some(p=> !estado[p]);
  if (bloque && !done) b.classList.add("bloqueado");

  b.onclick = () => {
    if (b.classList.contains("bloqueado")) return;
    b.classList.toggle("completado");
    estado[r] = b.classList.contains("completado");
    localStorage.setItem("mallaEstado", JSON.stringify(estado));
    render();
  };

  return b;
}

function progreso() {
  const tot = document.querySelectorAll(".ramo").length;
  const comp = document.querySelectorAll(".ramo.completado").length;
  const pct = Math.round(comp*100/tot);
  document.getElementById("progreso-barra").style.width = pct+"%";
  document.getElementById("progreso-texto").innerText = pct+"% completado";
}

function render() {
  cont.innerHTML = "";
  semestres.forEach((s,i)=>{
    const d = document.createElement("div");
    d.classList.add("semestre");
    const t = document.createElement("h2");
    t.innerText = "Semestre "+(i+1);
    d.appendChild(t);
    s.forEach(r=>d.appendChild(crearBoton(r)));
    cont.appendChild(d);
  });
  progreso();
}

render();
