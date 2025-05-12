# About the repo
This is my personal repo for my portfolio. This website is built in Deno + Fresh.js. The design concept was inspired by my little sis ideas & pinterest stuff.

# Run project locally
    Write

    ```bash
    deno task start
    ```
    on the terminal
    App will be running in http://localhost:8080

# How to add some dependencies
  Write

    ```bash
    deno install npm:preact
    ```
  on the terminal

# Island architecture
The islands architecture encourages small, focused chunks of interactivity within server-rendered web pages. The output of islands is progressively enhanced HTML, with more specificity around how the enhancement occurs. Rather than a single application being in control of full-page rendering, there are multiple entry points.

The term Islands architecture was popularized by Katie Sylor-Miller and Jason Miller to describe a paradigm that aims to reduce the volume of JavaScript shipped through “islands” of interactivity that can be independent delivered on top of otherwise static HTML.

For more info check out [this article](https://www.patterns.dev/vanilla/islands-architecture)

# Project structure
- **.vscode/**: Configuraciones del entorno de desarrollo en VSCode.
- **components/**: Componentes reutilizables de la interfaz de usuario.
- **islands/**: Componentes interactivos aislados (para mejorar la carga y reactividad).
- **routes/**: Rutas de la aplicación que definen las distintas páginas.
  - **api/**: Endpoint para gestionar lenguajes (por ejemplo, `languages.ts`).
  - **projects/**: Plantilla para proyectos individuales (`[project].tsx`).
  - **_404.tsx**: Página de error 404 personalizada.
  - **_app.tsx**: Configuración y layout general de la aplicación.
  - **index.tsx**: Página principal del portafolio.
- **static/**: Recursos estáticos como íconos, imágenes y archivos CSS.
- **deno.json**: Configuraciones del proyecto para Deno.
- **tailwind.config.ts**: Configuración de Tailwind CSS.

# Which islands this project has?
- **Home**: This is the main page of the portfolio.
- **Projects**: This is a list of all the projects I have done.
- **About me**: This is a brief description of who I am and what I do.
- **Contact**: This is a contact form where you can send me a message.
- **Certifications**: This is a list of certificates that I have.
- **Hacketons**: This is a list of hacketons that I have participate in.
- **Experiences**: This is a list of experiments that I have.
- **Researchs**: This is a list of research projects that I have done.

# where is deploy?
this proyect is deploy on