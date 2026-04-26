---
trigger: always_on
---

# Gustavo's Portfolio Development Guidelines

## Project Goal
Create a professional, interactive, clean, beautiful, and modern static portfolio website showcasing Gustavo's expertise as a Control and Automation Engineer specializing in Industry 4.0, IIoT, and SCADA/MES Systems.

## Core Features & Requirements
- **Architecture**: Purely static codebase using Vanilla HTML, CSS, and JavaScript. No build pipeline required.
- **Design Aesthetics**: 
  - Beautiful, modern, and premium design (vibrant colors, sleek dark modes, dynamic animations, modern typography like Inter or Roboto).
  - Responsive, mobile-first layout.
  - Interactive elements and smooth micro-animations to make the interface feel alive.
- **"PDF Magic"**: Maintain and enhance the built-in `@media print` rules so that pressing `Ctrl+P` generates a perfectly formatted, single-column, print-ready resume. Web-only interactive media (videos/GIFs) must be hidden during print, replaced by high-quality static images without awkward page breaks.
- **Customization**: Utilize CSS variables for quick and easy theming.

## Content Structure (To Be Implemented)

### 1. Hero / About Me
- Brief introduction highlighting expertise in Industry 4.0, IIoT, automation, and systems integration.

### 2. Experience (Companies)
Showcase the trajectory and key responsibilities at:
- **Preddata**: Current role focusing on Industry 4.0, IT/OT integration, OEE systems (Ignition, Java, Python, Docker).
- **Auti**: Development of large-scale automation projects, SCADA/MES systems, standardization (Siemens, Rockwell).
- **Motion Up**: Maintenance, troubleshooting, electronic diagnostics, and integration (Lenze, CANOpen, PLC, drives).

### 3. Tech Stack & Technologies
Highlight domain expertise:
- **Automation & Control**: Siemens, Rockwell, Lenze, B&R, CANOpen, EtherCat, Modbus, PROFINET.
- **Software & IIoT**: Ignition (Inductive Automation), Node-red, Elipse E3, Java, Python, Docker, SQL (MySQL).
- **Concepts**: Industry 4.0, OEE Systems, SCADA/MES, PID Control, TAF/TAC, PID Tuning.

### 4. Projects (Interactive Showcase)
- Create a dedicated, interactive section for projects.
- *Note: The specific projects to be highlighted will be decided by Gustavo later from the comprehensive list in the `data/portfolio` folder.* 
- Each project card/modal should display the challenge, technologies used, and outcomes, alongside high-quality images.

## Development Workflow
1. Ensure any new UI components adhere strictly to the design system defined in CSS variables.
2. When adding media, ensure print fallbacks are always provided.
3. Keep the code clean, modular, and well-commented.
4. Consult the user before making structural changes to the project data or selecting the final projects for the showcase.
