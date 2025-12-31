# Material Bazaar

A web-based material selection tool using p5.js for canvas rendering and D3.js for interactive visualization of material properties.

## Description

Material Bazaar is an interactive scatter plot application that helps users explore and compare materials based on density, cost, and stiffness. It visualizes trade-offs in material selection for engineering applications, with support for constraints like budget, maximum density, and shipping costs.

## Features

- **Interactive Scatter Plot**: Zoom and pan functionality using D3.js zoom behavior.
- **Multiple Y-Axis Options**: Choose between unit cost, landed cost (including shipping), or cost per stiffness.
- **Material Filtering**: Filter by material families (e.g., Metals, Polymers, Composites).
- **Constraint Sliders**: Adjust minimum stiffness, maximum density, budget, and scoring bias.
- **Shipping Model**: Add shipping costs per kg or per m³ (defaults to $0).
- **Editable Materials**: Click "Edit" on best picks to modify properties in real-time.
- **Pareto Front**: Visualizes the optimal trade-off curve.
- **Responsive Design**: Adapts to different screen sizes.

## Usage

1. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari).
2. Use the search bar to filter materials by name.
3. Select the Y-axis interpretation from the dropdown.
4. Adjust sliders for constraints (stiffness, density, budget, bias).
5. Set shipping costs if desired.
6. Check/uncheck material families to include/exclude them.
7. Hover over points for tooltips with detailed information.
8. Zoom with mouse wheel, pan by dragging.
9. Click "Reset view" to return to default zoom/pan state.
10. In the right panel, view best picks and edit material properties.

## Technologies Used

- **p5.js**: JavaScript library for creative coding and canvas management.
- **D3.js**: For scales, zoom behavior, and data manipulation.
- **HTML5 Canvas**: For high-performance rendering of the scatter plot.
- **Vanilla JavaScript**: For application logic and DOM manipulation.
- **CSS**: Custom styling with CSS custom properties for theming.

## Data Source

Material data is embedded in `materials.js`, including properties like density (ρ), Young's modulus (E), and unit cost. Data covers metals, polymers, composites, ceramics, and more. The dataset has been verified and corrected based on authoritative sources (see `perplexity-materials-verification-report.md`).

## Browser Compatibility

Requires a modern browser with support for:

- HTML5 Canvas
- ES6+ JavaScript features
- CSS custom properties

## Contributing

To modify the material database or add features:

1. Edit the `MATERIALS` array in `materials.js`.
2. Adjust scales, colors, or logic in `app.js` as needed.
3. Test in multiple browsers.

## License

MIT License. See `LICENSE` file for details.
